DSM-Web
DSM-Web is a front-end application tool created with Angular 18. It provides functionality to handle form submissions and file uploads, sending data to the backend.
Project Description
DSM-Web is designed to:

Present forms to users
Handle file uploads
Communicate with a backend service

The project was created by Taylor Lake using the latest version of Angular (v18) and utilizes Angular Material as the CSS framework.
Technologies Used

Angular 18
Angular Material
Azure DevOps Repository

Prerequisites
Before you begin, ensure you have the following installed:

Node.js (preferably the latest LTS version)
npm (Node Package Manager)
Angular CLI (v18)

Installation

Clone the repository:
Copygit clone https://dev.azure.com/your-organization/your-project/_git/dsm-web

Navigate to the project directory:
Copycd dsm-web

Install dependencies:
Copynpm install


Development server
Run ng serve for a dev server. Navigate to http://localhost:4200/. The application will automatically reload if you change any of the source files.
Code scaffolding
Run ng generate component component-name to generate a new component. You can also use ng generate directive|pipe|service|class|guard|interface|enum|module.
Build
Run ng build to build the project. The build artifacts will be stored in the dist/ directory.
Running unit tests
Run ng test to execute the unit tests via Karma.
Running end-to-end tests
Run ng e2e to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.
Latest Angular CLI Commands

Create a new Angular project: ng new project-name
Generate a new component: ng generate component component-name or ng g c component-name
Generate a new service: ng generate service service-name or ng g s service-name
Generate a new module: ng generate module module-name or ng g m module-name
Add Angular Material: ng add @angular/material
Build for production: ng build --prod
Run unit tests: ng test
Run end-to-end tests: ng e2e
Update Angular: ng update @angular/cli @angular/core

Adding to an Existing Repository
If you're adding this project to an existing repository, use the following Git commands:
Copycd existing_repo
git remote add origin https://gitlab.com/taylienz/dsm-web.git
git branch -M main
git push -uf origin main
Contributing
Please read CONTRIBUTING.md for details on our code of conduct, and the process for submitting pull requests to us.