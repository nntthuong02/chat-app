const authRouter = require('./auth.route')
const groupRouter = require('./group.route')
const messageRouter = require('./message.route')  
function route(app){
    app.use('/auth',authRouter)
    app.use('/group',groupRouter)
    app.use('/message',messageRouter)
}
module.exports = route;