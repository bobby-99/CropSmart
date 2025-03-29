# CropSmart – Smart Agriculture Web Application

CropSmart is a web-based application designed to empower farmers with smart insights into crop cultivation and fertilizer recommendations. By leveraging real-time data and user inputs, CropSmart provides accurate crop analyses and tailored fertilizer suggestions to help optimize yield and promote sustainable farming practices.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation & Setup](#installation--setup)
- [Usage](#usage)
- [Contributors](#contributors)
- [License](#license)
- [Contact](#contact)

## Overview

CropSmart is built to assist users (primarily farmers) in making informed decisions by analyzing soil nutrient data, weather parameters, and crop information. The application comprises several components:
  
- **Crop Analysis:** Users can input soil and environmental data to receive recommendations on optimal crops.
- **Fertilizer Recommendations:** Based on the soil analysis, the app suggests suitable fertilizers along with application practices.
- **User Authentication:** Secure registration and login functionalities allow personalized usage and data management.
- **Responsive Design:** A user-friendly, responsive interface built with HTML, CSS, and JavaScript ensures accessibility across devices.

## Features

- **Crop Recommendation Tool:**  
  Analyze soil parameters such as nitrogen, phosphorus, potassium, pH, rainfall, temperature, and humidity to get the best crop options.
  
- **Fertilizer Suggestion System:**  
  Receive customized fertilizer suggestions based on soil health and nutrient deficiencies, along with detailed application practices.

- **User Authentication:**  
  Secure login and registration processes using JWT for token-based authentication and a Node.js/Express backend.

- **Interactive UI:**  
  A modern, responsive design that adapts to various devices, ensuring an engaging user experience.

- **Real-Time Analysis:**  
  Immediate feedback on analysis results with dynamic rendering of crop and fertilizer recommendations.

## Tech Stack

- **Frontend:**  
  - HTML, CSS, JavaScript  
  - Responsive design principles and dynamic page interactions

- **Backend:**  
  - Node.js with Express for server-side operations  
  - PostgreSQL for data storage  
  - JWT for secure user authentication  
  - Bcrypt for password hashing

## Installation & Setup

### **1. Clone the Repository**
```sh
git clone https://github.com/bobby-99/CropSmart.git
cd CropSmart
```

### **2. Install Dependencies**
Ensure you have Node.js and npm installed. Then run:
```sh
npm install
```

### **3. Setup Environment Variables (Easier Method)**

Instead of requiring users to manually configure environment variables, we provide an `.env.example` file.  

1. Copy `.env.example` to `.env`:
   ```sh
   cp .env.example .env
   ```
2. Modify `.env` only if necessary.

Alternatively, you can use SQLite for local development by changing the database configuration in the `server.js` file.

### **4. Run the Application**
```sh
npm start
```
Your server will start on `http://localhost:3000`. Open the project in your browser to view the application.

## Usage

- **Crop Analysis:**  
  Navigate to the Crop Analysis page to input soil nutrient and environmental data. The tool will process your inputs and display recommended crops with confidence scores and supporting data visualizations.

- **Fertilizer Recommendations:**  
  Use the Fertilizer Suggestions page to get fertilizer recommendations based on your soil analysis. The system compares input data with a preloaded dataset to provide tailored advice.

- **User Management:**  
  Register for an account or log in using the dedicated authentication pages. This ensures that your analysis history and recommendations are stored and personalized.

## Contributors

Special thanks to our awesome contributors who helped build this project:  
- [Revanthchowdary05](https://github.com/Revanthchowdary05)  
- [Saddalayogesh](https://github.com/Saddalayogesh)  

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contact

For any inquiries or suggestions, please reach out through the repository's issues page or contact us directly via email.

