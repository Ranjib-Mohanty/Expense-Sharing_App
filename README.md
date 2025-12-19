# Expense Sharing Application 💸

A **full‑stack Expense Sharing Application** that helps users manage group expenses, calculate balances, and track who owes whom — similar to Splitwise.

This project is built using **Node.js, Express, MongoDB** for the backend and **React** for the frontend.

---

## 🚀 Features

* 👤 User management (create users)
* 👥 Group creation and management
* 💰 Add and track expenses in groups
* ⚖️ Automatic balance calculation
* 🔄 RESTful APIs for all operations
* 🧪 API testing using Postman
* 🌐 React-based frontend (basic UI)

---

## 🛠️ Tech Stack

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose

### Frontend

* React.js
* Axios
* HTML / CSS

### Tools

* Postman (API testing)
* Git & GitHub

---

## 📂 Project Structure

```
Expense-Sharing-Application/
│
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   └── app.js
│   ├── package.json
│   └── server.js
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   └── App.js
│   └── package.json
│
└── README.md
```

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/your-username/expense-sharing-application.git
cd expense-sharing-application
```

---

### 2️⃣ Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in `backend/` and add:

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
```

Run the backend server:

```bash
npm start
```

Server will run at:

```
http://localhost:5000
```

---

### 3️⃣ Frontend Setup

```bash
cd frontend
npm install
npm start
```

Frontend will run at:

```
http://localhost:3000
```

---

## 🔗 API Endpoints (Sample)

### Users

* `POST /api/users` – Create user
* `GET /api/users` – Get all users

### Groups

* `POST /api/groups` – Create group
* `GET /api/groups/:id` – Get group details

### Expenses

* `POST /api/expenses` – Add expense
* `GET /api/expenses/group/:groupId` – Get group expenses

### Balances

* `GET /api/balances/group/:groupId` – Get balances

---

## 🧪 Testing APIs with Postman

1. Open Postman
2. Use URL:

   ```
   http://localhost:5000/api/...
   ```
3. Select HTTP method (GET, POST, DELETE)
4. Add JSON body if required
5. Send request

---

## 📌 Future Improvements

* Authentication (JWT)
* Expense split types (equal, percentage, custom)
* Expense settlement feature
* Improved UI/UX
* Deployment (Render / Vercel)

---

## 🤝 Contributing

Contributions are welcome!

1. Fork the repository
2. Create a new branch
3. Commit changes
4. Open a Pull Request

---

## 📄 License

This project is licensed under the **MIT License**.

---

## 👨‍💻 Author

**Your Name**

GitHub: [https://github.com/your-username](https://github.com/your-username)

---

⭐ If you like this project, give it a star on GitHub!
