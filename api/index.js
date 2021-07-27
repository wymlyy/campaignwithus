const express = require("express");
const db = require("./models");
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(cors({ origin: true, credentials: true }));

const postRouter = require("./routes/Posts");
app.use("/posts", postRouter);
const commentsRouter = require("./routes/Comments");
app.use("/comments", commentsRouter);
const usersRouter = require("./routes/Users");
app.use("/auth", usersRouter);
const signatureRouter = require("./routes/Signatures");
app.use("/signatures", signatureRouter);

const PORT = 5000;

db.sequelize.sync().then(() => {
    app.listen(PORT, () => {
        console.log(`Backend is running on port ${PORT}.`);
    });
});
