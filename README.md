# Driver Monitoring System

The Driver Monitoring System (DMS) is a comprehensive solution designed to monitor driver behavior in a fleet of delivery vehicles. This system aims to identify and address unsafe driving practices in real-time, thereby improving driver safety and reducing the risk of accidents.

## Table of Contents

- [Project Overview](#project-overview)
- [Key Features](#key-features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Configuration](#configuration)
- [Usage](#usage)
  - [POST /event Endpoint](#post-event-endpoint)
  - [GET /alert/{alert_id} Endpoint](#get-alertalert_id-endpoint)
- [Rule Engine](#rule-engine)
- [Contributing](#contributing)
- [License](#license)

## Project Overview

The Driver Monitoring System is a critical component for any organization that manages a fleet of vehicles. It provides real-time insights into driver behavior, allowing fleet managers to take proactive measures to ensure driver safety. This system uses a combination of IoT devices, machine learning models, and a rule engine to detect and respond to unsafe driving events.

## Key Features

- **Real-time Event Monitoring**: The system continuously monitors driving events, including speeding, phone usage, and other unsafe behaviors.

- **Rule-Based Alerting**: The rule engine applies location-specific rules to identify and prioritize alerts based on location types, such as highways, city centers, commercial areas, and residential zones.

- **Alert Generation**: Alerts are generated when predefined thresholds for unsafe driving events are exceeded. Alerts provide details about the event, location, and severity.

- **Historical Data Storage**: The system stores historical data about driving events and alerts, allowing for trend analysis and reporting.

- **API Integration**: The system offers RESTful APIs for easy integration with IoT devices and external applications.

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

## Rule Engine

The Driver Monitoring System employs a rule engine to determine when alerts should be generated. The rules are based on the type of location (e.g., highway, city center) and the number of unsafe driving events within the last 5 minutes. Here are the key rules:

- **Highway**: Generate an alert if there are at least 4 unsafe events in the past 5 minutes.

- **City Center**: Generate an alert if there are at least 3 unsafe events in the past 5 minutes.

- **Commercial**: Generate an alert if there are at least 2 unsafe events in the past 5 minutes.

- **Residential**: Generate an alert if there is at least 1 unsafe event in the past 5 minutes.

## Contributing

Contributions to the Driver Monitoring System project are welcome! If you would like to contribute, please follow these guidelines:

- Fork the repository on GitHub.
- Create a new branch for your feature or bug fix.
- Make your changes and ensure all tests pass.
- Submit a pull request with a clear description of your changes.

## License

This project is licensed under the [License Name] - see the [LICENSE.md](LICENSE.md) file for details.

---
