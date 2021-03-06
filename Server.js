const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const app = express();
app.use(express.json());
app.use(cors());
app.use(cookieParser());

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

const port = 5000;
app.listen(port, () => {
    console.log(`server is running on port`, port);
});
