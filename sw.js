const CACHE_NAME = `temperature-converter-v1`;

/* aggiunge un event listener per l'evento install
   l'evento install è il primo evento del service worker
   qui andiamo a scegliere quali file inserire nella cache
*/
self.addEventListener("install", event => {
    event.waitUntil((async () => {
        const cache = await caches.open(CACHE_NAME);
        cache.addAll(['/', '/converter.js', '/style.css']);
    })()
    );
});

/* STEP 2: per ogni evento fetch
        accedo alla cache e mi chiedo se la risorsa richiesta nell'evento fetch sia immagazzinata nella cahe: 
        - se si, la restituisco; se non presente allora provo a richiederla al server e la aggiungo nella cache
*/
self.addEventListener("fetch", event => {
    event.respondWith((async () => {
        const cache = await caches.open(CACHE_NAME);
        const cachedResponse = await cache.match(event.request);
    if (cachedResponse) {
        return cachedResponse;
    } else {
            try {
                const fetchResponse = await fetch(event.request);
                cache.put(event.request, fetchResponse.clone());
                return fetchResponse;
            } catch (e) {
                // errore
            }
    }
    })());
});