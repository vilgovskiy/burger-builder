## Burger builder
![Screenshot](/images/screenshot.jpg)

## Setup Database
This project uses NoSQL cloud database solution called Firebase Realtime Database (more on it here: https://firebase.google.com/docs/database)

1. [Create a database with this tutorial](https://firebase.google.com/docs/database/rest/start)
2. Set up authentication
  a. [In Firebase console](https://console.firebase.google.com/), open the *Auth* section.
  b. On the *Sign in method tab*, enable the *Email/password* sign-in method and click *Save*.
3. Go back to Real Time database and set rules to be following:
    ```
    {
    "rules": {
      "ingredients": {
        ".read": "true",
        ".write": "true"
      },
      "orders": {
        ".read": "auth != null",
        ".write": "auth != null",
          ".indexOn": ["userID"]
      }
    }
  }
  ```
4. Retrieve your Firebase API key and database url, create a file `src/secure/private.js` and add 2 exported constants like this:
  ```
  export const API_KEY = {your API key string}
  export const FIREBASE_URL = {your Database URL}
  ```

## Running Burger Builder

1. make sure all your dependencies are installed by running `npm install` in root folder
2. run `npm start`, it will open you default browser and direct it to localhost:3000
