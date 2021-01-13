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

## What was the goal of the app:

Payment Processor (Tokenizer)
Description: Build payment processor simulation (Tokenizer) using Node and Kafka
Required components:
===================
- API Layer (HTTP)
- Messaging Bus (KAFKA)
- Persistence layer (Redis)
Required Configuration:
==================
- Service dependencies setup script (BASH)
- Service build automation tool
- Service running script (BASH)
Framework/Library

==================
- Node
- KAFKA streams Client

===================

React / Vue/ anything
#### A) Create a simple web client (Using React or Plain JS) with a form to accept
• card no
• expiration date
• cvv number
that will call the API as mentioned in Acceptance Criteria Data Source (point 1 below).
Add basic validations
(Do not worry about styles)
#### B) Response will also show a card in the web client with the following:

if success or else an “Error message” if error
Card : 4007 0000 00027
Expiration : Feb 20
CVV : 123
Transaction ID : <returned id>

### Acceptance criteria:
1) Data Source (API Layer, module #1):
- Client sends HTTP request to payment processor tokenizer:
curl -X POST http://0.0.0.0:1001/api/auth \
-H 'Content-Type: application/json' \
-d '{
"cardNumber": "4007000000027",
"expirationDate": "02/20",
"cardNumber": "123"
}'
The API should be called from web client (point (A) above)
(Use axios or fetch via expressJS or plain Node)
- Application produces JSON to KAFKA INPUT topic
- Application returns HTTP response:
{
"success": true,
"transactionId": [UNIQUE GENERATED ID]
}
The response should be sent to from web client (point (B) above)
2) Data Flow (Tokenizer, module #2):
- Application consumes data from the API Layer Source (KAFKA INPUT topic)
- Application encrypts sensitive information by using of symmetric-key algorithm:
Func (cardNumber, expirationDate, cardNumber) => [TOKEN, KEY]
3) Data Sink (Tokenizer, module #2):
- Application produces JSON data to KAFKA OUTPUT topic:
{
"transactionId": ...,
"token": ...
}
- Application puts decryption key to REDIS storage
4) Data Proof (Consumer, module #3):
- Application consumes data from KAFKA OUTPUT topic
- Application finds decryption key in REDIS storage
- Application decrypts token:
Func (TOKEN, KEY) => [cardNumber, expirationDate, cardNumber]
- Application prints JSON to console:
{
"transactionId":
{
" cardNumber ": ...,
"expirationDate": ...,
"cardNumber": ...
}
}
### Configuration notes:
- Service dependencies setup instructions:
path/to/kafka-topics.sh --create --topic data-input \
--replication-factor 1 \
--partitions N
path/to/kafka-topics.sh --create --topic data-output \
--replication-factor 1 \
--partitions N
• Service packaging instructions
Use node specific packaging instructions if needed)
//Java equivalent
- mvn package -pl source/
- mvn package -pl flow/
- mvn package -pl proof/
• Service running instructions:
node <configs> <source js file>
node <configs> <flow js file>
node <configs> <proof js file>
// Java equivalent
- java -Dconfig.file=path/to/config -jar source/target/source-1.0.0.jar
- java -Dconfig.file=path/to/config -jar flow/target/flow-1.0.0.jar
- java -Dconfig.file=path/to/config -jar proof/target/proof-1.0.0.jar
• Publishing:
- Please provide link to the repository/repositories on any web-based hosting service
(github preferably) for source code (for both node service and the web client)
