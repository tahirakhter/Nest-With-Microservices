NestJS Event-Driven Microservices

A simple example of building event-driven microservices with NestJS.

This project demonstrates how a client application can communicate with a NestJS microservice and use event-based messaging to process operations asynchronously.

Architecture
                         HTTP
                          │
                          ▼
                  ┌───────────────┐
                  │    Client     │
                  │    NestJS     │
                  └───────┬───────┘
                          │
                          │ Request
                          ▼
                ┌─────────────────────┐
                │    MicroService     │
                │       NestJS        │
                └──────────┬──────────┘
                           │
                           │ Event
                           ▼
                 ┌───────────────────┐
                 │ Event Processing  │
                 │ / Message Handler │
                 └───────────────────┘


The goal of this project is to demonstrate the basic concepts behind NestJS microservices and event-driven communication.

Project Structure
NestWithMicroservices/
│
├── Client/
│   ├── src/
│   └── package.json
│
├── MicroService/
│   ├── src/
│   └── package.json
│
└── README.md

Client

The Client application is responsible for receiving HTTP requests and communicating with the microservice.

Example endpoints:

POST /create
GET  /item/:id


The client runs on:

http://localhost:3001

MicroService

The MicroService application contains the microservice logic and demonstrates event-based communication using NestJS.

This separation allows the client and microservice to run as independent applications.

Technologies

Node.js

TypeScript

NestJS

NestJS Microservices

Event-based messaging

HTTP

Getting Started
1. Clone the repository
git clone https://github.com/tahirakhter/NestWithMicroservices.git

cd NestWithMicroservices

2. Install Client dependencies
cd Client
npm install

3. Start the Client
npm run start


The client will be available at:

http://localhost:3001

4. Install MicroService dependencies

Open another terminal:

cd MicroService
npm install

5. Start the MicroService
npm run start:local

API Examples
Create Item
POST http://localhost:3001/create

Get Item
GET http://localhost:3001/item/1

What This Project Demonstrates

This project is intended as a learning example for:

Creating NestJS microservices

Separating an application into independent services

Event-based communication

Client-to-microservice communication

Understanding asynchronous messaging

Structuring a basic microservices application

Why Event-Driven Microservices?

In a traditional application, components often communicate directly:

Service A → Service B


With event-driven architecture, a service can publish an event instead:

Service A
   │
   │ publishes event
   ▼
 Event Bus
   │
   ├──────────────► Service B
   │
   └──────────────► Service C


This can reduce direct coupling between services and makes it easier to add new consumers later.

Learning Goals

After working through this project, you should have a basic understanding of:

How NestJS microservices are structured.

How a client communicates with a microservice.

What event-based messaging means.

The difference between synchronous requests and asynchronous events.

How independent services can be developed and run separately.

Status

This repository is primarily a learning/demo project for understanding NestJS microservices and event-driven communication.

License

This project is available for learning and experimentation.
