import connectDB from "./DB/connection.js";
import globalErrorHandler from "./utils/error handling/globalErrorHandler.js";
import notFoundHandler from "./utils/error handling/notFoundHandler.js";
import morgan from "morgan";
import cors from "cors";

// Routers
import authRouter from "./modules/auth/auth.controller.js";
import usersRouter from "./modules/users/users.controller.js";
import heroesRouter from "./modules/heroes/heroes.controller.js";
import questsRouter from "./modules/quests/quests.controller.js";
import recurringQuestsRouter from "./modules/recurringQuests/recurringQuests.controller.js";

const bootstrap = async (app, express) => {
  // Connect to database
  await connectDB();

  // Basic Middleware
  app.use(cors());
  app.use(express.json());

  // Logger
  app.use(morgan("dev"));

  // Routes
  app.use("/auth", authRouter);
  app.use("/users", usersRouter);
  app.use("/heroes", heroesRouter);
  app.use("/quests", questsRouter);
  app.use("/recurring-quests", recurringQuestsRouter);

  // Fallback
  app.all("*", notFoundHandler);
  app.use(globalErrorHandler);
};

export default bootstrap;
