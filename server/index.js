const express = require("express");
const cors = require("cors");
const upload = require("express-fileupload");

const { userRouter } = require("./routers/userRouter");
const { postRouter } = require("./routers/postRouter");
const { dbConncet } = require("./config/dbConfig");

require("dotenv").config();

const app = express();

// List of allowed origins
const allowedOrigins = [
  "http://localhost:3000",
  "https://my-blog-0p8p.onrender.com", // <-- replace with your live domain
];

// CORS middleware setup to allow multiple origins
app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like Postman, curl)
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true, // If you want to allow cookies/auth headers
  })
);
app.use(upload());
app.use(express.json());
app.use("/uploads", express.static(__dirname + "/uploads")); // static folder for avatars
app.use("/api/posts", postRouter);
app.use("/api/users", userRouter);
const port = process.env.PORT || 5000;
app.listen(port, () => {
  dbConncet();
  console.log(`Server is listening at port: ${port}`);
});
