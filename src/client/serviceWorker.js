
if ('serviceWorker' in navigator) {
   
    window.addEventListener('load', () => {
    
        navigator.serviceWorker.register('./service-worker.js')
            .then((reg) => console.log('registration has succeeded ', reg.scope))
            .catch((err) => console.log('failed to register service-workers with', err))
    })

}