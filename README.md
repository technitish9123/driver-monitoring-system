# Driver Monitoring System

The Driver Monitoring System (DMS) is a comprehensive solution designed to monitor driver behavior in a fleet of delivery vehicles. This system aims to identify and address unsafe driving practices in real-time, thereby improving driver safety and reducing the risk of accidents.

## Table of Contents

- [Project Overview](#project-overview)
- [System Design](#system-design)
- [Folder Structure](#folder-structure)
- [Key Algorithm: Rule Engine](#key-algorithm-rule-engine)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Configuration](#configuration)
- [Usage](#usage)
  - [POST /event Endpoint](#post-event-endpoint)
  - [GET /alert/{alert_id} Endpoint](#get-alertalert_id-endpoint)
- [Sample Input](#sample-input)
- [Testing with Postman](#testing-with-postman)
- [Contributing](#contributing)
- [License](#license)

## Project Overview

The Driver Monitoring System is a critical component for any organization that manages a fleet of vehicles. It provides real-time insights into driver behavior, allowing fleet managers to take proactive measures to ensure driver safety. This system uses a combination of IoT devices, machine learning models, and a rule engine to detect and respond to unsafe driving events.

## System Design

The system architecture consists of the following components:

- **API Server**: The API server is built using Node.js and Express.js. It receives driving event data from IoT devices via POST requests and provides alert information through GET requests.

- **MongoDB Database**: MongoDB is used to store driving events, alerts, and configuration data. It allows for efficient data retrieval and storage.

- **Rule Engine**: The Rule Engine processes driving events to generate alerts based on predefined rules. It considers factors such as the location type and the number of unsafe events within a 5-minute window.

## Folder Structure

The project follows a modular folder structure for better organization:

```plaintext
driver-monitoring-system/
|-- src/
|   |-- controllers/
|   |   |-- EventController.ts
|   |   |-- AlertController.ts
|   |-- models/
|   |   |-- Event.ts
|   |   |-- Alert.ts
|   |-- services/
|   |   |-- RuleEngineService.ts
|   |-- routes/
|   |   |-- eventRoutes.ts
|   |   |-- alertRoutes.ts
|   |-- database.ts
|   |-- app.ts
|-- config/
|   |-- config.ts
|-- index.ts
|-- package.json
|-- tsconfig.json
|-- README.md
|-- .env
```

- **controllers**: Contains the controllers for handling events and alerts.
- **models**: Defines the data models for events and alerts.
- **services**: Houses the Rule Engine service for alert generation.
- **routes**: Defines the API routes for events and alerts.
- **config**: Stores configuration files.
- **index.ts**: Entry point of the application.

## Key Algorithm: Rule Engine

The Rule Engine plays a crucial role in generating alerts based on predefined rules. It considers the following factors:

1. The system checks for unsafe driving events within the past 5 minutes.

2. It applies location-specific rules to identify and prioritize alerts based on location types, such as highways, city centers, commercial areas, and residential zones.

3. Alerts are generated when predefined thresholds for unsafe driving events are exceeded. Alerts provide details about the event, location, and severity.

4. Historical data is stored, allowing for trend analysis and reporting.

## Getting Started

Follow these steps to set up and run the Driver Monitoring System locally for development or testing purposes.

### Prerequisites

Before you begin, ensure you have the following prerequisites installed:

- Node.js
- MongoDB

### Installation

1. Clone the repository to your local machine:

   ```bash
   git clone https://github.com/technitish9123/driver-monitoring-system.git
   ```

2. Navigate to the project directory:

   ```bash
   cd driver-monitoring-system
   ```

3. Install project dependencies:

   ```bash
   npm install
   ```

### Configuration

1. Create a `.env` file in the project root directory and define the following environment variables:

   ```
   PORT=3000
   MONGODB_URI="mongodb+srv://nidorino092:abcd1234@cluster0.mkuo1ku.mongodb.net/?retryWrites=true&w=majority"
   ```

   Replace `your_mongodb_uri_here` with the MongoDB connection URI for your database.

## Usage

The Driver Monitoring System offers a set of RESTful endpoints to interact with the system. Below are the main endpoints and their functionality.

### POST /event Endpoint

- **Description**: Create a new driving event.
- **Request**: Send a POST request to `http://localhost:3000/event` with a JSON payload representing a driving event.
- **Response**: Depending on the outcome, you will receive one of the following responses:
  - "Alert created" with an alert ID if an alert is generated.
  - "Data stored" if the event is stored without generating an alert.

### GET /alert/{alert_id} Endpoint

- **Description**: Retrieve details of an alert by its ID.
- **Request**: Send a GET request to `http://localhost:3000/alert/{alert_id}`, where `{alert_id}` is the ID of the alert you want to retrieve.
- **Response**: Receive the alert details if the alert with the specified ID exists.

## Sample Input

Here's an example of a driving event JSON payload:

```json
{
  "timestamp": "2023-09-27T13:36:42.603Z",
  "isDrivingSafe": "false",
  "vehicleId": 965,
  "locationType": "highway"
}
```

## Testing with Postman

You can test the Driver Monitoring System using Postman. [![Run in Postman](https://run.pstmn.io/button.svg)](https://www.postman.com/payload-pilot-41773608/workspace/enview-demo/collection/22391093-bc397cbc-fb02-435b-9580-f21d21543036?action=share&creator=22391093) with sample requests for both POST and GET endpoints.
