module.exports = app => {
    const users = require("../controllers/user.controller.js");
    var router = require("express").Router();

    router.post('/signin', users.signin);
    router.post('/signup', users.signup);

    app.use('/user', router);
  };