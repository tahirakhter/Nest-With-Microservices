NestJS Event-Driven Microservices

A simple example of building microservices with NestJS using event-based messaging.

Overview

This project contains two separate NestJS applications:

Client — handles HTTP requests.

MicroService — handles microservice communication and event-based messaging.

Project Structure
NestWithMicroservices/
├── Client/
│   ├── src/
│   └── package.json
│
├── MicroService/
│   ├── src/
│   └── package.json
│
└── README.md

How It Works

The Client application receives an HTTP request and communicates with the MicroService application.

Client
  |
  | HTTP Request
  v
MicroService
  |
  | Event / Message
  v
Event Handler


In simple terms:

A request is sent to the Client.

The Client communicates with the MicroService.

The MicroService processes the request.

Events/messages are used for communication between the services.

Client

The Client application exposes HTTP endpoints and communicates with the MicroService.

The Client runs on:

http://localhost:3001

Available Endpoints
POST /create
GET  /item/:id

MicroService

The MicroService application contains the microservice-side logic.

It demonstrates communication using NestJS microservices and event-based messaging.

The Client and MicroService are separate applications and can be started independently.

Getting Started
1. Clone the Repository
git clone https://github.com/tahirakhter/NestWithMicroservices.git
cd NestWithMicroservices

2. Install Client Dependencies
cd Client
npm install

3. Start the Client
npm run start


The Client will run on:

http://localhost:3001

4. Install MicroService Dependencies

Open a new terminal:

cd MicroService
npm install

5. Start the MicroService
npm run start:local

API Examples
Create Item
POST http://localhost:3001/create

Get Item
GET http://localhost:3001/item/1

Technologies

Node.js

TypeScript

NestJS

NestJS Microservices

Event-based messaging

HTTP

What This Project Demonstrates

This project demonstrates the basic concepts of:

NestJS microservices

Communication between independent services

Event-based messaging

Client-to-microservice communication

Asynchronous communication

Basic microservice architecture

Event-Based Communication

Traditional service communication can look like:

Service A
    |
    | Request
    v
Service B


With event-based communication:

Service A
    |
    | Publish Event
    v
Event / Message
    |
    +----------> Service B
    |
    +----------> Service C


This allows services to communicate through events instead of being tightly coupled to each other.

Learning Goals

After working with this project, you should understand:

How NestJS microservices are structured.

How a client communicates with a microservice.

How event-based messaging works.

The difference between request/response and event-based communication.

How to run multiple NestJS applications locally.

Status

This is a learning/demo project for understanding NestJS microservices and event-based communication.
