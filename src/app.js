const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const bodyParser = require('body-parser');
const handlebars = require('express-handlebars');
const MongoStore = require('connect-mongo');
const sessionsRouter = require('./routes/sessions');
const viewsRouter = require('./routes/views');
const loginRouter = require('./routes/login');
const User = require('./models/user');
const passport = require("passport")
const initializePassport = require("./config/passport.config")

const app = express();


mongoose.connect( "mongodb+srv://alessiachiavon:aleC93272940@cluster0.q6ja3n2.mongodb.net/?retryWrites=true&w=majority",
{
    useNewUrlParser: true,
    useUnifiedTopology: true,
});


app.use(express.urlencoded({ extended: true }));

app.use(session({
    store: MongoStore.create({
        mongoUrl: 'mongodb+srv://alessiachiavon:aleC93272940@cluster0.q6ja3n2.mongodb.net/?retryWrites=true&w=majority',
        mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true },
        ttl: 600,
    }),
    secret: 'coderhouse',
    resave: false,
    saveUninitialized: true,
}));

app.use(passport.initialize())
app.use(passport.session())

app.engine("handlebars", handlebars.engine())
app.set("views", __dirname + '/views')
app.set("view engine", "handlebars")


app.use('/', sessionsRouter);
app.use('/', viewsRouter);
app.use('/', loginRouter);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get("/failuregister", async (req, res) => {
    console.log("Falla en autenticacion")
    res.send({ error: "Falla" })
})


app.listen(8080, () => {
    console.log('Servidor en ejecución en el puerto 8080');
});