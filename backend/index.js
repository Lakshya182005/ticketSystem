require("dotenv").config();
const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");

const app = express();

app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use("/auth", require("./routes/auth.routes"));
app.use("/categories", require("./routes/category.routes"));
app.use("/tickets", require("./routes/ticket.routes"));
app.use("/", require("./routes/comment.routes"));
app.use("/users", require("./routes/user.routes"));

const PORT = process.env.PORT || 5000;

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("db connection failed");
    console.error(err);
    process.exit(1);
  });
