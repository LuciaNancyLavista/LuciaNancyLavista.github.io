/*  STEP 1: prendere tutti i valori da componenti nel HTML
            per riferirci ad un elemento HTML uso il suo id, ottengo una variabile contenente un riferimento ad esso 
            tramite il metodo getELelmentId() dell'oggetto document
*/
//const indica che il riferiemento non cambierà
const inputField = document.getElementById("input-temp");
const fromUnitField = document.getElementById("input-unit");
const toUnitField = document.getElementById("output-unit");
const outputField = document.getElementById("output-temp");
const form = document.getElementById("converter");

/*  STEP 2: implementare la logica della conversione
    STEP 2.1: implementare una funzione che prenda: - il valore della temperatura
                                                    - l'unità da cui effettuare la conversione
                                                    - l'unità verso cui effettuare la conversione
*/
function convertTemp(value, fromUnit, toUnit) {
    //uso la stringa 'c' per indicare il Celsius
    //uso la stringa 'f' per indicare il Farenheit
    //uso la stringa 'k' per indicare in Kelvin
    if (fromUnit === "c") {
        if (toUnit === "f") {
            return value * 9/5 + 32;
        } else if (toUnit === "k") {
            return value + 273.15;
        }
        return value;
    }
    if (fromUnit === "f") {
        if (toUnit === "c") {
            return (value - 32) * 5/9;
        } else if (toUnit === "k") {
            return (value + 459.67) * 5/9;
        }
        return value;
    }
    if (fromUnit === "k") {
        if (toUnit === "c") {
            return (value - 273.15);
        } else if (toUnit === "f") {
        return value * 9/5 - 459.67;
        }
        return value;
    }
    throw new Error("Invalid unit");
}

form.addEventListener("input", () => {
    //ottiene il valore da inputField; parseFloat fa parte della libreria core di JS
    //è necessario perchè input field.value è una stringa
    const inputTemp = parseFloat(inputField.value);
    //ottiene il valore scelto nel primo select
    const fromUnit = fromUnitField.value;
    //ottiene il valore scelto nel secondo select
    const toUnit = toUnitField.value;

    //
    const outputTemp = convertTemp(inputTemp, fromUnit, toUnit);
    outputField.value = (Math.round(outputTemp * 100) / 100) + " " + toUnit.toUpperCase(); 
});
   