# VR Security Backend Assignment

Hey there!

I’m Priyanshu Chaurasiya, and this repository contains the backend code for my project made as a response to an assignment by **VR Security** for the position of **Backend Intern**. This project is built using **Express.js**, **MongoDB**, and other related technologies, and I’m here to walk you through the steps of setting it up and using it. Let’s dive in!

---

## 🚀 Getting Started

Follow these steps to get the server up and running on your local system:

### 1. Clone the Project
First, clone the repository to your local machine:

```bash
git clone https://github.com/iamsainty/vr-security-backend-assignment.git
```

### 2. Navigate to the Project Folder
Move into the project directory:

```bash
cd VR-Backend-Assignment/
```

### 3. Install Dependencies
Now, install all the required dependencies:

```bash
npm i express mongoose dotenv jsonwebtoken bcryptjs nodemon
```

### 4. Set Up Your Environment
Create a `.env` file in the root directory of the project. Inside it, add a **secret key** like this:

```env
SECRET_KEY='your-secret-key'
```

> **Note**: Replace `'your-secret-key'` with a strong secret key of your choice.

### 5. Set Up the Database
Make sure you have **MongoDB** running on your system, or you can connect to a **MongoDB Atlas** account if you're using the cloud version.

### 6. Start the Server
Finally, run the server using **Nodemon**:

```bash
nodemon index.js
```

You should see this message in the console:

```
Server is running on port 3000
Connection successful
```

This means the server is up and ready to go! 🎉

---

## Testing the API Endpoints

Now that the server is running, let’s talk about how to test the API endpoints.

### Authentication: Register and Login

You can register and login users of various roles (admin, moderator, or user) using the following endpoints:

#### 1. Register

- **Endpoint**: `/auth/register`
- **Method**: POST
- **Request Body**:

```json
{
  "name": "Your Name",
  "email": "your-email@example.com",
  "password": "your-password",
  "role": "admin"  // role can be 'admin', 'moderator', or 'user'
}
```

> **Note**: All fields are required, and the **role** must be one of `admin`, `moderator`, or `user`.

#### 2. Login

- **Endpoint**: `/auth/login`
- **Method**: POST
- **Request Body**:

```json
{
  "email": "your-email@example.com",
  "password": "your-password"
}
```

> **Note**: Both **email** and **password** are required.

These endpoints have basic validation to ensure:
- No empty fields.
- The role is valid.
- The email is already registered (for login) or does not exist (for registration).

Once you successfully register or login, you will receive a **JWT token**. This token contains user information, including their role.

---

### 3. Get User Details Based on Role

Once you have the token from login or registration, you can use it to fetch user details based on their role. Make sure to include the token in the **Authorization header** as `Bearer <token>`.

#### Fetch Admin Details

- **Endpoint**: `/get-details/admin-details`
- **Method**: GET
- **Request header**: token : `<your-token>`

If the token verifies the role as **admin**, you’ll get the admin’s data in the response. If not, you’ll get an error message.

#### Fetch Moderator Details

- **Endpoint**: `/get-details/moderator-details`
- **Method**: GET
- **Request header**: token : `<your-token>`

This works the same as the **admin** endpoint, but checks for the **moderator** role.

#### Fetch User Details

- **Endpoint**: `/get-details/user-details`
- **Method**: GET
- **Request header**: token : `<your-token>`

This will return the user’s data if the role is **user**.

---

### Testing the API

I used the **Thunder Client** extension in VS Code to test the API endpoints. You can do the same, or use **Postman** or **cURL** if that’s more your style.

I’ve also included detailed comments in the code to help you understand what each part does. If you get stuck or have any questions, feel free to reach out!

---

## Contact Information

If you encounter any issues or need further clarification, don’t hesitate to contact me at:

- Email: [ppriyanshuchaurasia@gmail.com](mailto:ppriyanshuchaurasia@gmail.com)
- Portfolio: [hey-sainty.web.app](https://hey-sainty.web.app)

---

### Thank You

Thank you for checking out my project! I hope this guide helps you get up and running without any issues. Enjoy working with the API, and feel free to reach out if you need any assistance. 🙌