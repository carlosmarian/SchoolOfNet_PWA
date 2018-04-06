console.log('[Application] start push listening');

/*
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./firebase-messaging-sw.js')
        .then(registration => {
*/
            const messaging = firebase.messaging();

           // messaging.useServiceWorker(registration)

            
            messaging.requestPermission().then(function () {
                console.log('Permission granted');

                return messaging.getToken().then(function (currentToken) {
                    if (currentToken) {
                        console.log('TOKEN_1: '+currentToken);
                        return currentToken;
                    } else {
                        console.warn('Nenhum id disponível, Solicite permissão apra gerar um');
                    }
                })
                .catch(function(err) {
                    console.warn('get token err 2', err);
                });
            });

            messaging.getToken()
                .then(function(currentToken) {
                    if (currentToken) {
                        console.log('TOKEN_2: '+currentToken);
                        return currentToken;
                    } else {
                        console.warn('Nenhum id disponível, Solicite permissão apra gerar um 2');
                    }
                })
                .catch(function(err) {
                    console.warn('get token err', err);
                });
/*
        })
        .catch(err => console.log('Service Worker Error', err))
}

*/