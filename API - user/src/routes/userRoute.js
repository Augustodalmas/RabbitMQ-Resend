const user_register = require('../controller/userController')

module.exports = function (app) {
    app.post('/register', user_register.register)
}