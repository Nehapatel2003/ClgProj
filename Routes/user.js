const express = require("express");
const router = express.Router();

const passport = require("passport");

const wrapAsync =
require("../utils/wrapAsync.js");

const {
    saveRedirectUrl
} = require("../middleware.js");

const userController =
require("../controller/users.js");

/* ==========================
   SIGNUP
========================== */

router.route("/signup")

.get(
    userController.renderSignUpForm
)

.post(
    wrapAsync(
        userController.signUp
    )
);

/* ==========================
   LOGIN
========================== */

router.route("/login")

.get(
    userController.renderLogInForm
)

.post(

    saveRedirectUrl,

    passport.authenticate(
        "local",
        {
            failureRedirect: "/login",
            failureFlash: true
        }
    ),

    userController.logIn
);

/* ==========================
   LOGOUT
========================== */

router.get(
    "/logout",
    userController.logOut
);

module.exports = router;