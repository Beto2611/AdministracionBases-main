const express = require('express');
const session = require('express-session');
const dotenv =  require ('dotenv')
const cookieParse = require("cookie-parser")
const router = require('./routes/routes.js')
const app = express();


app.set('port',3030);   
app.set('view engine', 'ejs')
app.use(express.json());
app.use(express.static('public'))
app.use(express.urlencoded({extended:false}))

dotenv.config({path: './env/.env'})
app.use(session({
    secret: 'secret',
    resave:true,
    saveUninitialized:true
}))

app.use(router);
app.listen(app.get('port'),()=>{
   
})
