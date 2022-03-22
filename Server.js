const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const path = require("path");

const app = express();
app.use(express.json());
app.use(cors());
app.use(cookieParser());

__dirname = path.resolve();
if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "/front-end/build")));

    app.get("*", (req, res) => {
        res.sendFile(
            path.resolve(__dirname, "front-end", "build", "index.html"),
        );
    });
}
// ----------------
//     Routes
// ----------------

app.use("/api", require("./routes/authRouter"));
app.use("/api", require("./routes/serviceRouter"));
app.use("/api", require("./routes/subServiceRouter"));
app.use("/api", require("./routes/orderRouter"));
app.use("/api", require("./routes/updateProfileRouter"));
app.use("/api", require("./routes/employeeRoute"));

const URL = process.env.MONGODB_URL;
mongoose.connect(
    URL,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    },
    (err) => {
        if (err) throw err;
        console.log("Connected To MongoDB");
    },
);

app.listen(process.env.PORT || 5000, () => {
    console.log(`server is running on port`, port);
});
