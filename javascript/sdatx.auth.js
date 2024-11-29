
window.sdatx = window.sdatx || {};
sdatx = window.sdatx;

sdatx.auth = (function () {

    function showUserProfile(data) {
        const signInContainer = document.getElementById('sdatx-sign-in-container');
        if (signInContainer) {
            signInContainer.parentNode.removeChild(signInContainer);
        }
        const profileCard = document.createElement('div');
        profileCard.classList.add('sdatx-profile-card');
        profileCard.innerHTML = `
            <img src="${sdatx.utils.getCachedImageSrc(data.picture)}" alt="User Image" class="sdatx-profile-image">
            <div class="profile-name">${data.email.split('@')[0]}</div>
        `;
        profileCard.onclick = () => {
            sdatx.dialog.show({
                title: 'User Profile',
                content: `
                    <div class="sdatx-profile-dialog">
                        <img src="${sdatx.utils.getCachedImageSrc(data.picture)}" alt="User Image" class="sdatx-profile-image">
                        <div>${data.email.split('@')[0]}</div>
                    </div>
                `,
                buttons: [{
                    text: 'Logout',
                    className: 'sdatx-button sdatx-button-danger',
                    action: logout
                }, {
                    text: 'Close'
                }]
            });
        };
        document.body.appendChild(profileCard);
    }

    function proceedToApp(idToken, payload, successCallback) {
        sessionStorage.setItem('user', JSON.stringify(payload));
        showUserProfile(payload);
        successCallback();
        sdatx.firebase.login(idToken, () => { /*Silent login for stats and db access */ });
        sdatx.firebase.logEvent('login');
    }

    function handleCredentialResponse(response, successCallback, errorCallback) {

        const idToken = response.credential;

        let base64Url = idToken.split('.')[1];
        let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        let jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));

        let payload = JSON.parse(jsonPayload);

        proceedToApp(idToken, payload, successCallback);

        sdatx.loader.hide();
    };

    function login(config, successCallback, errorCallback) {

        successCallback = successCallback || (() => {});
        errorCallback = errorCallback || (() => {});

        if (sessionStorage.getItem('user')) {
            showUserProfile(JSON.parse(sessionStorage.getItem('user')));
            successCallback();
            return;
        }

        const signInContainer = document.createElement('div');
        signInContainer.id = 'sdatx-sign-in-container';
        signInContainer.classList.add('sdatx-sign-in-container');

        document.body.appendChild(signInContainer);
        sdatx.loader.show();

        google.accounts.id.initialize({
            client_id: config.sd_analytics_google_client_id,
            callback: (response) => handleCredentialResponse(response, successCallback, errorCallback),
            auto_select: true
        });

        google.accounts.id.renderButton(
            document.getElementById('sdatx-sign-in-container'), // Replace with your HTML element id
            {
                theme: 'outline', // You can set this to "filled_blue" or "filled_black"
                size: 'large', // You can set this to "small", "medium", "large"
                text: 'signin_with' // Change the button text if necessary
            }
        );

        google.accounts.id.prompt((notification) => {
            if (notification.isNotDisplayed() || notification.isSkippedMoment()) {
                // Handle situations when the prompt is not displayed or skipped
                console.log('One-tap prompt not displayed or was skipped.');
                sdatx.loader.hide();
            }
        });

        if (sessionStorage.getItem('loggedOut')) {
            // Clear the flag immediately to prevent it affecting any future loads
            sessionStorage.removeItem('loggedOut');
            sdatx.loader.hide();
        }

        setTimeout(() => {
            sdatx.loader.hide();
        }, 5000);
    }

    function logout() {
        google.accounts.id.disableAutoSelect();
        sessionStorage.clear();
        sessionStorage.setItem('loggedOut', 'true');
        window.location.reload();
    }

    return { login, logout };
})();
