# React Menu Management App

## Overview

### This React application allows users to manage a menu, providing features to add items, edit existing items, and view detailed information about each menu item.

## Table of Contents

Prerequisites
Installation
Usage
Folder Structure
Technologies Used
Troubleshoot

### Prerequisites

Make sure you have the following tools installed on your machine:
Node.js (v14.x or later)
npm (Node.js package manager, comes with Node.js installation)

### Installation

To run this project locally, follow the steps below:

#### Clone the repository:

`git clone https://github.com/your-username/react-menu-management.git`

#### Change into the project directory:

`cd react-menu-management`

#### Install dependencies:

`npm install`

#### Start the development server:

`npm run start`
This will launch the application locally, and you can access it in your web browser at `http://localhost:3000/`.
The development server will automatically reload the application if you make any changes to the source code.

#### Access the Web Application:

Open your web browser and navigate to `http://localhost:3000/` to access the React Menu Management App.

### Usage

The application offers the following functionality:

Add Items: `Visit the "Add Items" page to add new menu items, providing details such as name, description, price, and customizations.`

Manage Items: `Navigate to the "Manage Items" page to view and manage existing menu items. Edit or delete items as needed.`

Item Details: `Click on a specific item on the "Manage Items" page to access detailed information, including customizations and variants.`

### Folder Structure

The project follows a structured folder arrangement:
src/
|-- components/
| |-- Layout.js
| |-- ...
|-- pages/
| |-- AddItems.js
| |-- ManageItems.js
| |-- ItemDetails.js
| |-- EditItem.js
|-- config/
| |-- apis/
| |-- MenuItems.js
| |-- ApiGenerate.js
|-- App.js
|-- App.css
|-- ...

components: `Contains reusable UI components`.
pages: `Holds individual pages/components for distinct app functionalities.`
config: `Contains configuration files, including API definitions and generators.`

### Technologies Used

`React`
`react-router-dom`
`TypeScript`
`CSS (Tailwind CSS)`

### Troubleshoot

If there are any errors or if the data does not load. Simply reset the json file from the following link:
`https://docs.google.com/document/d/1PIy2MaiyOQHUzRmy7LuMrAGWt0QKPfve20qurVza6uE/edit`