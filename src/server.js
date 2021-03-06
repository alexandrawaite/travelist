const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const session = require('express-session')
const methodOverride = require('method-override')

const routes = require('./routes')

const PORT = process.env.PORT || 3000
const ROOT_DIR = path.resolve(__dirname, '../')

const app = express()

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

app.use(express.static(`${ROOT_DIR}/public`))
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use(methodOverride('_method'))

app.use(
  session({
    name: 'session_id',
    secret: 'wooohooo',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 600000 },
  })
)

app.use(routes)

app.use((req, res) => {
  res.status(404).render('common/not-found')
})

app.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}...`)
})