# File Craft

## Description
File Craft is a MERN (MongoDB, Express.js, React.js, Node.js) stack application designed to manage and manipulate various types of files, including images, text files, and documents. The app provides functionalities such as file format conversion, image filters and email file sharing.

## Features
1. Image File Conversion:
Convert image files from one format to another.

2. Image filters.

3. Document Conversion:
Convert document files (e.g., .doc) to PDF and vice versa.

4. Email File Sharing:
Send files via email directly from the application.

5. User Authentication:
Secure user authentication system with login and sign-up.

## Technologies Used
- Frontend:
React.js

- Backend:
Node.js & Express.js

- Database:
MongoDB


## Installation

1. Clone the repository:
```
git clone [repository-url]
cd [project-folder]
```

2. Install dependencies:
```
npm i
```

3. Build the React app's production code:
```
npm run build
```

4. Configure environment variables:

Create a .env file in the server folder and add the following:
``` .env
MONGO_URI=mongodb+srv://[username:password@]host[/[defaultauthdb][?options]]
SECRET=[mysecret]
```
You can learn more on how to setup the connection strings of your database in the following link:
https://www.mongodb.com/docs/manual/reference/connection-string/

5. Run the app:
In order to run the front-end and server, we need to use two different terminals.
- Server:
```
nodemon server
```
- Front-End:
```
npm start
```