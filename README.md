<p float="left">
    <img alt="" src="https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E" />
    <img alt="" src="https://img.shields.io/badge/Python-FFD43B?style=for-the-badge&logo=python&logoColor=blue" />
</p>

# stable-diffusion-webui-analytics

This extension is for AUTOMATIC1111's [Stable Diffusion web UI](https://github.com/AUTOMATIC1111/stable-diffusion-webui)

## Capabilities

* Prompt user with google auth to use the web UI
* Send event data to Firebase Analytics

## **Installation**

### **1. Set Up a Firebase Project**

#### a. **Create a Firebase Project**

1. **Go to the
Firebase Console (https://console.firebase.google.com/) and sign in with your Google account.
.**
2. **Click on "Add project"** and follow the prompts to create a new project. You must enable Google Analytics for your project.
3. **Once created**, navigate to your project's dashboard.

#### b. **Enable Firebase Authentication**

1. In the Firebase Console, select your project.
2. Navigate to **"Authentication"** from the left sidebar.
3. Click on the **"Sign-in method"** tab.
4. **Enable "Google"** as a sign-in provider:
    - Click on the **"Google"** provider.
    - Enable it and provide the necessary information (e.g., project support email).
    - Click **"Save"**.

#### c. **Set Up Firebase Analytics**

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

### **2. Second URL**
You can have second URL to send event data to. You can set it in the extension settings.

## Contributing

Feel free to submit PRs to develop!

<p align="center">
  ...and you can always buy me a :beer:! <br/><br/>
  <a href="https://www.paypal.com/paypalme/ilian6806" target="_blank">
    <img src="https://img.shields.io/badge/Donate-PayPal-green.svg" alt="Donate with PayPal"/>
  </a>
</p>