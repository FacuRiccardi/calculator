# Instalation process

- Clone the repository
- Run 'nvm use' or change the version of node to the one in the .nvmrc file
- Install the dependencies with 'npm install'
- The project runs on the port 3000, if you want it to run on another port, copy and paste the .env.example file to a new file called .env, and change the PORT value to the new port

# Running the proyect

- Run 'npm run start' to start the project
- Also, you can run 'npm run dev' to start the project on development mode

# Run the tests

- Run 'npm run test' to run all the tests of the project

# Endpoints

## POST /calculator
- It waits a JSON Body with the property 'expression', containing a string with the expression to calculate
- It returns a JSON with the property 'result' with the result of the given expression
