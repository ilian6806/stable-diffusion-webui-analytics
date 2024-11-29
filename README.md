# stable-diffusion-webui-analytics
Track Stable Diffusion Web UI usage

## **1. Set Up a Firebase Project**

### a. **Create a Firebase Project**

1. **Go to the
Firebase Console (https://console.firebase.google.com/) and sign in with your Google account.
.**
2. **Click on "Add project"** and follow the prompts to create a new project. You must enable Google Analytics for your project.
3. **Once created**, navigate to your project's dashboard.

### b. **Enable Firebase Authentication**

1. In the Firebase Console, select your project.
2. Navigate to **"Authentication"** from the left sidebar.
3. Click on the **"Sign-in method"** tab.
4. **Enable "Google"** as a sign-in provider:
    - Click on the **"Google"** provider.
    - Enable it and provide the necessary information (e.g., project support email).
    - Click **"Save"**.

### c. **Set Up Firebase Analytics**

1. In the Firebase Console, navigate to **"Analytics -> Dashboard"**.
2. Click on **Web** icon.
3. **Register your app** by providing a name for your app.
4. **Copy the Firebase SDK config** and paste it extension settings. It must look like this:
    ```json
    {
      "apiKey": "API_KEY",
      "authDomain": "PROJECT_ID.firebaseapp.com",
      "databaseURL": "https://PROJECT_ID.firebaseio.com",
      "projectId": "PROJECT_ID",
      "storageBucket": "PROJECT_ID.appspot.com",
      "messagingSenderId": "SENDER_ID",
      "appId": "APP_ID",
      "measurementId": "MEASUREMENT_ID"
    }
    ```