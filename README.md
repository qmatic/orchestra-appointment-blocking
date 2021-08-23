# Appointment Blocking

This is an Angular 11 application. Read more about Angular here: `https://angular.io/docs`

This project uses ngrx/store to keep the application state. Read more here:
`https://github.com/ngrx/platform`

Or view this helpful tutorial to get some insight to working with ngrx and understanding this application:
`https://www.youtube.com/watch?v=N_UQx8dPPkc&list=PLW2eQOsUPlWJRfWGOi9gZdc3rE4Fke0Wv&index=1`

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 11.2.9.


## Getting Started

These instructions will help you get started running this project on your local machine for,
1. Development
    1. Orchestra Installed on your local machine
    2. Orchestra Installed on a remote machine
2. Creating the Production Build

## Prerequisites

Make sure you have installed 
1. Node 11 or above. `https://nodejs.org/`
2. gulp (after installing node `npm install gulp-cli`)


## Table of contents

- [Installation](#installation)
- [Development](#development) 
- [Production Build](#production-build) 
- [Deployment Guide](#deployment-guide) 
- [Further help](#further-help) 
  
## Installation
BEFORE YOU INSTALL: please read the [Prerequisites](#prerequisites)

Clone the Appointment Blocking Solution
```
git clone https://github.com/qmatic/orchestra-appointment-blocking.git
```
When the cloning is complete, install the required node modules by running the following command from the project directory
```
npm install
```
We recommend Visual Studio Code (https://code.visualstudio.com/) as the IDE since it fits well with angular-cli tools. The original project is developed on visual code IDE.


## Development

If you have orchestra installed locally running on port 8080 run ```npm start``` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files. 
If you are working towards a remote orchestra you have to reconfigure the proxy config. You can use your own proxy.config.json like in the case of the script "startlocal" (package.json -> scripts). Create your own proxy.config.json using the proxy.config.json as a template and replace the targets.
You can find available npm commands in package.json under "scripts".
Use them by running ```npm run <your-command>```

### Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

### Appointment Blocking
Components are located in **src/app/components**
The store is located in **src/store**

The application routes can be found in: **src/routes/app-routes.ts**

Release notes are located in **/release-notes**

## Production Build
 ### Create war file

Run `npm run build-artifactory` to build the project. The build artifacts will be stored in the `dist/` directory.

The build number is taken from `src/app.json`
## Deployment Guide
 ### Configuration
 * Add a record for application and application_modules table

    *  MS SQL/Postgre SQL

    INSERT INTO qp_central.applications
    (id,branch_app,is_distributed,enabled,icon_url,url,version,view_index)
    VALUES('appointmentblocking',true,false,1,'images/icons/application.png','appointmentblocking',1,120)

    INSERT INTO qp_central.application_modules     
     (id,is_distributed,enabled,icon_url,privilege_level,url,view_index,application_id)
     VALUES ('appointmentblocking',0,1,NULL,20,NULL,110,'appointmentblocking')

    * Oracle

    INSERT INTO applications
           (id,branch_app,is_distributed,enabled,icon_url,url,version,view_index)
     VALUES('appointmentblocking',1,0,1,'images/icons/application.png','appointmentblocking',1,120);


    INSERT INTO application_modules     
           (id,is_distributed,enabled,icon_url,privilege_level,url,view_index,application_id)
     VALUES ('appointmentblocking',0,1,NULL,20,NULL,110,'appointmentblocking');

 * Add new section to commonMessages.properties 
application.appointmentblocking                  = Appointment Blocking
application.appointmentblocking.description      = Appointment Blocking Workstation
module.appointmentblocking                       = Appointment Blocking

 * Create new role for Appointment Blocking and add Appointment Blocking module, Appointment, Calendar Admin and Connector EntryPoint to it.

 * Copy "appointmentblocking.war" to the "custdeploy" folder of Orchestra and restart the service.

 Note that, this application only for central usage. Not for distributed systems. Not work with Calendar Client(Calendar) application.
## Further help
To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).


## License

### Apache Font License
Copyright 2021 Qmatic

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
