const express = require("express")
const path = require('path');
require("dotenv").config()
const methodOverride = require('method-override')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const flash = require('express-flash')
const database = require("./config/database")

const cronJobs = require('./helper/cronJobs'); 
const adminRoute = require("./routes/admin/index.route")

database.connect()

const systemConfig = require("./config/system")

const app = express()
const port = process.env.PORT

//Đặt thời gian đăng bài 
cronJobs()

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

app.set("views", `${__dirname}/views`)
app.set("view engine", "pug")

//Flash
app.use(cookieParser('ASFKLJAFKJKLA'));
app.use(session({ cookie: { maxAge: 60000 } }));
app.use(flash());
//End Flash

//method-override chuyển Post => Patch
app.use(methodOverride('_method'));

//Tiny MCE
app.use('/tinymce', express.static(path.join(__dirname, 'node_modules', 'tinymce')));
//End Tiny MCE

app.use(express.static(`${__dirname}/public`));

//App locals vartial
app.locals.prefixAdmin = systemConfig.prefixAdmin;

//Route
adminRoute(app)

app.listen(port, ()=> {
    console.log(`App listening on port ${port}`)
})