const express = require("express");
const mongoose = require("mongoose");
const cookie = require("cookie");
const jwt = require("jsonwebtoken");
const path = require("path");
const app = express();
const jose = require('jose')
//Schema
const User = require('./Schema/User');
const Empl = require('./Schema/Employee')

//-------- image upload
const multer = require("multer");
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./public/images");
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "_" + file.originalname);
    },
});
const upload = multer({ storage: storage });

//header origin
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
    res.setHeader("Access-Control-Request-Headers", "Set-Headers");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Content-Type, Access-Control-Allow-Headers,myheader,X-RapidAPI-Key, Authorization, X-Requested-With,Set-Headers"
    );
    next();
});

// idk
app.use(express.static(path.join(__dirname, "..", "public")));
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: false, parameterLimit: 50000 }));

//mongoose
mongoose.set("strictQuery", true);
mongoose.connect("mongodb://0.0.0.0:27017/mynewappdb", {
    useNewUrlParser: true,
    //useCreateIndex: true,
    // useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

// HOME ----------------------------------------------------------
app.get('/hello', (req, res) => {
    res.sendStatus(200);
    console.log('welcome');
})



const checkUsername = (req, res, next) => {
    User.findOne({ username: req.body.username }).then(post => {
        if (post === null) {
            next();
        }
        else {
            console.log('user already exist');
            res.sendStatus(401)
        }
    }).catch(error => {
        console.log(error);
        res.sendStatus(401)
    })
};
const checkEmail = (req, res, next) => {
    User.findOne({ email: req.body.email }).then(post => {
        if (post === null) {
            next();
        }
        else {
            console.log('email already exist');
            res.sendStatus(401)
        }
    }).catch(error => {
        console.log(error);
        res.sendStatus(401)
    })
};

app.post("/register", checkUsername, checkEmail, (req, res) => {
    try {
        User.insertMany({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
        })
        res.sendStatus(200)
    } catch (error) {
        console.log(error);
        res.sendStatus(401)
    }
});

const checkUsername2 = (req, res, next) => {
    User.findOne({ username: req.body.username }).then(post => {
        if (post !== null) {
            next();
        }
        else {
            console.log('username wrong');
            res.sendStatus(401)
        }
    }).catch(error => {
        console.log(error);
        res.sendStatus(401)
    })
};
const checkPassword2 = (req, res, next) => {
    User.findOne({ password: req.body.password }).then(post => {
        if (post !== null) {
            next();
        }
        else {
            console.log('password wrong');
            res.sendStatus(401)
        }
    }).catch(error => {
        console.log(error);
        res.sendStatus(401)
    })
};

app.post("/login", checkPassword2, checkUsername2, async (req, res) => {
    res.sendStatus(200);
});

const isAuthenticated = async () => {
    try {
        const secret = new TextEncoder().encode('cc7e0d44fd473002f1c42167459001140ec6389b7353f8088f4d9a95f2f596f2')
        const jwt = req.headers.myheader
        const { payload } = await jose.jwtVerify(jwt, secret);
        res.sendStatus(200)
    } catch (err) {
        console.log(err);
        res.sendStatus(401)
    }
}

app.get("/dashbord", isAuthenticated, (req, res) => {
    console.log("In Login Post");
    res.sendStatus(200);
});

//============================= Employee ================================
app.post("/dashboard/employee/addemployee/registeruser", upload.single("file"), (req, res) => {
    Empl.findOne({ username: req.body.username, email: req.body.email }).then(result => {
        if (result !== null) {
            res.sendStatus(401)
            console.log("Username or Email already exist");
        } else {
            User.findOne({ username: req.body.createdBy }).then(result => {
                try {
                    const createdBy = result._id;
                    Empl.insertMany({
                        contact: req.body.contact,
                        email: req.body.email,
                        username: req.body.username,
                        address: req.body.address,
                        education: req.body.education,
                        image: req.body.file,
                        createdby: createdBy,
                    });
                    res.sendStatus(200);
                } catch (error) {
                    res.sendStatus(401);
                    console.log(error);
                }
            })
        }
    })
})

app.get('/dashboard/viewemployee/showuser', (req, res) => {
    Empl.aggregate([
        {
            $lookup: {
                from: "users",
                localField: "createdby",
                foreignField: "_id",
                as: "result",
            },
        },
    ])
        .then((result) => {
            res.send(result);
            console.log(result);
        })
        .catch((err) => {
            console.log(err);
        });
})

app.post('/dashboard/employee/addemployee/edituser', (req, res) => {
    // Empl.findByIdAndUpdate(
    //     { _id: req.body.id },
    //     {
    //         contact: req.body.contact,
    //         email: req.body.email,
    //         username: req.body.username,
    //         education: req.body.education,
    //         address: req.body.address,
    //         file: req.body.file,
    //     },
    //     (err, succ) => {
    //         if (err) {
    //             res.sendStatus(401);
    //             console.log(err);
    //         } else {
    //             res.sendStatus(200);
    //         }
    //     }
    // );
    Empl.findByIdAndUpdate({ _id: req.body.id },
        {
            contact: req.body.contact,
            email: req.body.email,
            username: req.body.username,
            education: req.body.education,
            address: req.body.address,
            file: req.body.file,
        }).then(result => {
            res.sendStatus(200)
        }).catch(err => {
            res.sendStatus(401);
            console.log(err);
        })
})

const port = 5000;
app.listen(port, () => {
    console.log(`Listening to Port ${port}`);
});
