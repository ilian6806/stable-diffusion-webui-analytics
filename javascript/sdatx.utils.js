window.sdatx = window.sdatx || {};
sdatx = window.sdatx;

sdatx.utils = (function() {

    const prefix = 'sdatx-image';

    function fetchAndCacheImage(url, localStorageKey) {
        fetch(url)
            .then(response => response.blob())
            .then(blob => {
                const reader = new FileReader();
                reader.onloadend = () => {
                    const base64Data = reader.result;
                    localStorage.setItem(localStorageKey, base64Data);
                };
                reader.readAsDataURL(blob);
            })
            .catch(error => {
                console.error('Error fetching the image:', error);
            });
    }

    function getCachedImageSrc(imageUrl) {

        const key = prefix + '-' + imageUrl;
        const cached = localStorage.getItem(key);

        if (cached) {
            return cached;
        } else {
            fetchAndCacheImage(imageUrl, key);
            return imageUrl;
        }
    }

    function loadScript(src) {
        return new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = src;
            script.onload = resolve;
            script.onerror = reject;
            document.body.appendChild(script);
        });
    }

    return {
        getCachedImageSrc,
        loadScript
    };

})();
