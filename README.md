<h1 align="center">
	<img alt="GoBarber" src=".github/logo.svg" width="200px" />
</h1>

<p align="center">		 

  <img alt="Language" src="https://img.shields.io/github/languages/top/higorhms/GoBarber?style=for-the-badge">
	
  <a href="https://www.linkedin.com/in/higormartinsdasilva/" target="_blank">
    <img alt="Made by Higor Martins" src="https://img.shields.io/badge/made%20by-Higor_martins-%2304D361?style=for-the-badge">
  </a>

  <a href="https://github.com/higorhms/GoBarber" target="_blank">
    <img alt="GitHub last commit" src="https://img.shields.io/github/last-commit/higorhms/GoBarber?style=for-the-badge">
  </a>

   <a href="https://github.com/higorhms/GoBarber/stargazers" target="_blank">
    <img alt="Stargazers" src="https://img.shields.io/github/stars/higorhms/GoBarber?style=for-the-badge">
  </a>
</p>

<img alt="Mockup" src="https://res.cloudinary.com/eliasgcf/image/upload/v1587509596/GoBarber/mockup_ocggit.png">

## 💥 Gobarber | Gostack 11

An updated version of GoBarber with changes ranging from layout to the technologies used. The application continues with the same concept as the previous version, allowing to manage administrator users, clients, schedules, and other features in a barber shop environment.

In this version, architecture standards and good programming practices such as **DDD**, **SOLID**, **Service Pattern**, and **Repository Pattern** were applied. **TDD** was used throughout the development with the tool *Jest*.

## Index
- ⚙ [Technologies Used](#-technologies)
- 🚀 [Features](#-features)
- 💻 [Instructions for Back End](#-instructions-for-back-end)
- 💻 [Instructions for Front End](#-instructions-for-front-end)
- 🐞 [Running tests](#-running-tests)

## ⚙ Technologies
  - **Back end**
    - [NodeJS](https://nodejs.org/en/)
    - [express](https://expressjs.com/pt-br/)
    - [typescript](https://www.typescriptlang.org/)
    - [typeorm](https://typeorm.io/)
    - [postgres](https://www.postgresql.org/)
    - [mongodb](https://www.mongodb.com/)
    - [redis](https://redis.io/)
    - [jest/ts-jest](https://jestjs.io/)
    - [uuidv4](https://www.npmjs.com/package/uuidv4)
    - [date-fns](https://date-fns.org/)
    - [multer](https://www.npmjs.com/package/multer)
    - [celebrate/joi]()
    - [dotenv]()
    - [class-transformer]()
    - [rate-limiter-flexible]()
    - [Amazon SES](https://aws.amazon.com/pt/ses/)
    - [Amazon S3](https://aws.amazon.com/pt/s3/?sc_channel=PS&sc_campaign=acquisition_BR&sc_publisher=google&sc_medium=english_s3_b&sc_content=s3_e&sc_detail=amazon%20s3&sc_category=s3&sc_segment=89108864428&sc_matchtype=e&sc_country=BR&s_kwcid=AL!4422!3!89108864428!e!!g!!amazon%20s3&ef_id=CjwKCAjw5cL2BRASEiwAENqAPgGlCjev7lISzLorFwcq0coRS7IXGWkuVq90tELVhk8Zdli-4Kq7rBoCT34QAvD_BwE:G:s)

  - **Front end**
    - [React](https://reactjs.org/)
    - [Typescript](https://www.typescriptlang.org/)
    - [Axios](https://github.com/axios/axios)
    - [Styled-components](https://styled-components.com/)
    - [Polished](https://polished.js.org/)
    - [React-spring](https://www.react-spring.io/)
    - [Yup](https://www.npmjs.com/package/yup)
    - [Date-fns](https://date-fns.org/)
    - [React-day-picker](https://www.npmjs.com/package/react-day-picker)

  - **Mobile**
    - [React Native](https://reactnative.dev/)
    - [React-native-vector-icons](https://github.com/oblador/react-native-vector-icons)
    - [Unform](https://github.com/Rocketseat/unform)
    - [Axios](https://github.com/axios/axios)
    - [Styled-components](https://styled-components.com/)
    - [Yup](https://www.npmjs.com/package/yup)

  - **Other technologies**
    - [Docker](https://www.docker.com/)
    
---

## 🚀 Features
- Password recovery
  - **Functional Requirements**
    - The user should be able to recover their password by providing their email;
    - The user should receive an email with password recovery instructions;
    - The user should be able to reset their password

  - **Non-Functional Requirements**
    - Use Ethereal to test sending emails in a development environment;
    - Use Amazon SES for sending in production;
    - The sending of emails should happen in the background (background job);

  - **Business Rules**
    - The link sent by email to reset the password should expire in 2 hours;
    - The user needs to confirm the new password when resetting their password;

- Profile Update
  - **Functional Requirements**
    - The user should be able to update their name, email, and password
  - **Business Rules**
    - The user cannot change their email to one that is already in use by another user;
    - To update their password, the user must enter the old password;

- Provider Panel
  - **Functional Requirements**
    - The user should be able to list their appointments for a specific day;
    - The provider should receive a notification whenever there is a new appointment;
    - The provider should be able to view unread notifications;
  - **Non-Functional Requirements**
    - The provider's appointments for the day should be stored in the cache;
    - The provider's notifications should be stored in MongoDB;
    - The provider's notifications should be sent in real-time using Socket.io;
  - **Business Rules**
    - The notification should have a read or unread status so that the provider can manage it;

- Service Scheduling
  - **Functional Requirements**
    - The user should be able to list all registered service providers;
    - The user should be able to list the days, with at least one available time slot, of a provider in a specific month;
    - The user should be able to list available time slots on a specific day of a provider;
    - The user should be able to make a new appointment with a provider;
  - **Non-Functional Requirements**
    - The listing of providers should be stored in the cache;
  - **Business Rules**
    - Each appointment must last exactly 1 hour;
    - Appointments should be available between 8 am to 6 pm (first at 8 am and last at 5 pm);
    - The user cannot schedule at a time slot already occupied;
    - The user cannot schedule at a time that has already passed;
    - The user cannot schedule services with themselves;
    
---

> Initially we need to clone the repository to have access to all folders
```bash
  # Cloning repository
  git clone https://github.com/higorhms/GoBarber.git
```

## 💻 Instructions for Back End

  We will start by creating instances of our databases. For this project, docker was used. Below are the commands to create the containers and start the instances:

  ```bash
    docker run --name database -e POSTGRES_PASSWORD=postgres -p 5432:5432 -d postgres

    docker run --name mongodb -p 27017:27017 -d -t mongo

    docker run --name redis -p 6379:6379 -d -t redis:alpine

    docker start database mongodb redis
  ```

  First, you will need to create a file containing the access information to your database. This application was developed using **Postgres** and **MongoDB**. Create a file called *ormconfig.json* in the `backend` folder and fill it out according to the model file *ormconfig.example.json*. Remember, before running migrations, to create the database and report the name of your base in the *ormconfig.json* file.
  
  ```bash
    cd backend

    yarn

    yarn typeorm migration:run

    yarn dev:server
  ```

  It will also be necessary to create a .env file, which will contain the environment variables. Use .env.example as a template.

---

## 💻 Instructions for Front End
 
  After executing the previous step and ensuring that the backend is running, you can start the front end:

  ```bash
	cd frontend

  	yarn

  	yarn start
  ```

## 🐞 Running Tests

  ```bash
    cd backend

    yarn test
  ```
---
