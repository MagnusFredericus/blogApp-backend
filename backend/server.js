const express = require('express')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const config = require('./config/config')
const db = require('./model/database')

const app = express()

// app.use(cors({credentials:true, origin: ['']}))
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(cookieParser())

app.use('/auth', require('./view/auth'))
app.use('/user', require('./view/user'))
app.use('/post', require('./view/post'))
app.use('/comment', require('./view/comment'))

app.use('*', require('./middleware/notFoundHandler'))
app.use(require('./middleware/errorHandler'))

if(require.main === module) {
    db.syncDB({'force':false}).then(() => {
        app.listen(config.PORT, () => {
            console.log(`Server running on port ${config.PORT}`)
        })
    })    
} else {
    app.init = async() => {
        return await db.syncDB({'force':false}).then(() => {
            return app.listen(config.PORT, () => {
                console.log(`Server running on port ${config.PORT}`)
            })
        })
    }
    
    module.exports = {
        app: app,
        db: db
    }
}

// ======
// - Keep reviewing the tests and improving (checks on db, etc)
// - Include checks on db everywhere the entries are incorrect (tests)
// - put friends and other objects always on beforeAll, beforeEach, etc
// ======
// - Make all e2e tests run at once
// - Implement unit tests
// - Implement functional tests
// ======
// - Implement logs
// - Implement commands
// - Implement cluster module
// ======
// - Implement noSQL database
// ======
// - Where the dockerignore file has gone??