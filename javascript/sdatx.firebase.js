
window.sdatx = window.sdatx || {};
sdatx = window.sdatx;

sdatx.firebase = {

    app: null,
    analytics: null,
    auth: null,
    user: null,

    init: function (config) {

        if (this.app) {
            console.log('Firebase is already initialized.');
            return;
        }

        this.app = firebase.initializeApp(config.sd_analytics_firebase_config);
        this.analytics = firebase.analytics(this.app);
        this.auth = firebase.auth(this.app);

        this.auth.onAuthStateChanged(user => {
            if (user) {
                this.user = user;
            } else {
                console.log('User is signed out');
            }
        });

        this.logEvent = (name, params) => {
            let eventParams = params || {};
            if (sessionStorage.getItem('user')) {
                eventParams.user = JSON.parse(sessionStorage.getItem('user')).email.split('@')[0];
            }
            this.analytics.logEvent(this.analytics, 'evt_' + name, eventParams);
        };
    },

    login: function (credential, successCallback, errorCallback) {

        const cred = firebase.auth.GoogleAuthProvider.credential(credential);

        this.auth.signInWithCredential(cred)
            .then((userCredential) => {
                console.log('[Firebase] User signed in:', userCredential.user.displayName);
                if (successCallback) {
                    successCallback(userCredential);
                }
            })
            .catch((error) => {
                console.error('[Firebase] Error signing in:', error);
                if (errorCallback) {
                    errorCallback(error);
                }
            });
    }
};