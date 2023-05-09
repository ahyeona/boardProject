const express = require("express");
const app = express();

const path = require("path");
const userRoute = require("./routes/users");
const boardRoute = require("./routes/boards");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.urlencoded({extended:false}));
app.use("/users", express.static(path.join(__dirname, "public", "users")));

app.use("/users", userRoute);
app.use("/boards", boardRoute);

app.get("/", (req, res) => {
    res.redirect("/users/login");
});


const PORT = 8080;
app.listen(PORT, () => {
    console.log("서버 열림");
});
