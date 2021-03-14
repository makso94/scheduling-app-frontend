# Appointment Scheduling, Web App (Frontend)
This project is writen in Angular 11.0.4

>Note: Run the project [Backend](https://github.com/makso94/scheduling-app-backend) previously.

In order to run this project, follow the following steps:

0. To run this project you need to have installed [Docker engine](https://www.docker.com/) on your local machine.

    Docker installation tutorial for Ubuntu distros
    * https://docs.docker.com/engine/install/ubuntu/
    * https://docs.docker.com/engine/install/linux-postinstall/

1. Clone github project

2. From your local machine run docker_console.sh script
  
      **The script MUST be runned from project root directory**

    ```
      ./scripts/docker_console.sh
    ```
3. In the running container run docker_serve.sh script in order to serve the project
      
      **The script MUST be runned from project root directory**
    ```
      ./scripts/docker_serve.sh
    ```
4. Open [localhost](http://localhost/) in your browser and you need to see the login form

    Admin credentials:
    ```
    email: admin@hs.com
    pass: 12345
    ```
5. Have FUN !

----------

> Note: This project is made for the purpose of graduate thesis.
