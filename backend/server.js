const express = require("express");
const dotenv = require("dotenv");
const { resolve } = require("path");
const { errorHandler } = require("./middleware/errorMiddleware");
const userRoutes = require("./routes/userRoutes.js");
const recipeRoutes = require("./routes/recipeRoutes.js");
const commentRoutes = require("./routes/commentRoutes.js");
const session = require("express-session");
const pgSession = require("connect-pg-simple")(session);
const pool = require("./config/db");
const asyncHandler = require("express-async-handler");
const path = require("path");
dotenv.config({
  path: resolve(__dirname, "../.env"),
});

const app = express();

// Middleware

app.use(express.json());
app.use(
  session({
    cookie: {
      maxAge: parseInt(process.env.SESSION_LIFETIME),
      sameSite: true,
      secure: process.env.NODE_ENV == "production",
    },
    name: "sid",
    resave: false,
    saveUninitialized: false,
    secret: process.env.SESSION_SECRET,
    store: new pgSession({
      pool: pool,
    }),
  })
);

// Routes

app.get(
  "/",
  asyncHandler(async (req, res) => {
    console.log(req.session);
    const { userId } = req.session;
    if (userId) {
      const { rows, fields } = await pool.query(
        'SELECT full_name FROM "user" WHERE userId = $1;',
        [userId]
      );
      console.log(rows);
      res.send(`Hello ${rows[0].full_name}`);
    } else {
      res.send("Hello World!");
    }
  })
);

app.use("/api/users", userRoutes);
app.use("/api/recipes", recipeRoutes);
app.use("/api/comments", commentRoutes);

// Static files
app.use("/uploads", express.static("uploads"));

// Error Middleware
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
