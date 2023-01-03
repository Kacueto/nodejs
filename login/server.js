const express = require('express');
const passport = require('passport');
const cookieparser = require('cookie-parser')
const session = require('express-session')
const passportlocal = require('passport-local').Strategy

const app = express();
app.use(express.urlencoded({ extended: true }))
app.use(cookieparser("mi ultra hiper secreto"))
app.use(session({
    secret: "mi ultra hiper secreto",
    resave: true,
    saveUninitialized: true
}))
app.use(passport.initialize())
app.use(passport.session())
passport.use(new passportlocal(function (username, password, done) {
    if (username == "kacueto" && password == "kac147258")
        return done(null, { id: 1, name: "cody" })
    done(null, false)
}))
//{id:1, name: "cody"}
// 1 => serializacion
passport.serializeUser(function (user, done){
    done(null, user.id)
})
// deserializacion 
passport.deserializeUser(function (id, done) {
    done(null, { id: 1, name: "cody" })
})

app.set('view engine', 'ejs')
app.get("/", (req, res) => {
    // si ya iniciamos mostramos bienvenido

    // si no redireccionamos a /login
    res.send("hola")
})
app.get("/login", (req, res) => {
    //mostrar login
    res.render("login")
})
app.post("/login",passport.authenticate('local',{
    succesRedirect: "/",
    failureRedirect: "/login"
    
}))

app.listen(8080, () => console.log("server started"))