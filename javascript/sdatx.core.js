
window.sdatx = window.sdatx || {};
sdatx = window.sdatx;

sdatx.core = (function () {

    const dependencies = [
        'https://accounts.google.com/gsi/client',
        'https://www.gstatic.com/firebasejs/10.5.2/firebase-app-compat.js',
        'https://www.gstatic.com/firebasejs/10.5.2/firebase-auth-compat.js',
        'https://www.gstatic.com/firebasejs/10.5.2/firebase-analytics-compat.js'
    ];

    async function loadDependencies() {
        for (const src of dependencies) {
            await sdatx.utils.loadScript(src);
        }
    }

    function loadConfig() {
        return fetch('/sdatx/config.json?_=' + (+new Date()))
            .then(response => response.json())
            .then(jsonResponse => {
                return jsonResponse;
            })
            .catch(error => {
                state.logging.error(error);
                throw error;
            });
    }

    async function init() {

        let config = await loadConfig();

        if (! config) {
            console.error('[SD Analytics]: Config not loaded.');
            return
        }

        if (! config.sd_analytics_google_client_id || ! config.sd_analytics_google_client_id.trim().length) {
            console.error('[SD Analytics]: Google Client ID not set.');
            return;
        }

        if (! config.sd_analytics_firebase_config || ! config.sd_analytics_firebase_config.trim().length) {
            console.error('[SD Analytics]: Firebase config not set.');
            return;
        }

        try {
            config.sd_analytics_firebase_config = JSON.parse(config.sd_analytics_firebase_config);
        } catch (error) {
            try {
                eval('config.sd_analytics_firebase_config = ' + config.sd_analytics_firebase_config);
            } catch (error) {
                console.error('[SD Analytics]: Firebase config is not a valid JSON.');
                return;
            }
        }

        await loadDependencies();
        sdatx.firebase.init(config);
        sdatx.auth.login(config);
    }

    return { init };
})();