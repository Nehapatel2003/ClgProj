if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
}

const express = require("express");
const app = express();

const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");

const session = require("express-session");
const MongoStore = require("connect-mongo");
const flash = require("connect-flash");

const passport = require("passport");
const LocalStrategy = require("passport-local");

const ExpressError = require("./utils/ExpressError.js");

const User = require("./models/user.js");

/* ==========================
   ROUTES
========================== */

const listingsRouter =
require("./Routes/listing.js");

const reviewsRouter =
require("./Routes/reviews.js");

const userRouter =
require("./Routes/user.js");

/* ==========================
   DATABASE
========================== */

const dbUrl =
process.env.ATLASDB_URL;

main()
.then(() => {
    console.log("MongoDB Connected");
})
.catch((err) => {
    console.log(err);
});

async function main() {
    await mongoose.connect(dbUrl);
}

/* ==========================
   VIEW ENGINE
========================== */

app.set("view engine", "ejs");

app.set(
    "views",
    path.join(__dirname, "views")
);

app.engine("ejs", ejsMate);

/* ==========================
   MIDDLEWARE
========================== */

app.use(express.urlencoded({
    extended: true
}));

app.use(
    methodOverride("_method")
);

app.use(
    express.static(
        path.join(__dirname, "public")
    )
);

/* ==========================
   SESSION STORE
========================== */

const store =
MongoStore.create({

    mongoUrl: dbUrl,

    touchAfter: 24 * 3600

});

store.on("error", () => {
    console.log(
        "Mongo Session Error"
    );
});

const sessionOptions = {

    store,

    secret:
    process.env.SECRET,

    resave: false,

    saveUninitialized: false,

    cookie: {

        expires:
        new Date(
            Date.now() +
            7 * 24 * 60 * 60 * 1000
        ),

        maxAge:
        7 * 24 * 60 * 60 * 1000,

        httpOnly: true

    }

};

app.use(
    session(sessionOptions)
);

app.use(flash());

/* ==========================
   PASSPORT
========================== */

app.use(
    passport.initialize()
);

app.use(
    passport.session()
);

passport.use(
    new LocalStrategy(
        User.authenticate()
    )
);

passport.serializeUser(
    User.serializeUser()
);

passport.deserializeUser(
    User.deserializeUser()
);

/* ==========================
   GLOBAL VARIABLES
========================== */

app.use((req, res, next) => {

    res.locals.success =
    req.flash("success");

    res.locals.error =
    req.flash("error");

    res.locals.currUser =
    req.user;

    next();

});

/* ==========================
   HOME
========================== */

app.get("/", (req, res) => {

    res.redirect("/listings");

});

/* ==========================
   ROUTES
========================== */

app.use(
    "/listings",
    listingsRouter
);

app.use(
    "/listings/:id/reviews",
    reviewsRouter
);

app.use(
    "/",
    userRouter
);

/* ==========================
   404 ERROR
========================== */

app.all("*", (req, res, next) => {

    next(
        new ExpressError(
            404,
            "Page Not Found"
        )
    );

});

/* ==========================
   ERROR HANDLER
========================== */

app.use(
    (err, req, res, next) => {

        let {
            statusCode = 500,
            message = "Something Went Wrong!"
        } = err;

        res.status(statusCode);

        res.render(
            "listings/error.ejs",
            { message }
        );

    }
);

/* ==========================
   SERVER
========================== */

const PORT =
process.env.PORT || 8080;

app.listen(PORT, () => {

    console.log(
        `Server Running On Port ${PORT}`
    );

});