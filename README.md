# PMT App

PMT App is a web application designed for employee and medium-term plan management, adapted to meet client needs.

- Backend : Developed with Node.js and Express.js.
- Frontend : Developed with React.js.
- Database : MySQL.

## Steps to Run the Application

### 1. Database Configuration
- Create a database named `pmt`.
- Execute `SQLscript.sql` to create the tables.
- Execute `data.sql` to populate the database with test data.

### 2. Backend Setup
- Navigate to the backend directory :
  ```bash
  cd PMT_Back
  ```
- Install necessary packages :
  ```bash
  npm install bcrypt
  ```
- Start the backend server :
  ```bash
  node app.js
  ```

### 3. Frontend Setup
- Navigate to the frontend directory :
  ```bash
  cd PMT_Front
  ```
- Install required packages and libraries :
  ```bash
  npm install axios bootstrap html2canvas jspdf lodash react-apexcharts react-data-table-component react-router-dom react-scripts react-table reactstrap styled-components web-vitals @fortawesome/fontawesome-svg-core @fortawesome/free-solid-svg-icons @fortawesome/react-fontawesome
  ```
- Start the frontend server:
  ```bash
  npm start
  ```

### 4. Running the Application
- On launching the application, the login page will appear. Use the following credentials :
  
  - **Admin:**
    - Username: `12345M`
    - Password: `test`
  - **User:**
    - Username: `54321P`
    - Password: `sonatrach`

---
