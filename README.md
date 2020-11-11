# NodeKafka test assignment   
 
## Description

Microservice App, consisting of next services:  

 - Front End service (available by default on [http://localhost:9091/](http://localhost:9091/))
 - Backend API DataFlow service
 - Backend Data Sink service
 - Backend Data Flow service

### Configuration
Settings are presented in two files: `.env` and `/config/config.ts`

### How to build
 - clone repo
 - `cd` into its root folder
 - run `npm install` from console
 - run `config-and-start-local-services.sh` script, which will build source code, pull and run Kafka, Zookeeper and Redis Docker containers
 - run `npm install pm2 -g`, what will install [pm2 process manager](https://github.com/Unitech/pm2)  
 - run `pm2 start ecosystem.config.js` from console to start app micro services
 - run `pm2 monit` to get access to microservices stats and logs, select service with arrow keys to view logs
 - to stop microservices run `pm2 stop ecosystem.config.js` from console
