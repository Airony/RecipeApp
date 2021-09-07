import "./config/setup.ts";
import {
  NODE_ENV,
  PORT,
  SESSION_LIFETIME,
  SESSION_SECRET,
} from "./config/server.config";
import express, { Request, Response } from "express";
import errorHandler from "./middleware/errorMiddleware";
import userRoutes from "./routes/userRoutes";
import recipeRoutes from "./routes/recipeRoutes";
import commentRoutes from "./routes/commentRoutes";
import session from "express-session";
import pgSimpleSession from "connect-pg-simple";
import pool from "./config/db";

const app = express();

// Middleware
app.use(express.json());

const pgSession = pgSimpleSession(session);
app.use(
  session({
    cookie: {
      maxAge: parseInt(SESSION_LIFETIME),
      sameSite: true,
      secure: NODE_ENV == "production",
    },
    name: "sid",
    resave: false,
    saveUninitialized: false,
    secret: SESSION_SECRET,
    store: new pgSession({
      pool: pool,
    }),
  })
);

// Routes

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

app.use("/api/users", userRoutes);
app.use("/api/recipes", recipeRoutes);
app.use("/api/comments", commentRoutes);

// Static files
app.use("/uploads", express.static("../uploads"));

// Error Middleware
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
