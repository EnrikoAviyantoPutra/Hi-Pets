if(process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const express = require('express')
const app = express()
const port = 3001
const routes = require('./routes/index')
const { errorHandler } = require('./middlewares/errorHandler')

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use(routes)
app.use(errorHandler)


// app.listen(port, () => {
//     console.log(`Example app listening at http://localhost:${port}`)
// })

module.exports = app