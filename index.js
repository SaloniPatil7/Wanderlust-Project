if (process.env.NODE_ENV != "production") {
    require('dotenv').config()
    // console.log(process.env.SECRET)
}
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const CustomError = require("./utils/CustomError.js");
const listingRouter = require("./routes/listing.js");//restructuring
const reviewRouter = require("./routes/review.js");
const userRouter = require("./routes/user.js");
const session = require('express-session');
const MongoStore = require('connect-mongo');
const flash = require("connect-flash");
const passport = require("passport");//passportt
const LocalStrategy = require("passport-local");
const User = require("./models/user.js")


app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const ejsMate = require('ejs-mate');
app.engine('ejs', ejsMate);

app.use(express.static("public"));
app.use(express.static(path.join(__dirname, "/public")));

const methodOverride = require("method-override")
app.use(methodOverride("_method"));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));



const atlasDB = process.env.atlasDB;
main().then(() => {
    console.log("connect to db");
})
    .catch((err) => {
        console.log(err);
    });

async function main() {
    await mongoose.connect(atlasDB);
}




app.listen(8080, () => {
    console.log("server started")
});


//connect-mongo
const store = MongoStore.create({
    mongoUrl: atlasDB,
    crypto: {
        secret:  process.env.SECRET,
    },
    touchAfter: 24 * 3600,
});

//session
app.use(session({
    store,
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        expires: Date.now + 7 * 24 * 60 * 60 * 1000,//1 week
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true, //security purpose
    }
}));

app.use(flash());


//user passport
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//middleware
app.use((req, res, next) => {
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.currUser = req.user;
    next();
});
//user route
app.get("/demouser", async (req, res) => {
    let fakeUser = new User({
        email: "fake@gmail.com",
        username: "fake"
    });
    let registeredUser = await User.register(fakeUser, "helloWorld");
    res.send(registeredUser);
});



//listing routes
app.use("/listings", listingRouter);


//review routes
app.use("/listings/:id/reviews", reviewRouter);

//user routes
app.use("/", userRouter);


//middleware 
// app.use((err,req,res,next)=>{
//     res.send("something wenttttttttttttttttttttt Wrong!")
//     next(err);
// });

//CustomError
app.get("*", (req, res, next) => {
    next(new CustomError(404, "Page Not Found"));
})
app.use((err, req, res, next) => {
    let { statusCode = 500, message = "something went wrong" } = err
    res.status(statusCode).render("error.ejs", { err })
    // res.status(statusCode).send(message);
});

