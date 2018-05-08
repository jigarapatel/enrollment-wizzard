# enrollment-wizzard
An Apple coding excercise for enrollment wizzard

# Scenario

The Wizard: 
    Create a step-by-step enrollment wizard. Depending on the decisions made in each step, the user will end up as one of three account types: Lite, Standard or Premium and this should be reflected in the summary.

    Requirements:
        1. The Data
            • Assume the user is already authenticated and you have account data available via an API or boot- strapped.
            • Pre-populate with at least username, first name, last name email and account type.
        2. The Steps Default Landing:
        The page has form fields First Name, Last Name, Email and opt-in checkboxes for Standard, Premium. Also there should be a button to submit/continue depending on the opt-ins. The decision to show the next screen depends on the options selected in this page.
            Step One: Lite
                • If the user submits here with default pre-populated username, first name, last the user becomes a Lite Account and the conclusion page should show the   collected information and Account Type.
            Conditional Step Two: Standard
                • If the user opts to Standard and clicks Continue, this page should show form fields for Country, Date of Birth and take the information. If the Age is less than 14, then show one additional screen containing a email form field for the parent consent. Additional condition is if user’s age is less than 14, the final conclusion page should show “An email has been sent to <parent’s email address>.
            Conditional Step Three: Premium
                • If the user opts-in to the Plus account, they should be taken through the Standard flow(listed above in Step 2) and should land on this page which has form fields like credit card and CVV(payment information). Collect the user information and Submit the information.
        3. The Conclusion
            • The user is shown their account type along with a summary of the
              entered information from the previous steps.
        Other Important requirements:
            • Every page should show the information collected so far and Account Type
            • Consider all form validations/error cases/button texts based on conditions.


## Run the app

0. ```npm install```
    Note: This app uses `json-server` as a local server. See documentation for json-server [here](https://github.com/typicode/json-server).
    To run this app, first start local server running on [here](localhost:3000)
            To run json server, run
            ```npm run json:server```
1. ```npm start``` <== this will start application running on port 4000