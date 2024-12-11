# PicoPlacaApp

PicoPlacaApp is a mobile application developed in Ionic that helps drivers check the "Pico y Placa" restrictions for vehicles in their city. The app allows users to enter their license plate number and obtain information on whether they can circulate on a specific day or if they are subject to restrictions.

## Description

The application calculates vehicle circulation restrictions based on the last digit of the license plate and the day of the week. If the vehicle is restricted on that day, the application displays the corresponding message; if not, it indicates that it can circulate normally.

## Features

- Query "Pico y Placa" restrictions according to the license plate number.
- Intuitive user interface.
- Responsive design for different screen sizes.
- Code structured in reusable components and services.

## Technologies

- [Ionic Framework](https://ionicframework.com/)
- Angular
- TypeScript
- SCSS

## Requirements

Before you begin, make sure you have the following programs installed:

- [Node.js](https://nodejs.org/)
- [Ionic CLI](https://ionicframework.com/docs/cli)
- [Angular CLI](https://angular.io/cli)

## Installation

To install the application locally on your machine, follow these steps:

1. Clone the repository:

```bash
git clone https://github.com/your-user/PicoPlacaApp.git
cd PicoPlacaApp

2. Install the dependencies:

Once you have the cloned project, install the dependencies using npm:

npm install

3. Start the development server:

Run the following command to start the server and View the app in your browser:

ionic serve

Access the app:

4. After running the command above, open your browser and navigate to http://localhost:8100/ to see the app in action.