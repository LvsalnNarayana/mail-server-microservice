# Mail Server Microservice

This microservice provides functionality to send emails, manage subscriptions, and handle email verification.

## Table of Contents

- [Installation](#installation)
- [Configuration](#configuration)
- [Customization](#customization)
- [API Endpoints](#api-endpoints)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/mail-server-microservice.git
   
2. Navigate to the project directory:

   ```bash
   cd mail-server-microservice
   
3. Install dependencies:

   ```bash
   npm install
   
   
## Configuration

1. Create a .env file in the project root and add the following environment variables:
   ```bash
   SENDGRID_API_KEY=your-sendgrid-api-key
   SENDER_MAIL_ID=your-sender-email@example.com
   MONGODB_URL=your-mongodb-connection-url
   PORT=3000
2. Update other configurations in the source code as needed.

## API Endpoints

**POST /api/send-email** : Send an email to a recipient.</br>
**POST /api/subscribe** : Subscribe an email for updates.</br>
**POST /api/unsubscribe** : Unsubscribe an email.</br>
**POST /api/verify-code** : Verify an email verification code.</br>
**POST /api/send-verification-code** : Send a verification code to an email.</br>

## Usage

1. Start the server:

   ```bash
   npm start

2. Make API requests to the specified endpoints using tools like curl or Postman.

3. Refer to the API Endpoints section for detailed information about each endpoint.

## Contributing
Contributions are welcome! Here's how you can contribute to this project:

1. Fork the repository.
2. Create a new branch: git checkout -b feature/your-feature-name.
3. Make your changes and commit them: git commit -m "Add new feature".
4. Push to the branch: git push origin feature/your-feature-name.
5. Create a pull request describing your changes.
   
## License
This project is licensed under the MIT License.

