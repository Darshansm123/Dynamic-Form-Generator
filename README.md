## DashBoard
#### 1. Setup Instructions
#### 2. Example JSON Schemas
#### 3. Local Development Guide
#### 4. Screen Shots




# Dynamic Form Generator

This project allows users to dynamically generate forms based on JSON schemas. It is built using React, TypeScript, Tailwind CSS, React Hook Form, Playwright for E2E testing, and Jest for unit testing. The project supports real-time updates, form validation, and user-friendly form generation.

## Setup Instructions
To get started with this project, follow the steps below:

### 1. Clone the repository:

git clone https://github.com/your-username/your-repo-name.git

cd your-repo-name

#### For Example
git clone https://github.com/Darshansm123/Dynamic-Form-Generator.git

cd Dynamic-Form-Generator

### 2. Install dependencies: Install the required dependencies using npm:

npm install

### 3. Run the application: To start the app in development mode:

npm start

This will open the application at http://localhost:3000.

### 4. Production build: To build the app for production:

npm run build

### 5. Ejecting: If you want to customize the build configuration, you can eject (not recommended unless necessary):

npm run eject


## Example JSON Schemas

 ### 1. Basic Text Field

 {
  "formTitle": "Sample Form",
  "formDescription": "This is a sample form.",
  "fields": [
    {
      "id": "name",
      "type": "text",
      "label": "Full Name",
      "required": true
    },
    {
      "id": "email",
      "type": "email",
      "label": "Email Address",
      "required": true,
      "validation": {
        "pattern": "^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$",
        "message": "Invalid email"
      }
    }
  ]
}

### 2. Radio Button Field

{
  "formTitle": "Gender Form",
  "fields": [
    {
      "id": "gender",
      "type": "radio",
      "label": "Gender",
      "options": [
        { "label": "Male", "value": "male" },
        { "label": "Female", "value": "female" },
        { "label": "Other", "value": "other" }
      ]
    }
  ]
}

### 3. Dropdown (Select) Field
{
  "formTitle": "Gender Form",
  "fields": [
    {
      "id": "gender",
      "type": "radio",
      "label": "Gender",
      "options": [
        { "label": "Male", "value": "male" },
        { "label": "Female", "value": "female" },
        { "label": "Other", "value": "other" }
      ]
    }
  ]
}

### 4. Sample JSON Schema
{
  "formTitle": "Project Requirements Survey",
  "formDescription": "Please fill out this survey about your project needs",
  "fields": [
    {
      "id": "name",
      "type": "text",
      "label": "Full Name",
      "required": true,
      "placeholder": "Enter your full name"
    },
    {
      "id": "email",
      "type": "email",
      "label": "Email Address",
      "required": true,
      "placeholder": "you@example.com",
      "validation": {
        "pattern": "^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$",
        "message": "Please enter a valid email address"
      }
    },
    {
      "id": "companySize",
      "type": "select",
      "label": "Company Size",
      "required": true,
      "options": [
        { "value": "1-50", "label": "1-50 employees" },
        { "value": "51-200", "label": "51-200 employees" },
        { "value": "201-1000", "label": "201-1000 employees" },
        { "value": "1000+", "label": "1000+ employees" }
      ]
    },
    {
      "id": "industry",
      "type": "radio",
      "label": "Industry",
      "required": true,
      "options": [
        { "value": "tech", "label": "Technology" },
        { "value": "healthcare", "label": "Healthcare" },
        { "value": "finance", "label": "Finance" },
        { "value": "retail", "label": "Retail" },
        { "value": "other", "label": "Other" }
      ]
    },
    {
      "id": "timeline",
      "type": "select",
      "label": "Project Timeline",
      "required": true,
      "options": [
        { "value": "immediate", "label": "Immediate (within 1 month)" },
        { "value": "short", "label": "Short-term (1-3 months)" },
        { "value": "medium", "label": "Medium-term (3-6 months)" },
        { "value": "long", "label": "Long-term (6+ months)" }
      ]
    },
    {
      "id": "comments",
      "type": "textarea",
      "label": "Additional Comments",
      "required": false,
      "placeholder": "Any other details you'd like to share..."
    }
  ]
}


## Local Development Guide

### 1. Starting the development server: After cloning the repository and installing dependencies, run the following command to start the development server:

npm start

The app will be available at http://localhost:3000.

### 2. Testing: Run unit tests using Jest and end-to-end tests using Playwright:

npm test        # To run unit tests
npm run e2e     # To run Playwright end-to-end tests

### 3. Building the app: To create a production build of the app, run:

npm run build

### 4. Deploying to Vercel/Netlify: Once you have the production build, you can deploy it to platforms like Vercel or Netlify.

For Vercel, simply connect your GitHub repository to your Vercel account and deploy the project.
For Netlify, drag the build folder to the Netlify dashboard to deploy.
