## Pure Aloe Distributor App

## Installation Instructions

1. Install the Pure Aloe Salesforce application first. See instructions here: https://github.com/dreamforce17/purealoe

1. In Setup > Users, create an integration user that you will use to connect to Salesforce from the Node.js app. Select **Salesforce** as the license type and **System Administrator** as the profile. Log in at least one with that user in a browser (https://test.salesforce.com), and select to not register your phone number.

1. In Setup > Users > Permission Sets, assign your integration user to the purealoe permission set.

1. Create a Connected App in a developer edition org or in your hub org (not in your scratch org)

1. Clone this repository:
    ```
    git clone https://github.com/dreamforce17/purealoe-distributor
    cd purealoe-distributor
    ```

1. Create a Heroku app and give it a name:
    ```
    heroku create *your_app_name*
    ```

1. Set the config variables for your app:
    ```
    heroku config:set SF_CLIENT_ID=your_connected_client_id
    heroku config:set SF_CLIENT_SECRET=your_connected_client_secret
    heroku config:set SF_USER_NAME=your_integration_user_name
    heroku config:set SF_USER_PASSWORD=your_integration_user_password
    heroku config:set SF_ENVIRONMENT=sandbox
    ```

    Set **SF_ENVIRONMENT** to **sandbox** if using a scratch org, or **production** if using a regular Developer Edition.

1. Push the code to your Heroku app:
    ```
    git push heroku master
    ```

    or run the application locally:

    ```
    heroku run:local npm start
    ```
