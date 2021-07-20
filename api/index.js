const express = require("express");
const db = require("./config/db");
const cors = require("cors");
const moment = require('moment');
const app = express();

app.use(cors());
app.use(express.json());
const PORT = 5000;



app.get("/", (req, res) => {
    res.send("hjakdha");
});

app.post("/post", (req, res) => {

    const username = req.body.userName;
    const title = req.body.title;
    const topic = req.body.topic;
    const content = req.body.content;
    const location = req.body.location;
    const startDate = moment(req.body.startDate).format("YYYY-MM-DD HH:mm:ss");
    const datePosted = req.body.datePosted;


    db.query("INSERT INTO post (title, post_text, user_name, date_posted, topic, location, campaign_time) VALUES(?,?,?,?,?,?,?)", [title, content, username, datePosted, topic, location, startDate],
        (err, result) => {
            if (err) {
                console.log(err);
            }
            console.log(result);
        })


})

app.post("/register", (req, res) => {
    const signupName = req.body.signupName;
    const email = req.body.email;
    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword;

    db.query("INSERT INTO cam_registration (user_name, email, password) VALUES(?,?,?)", [signupName, email, password],
        (err, result) => {
            if (err) {
                console.log(err);
            }
            console.log(result);
        })
})

app.post("/login", (req, res) => {
    const loginName = req.body.loginName;
    const loginPassword = req.body.loginPassword;

    db.query("SELECT * FROM cam_registration WHERE loginName = ? AND loginPassword = ?", [loginName, loginPassword],
        (err, result) => {
            if (err) {
                res.send({ err: err });
            }
            if (result.length > 0) {
                res.send(result);
            } else {
                res.send({ message: "Username and Password don't match!" })
            }
        })
})

app.listen(PORT, () => {
    console.log(`Backend is running on port ${PORT}.`);
});