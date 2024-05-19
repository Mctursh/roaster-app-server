require('dotenv').config()
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const session = require("express-session")
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require("mongoose")
const MongoStore = require("connect-mongo")
const flash = require("connect-flash")
const cors = require('cors')


const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const requestsRouter = require('./routes/requests');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
const corsOption = {
  origin:['http://localhost:8080', 'https://roaster-app-server.onrender.com'], 
  credentials:true,
  exposedHeaders: [ 'set-cookie' ]          
}
app.use(cors(corsOption))

const url = `mongodb+srv://admin-ayoade:${process.env.MONGO_PASSWORD}@cluster0.4d1r2.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`
const options = { useNewUrlParser: true, useUnifiedTopology: true }

main()
  .then(() => {
    console.log('succefully connected to DB');
  })
  .catch(err => console.log(err));

async function main() {
  await mongoose.connect(url, options);
  const db = mongoose.connection
  const dbClient = db.getClient()

  app.use(session({
    secret: "mysecretstring",
    store: MongoStore.create({
      client: dbClient
    }),
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 60 * 3 // 3mins
      // maxAge: 60 * 60 * 24 * 7 * 1000 // 1 week
    },
    unset: 'destroy'
  }));
  app.use(flash());


}

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/requests', requestsRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

const port = process.env.PORT || 4000;

app.listen(port, () => console.log(`listening on PORT ${port}`))

module.exports = app;
