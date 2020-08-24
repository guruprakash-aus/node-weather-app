const path = require('path')
const express = require('express')
//const { response } = require('express')
const hbs = require('hbs')

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

//console.log(__dirname)
//console.log(path.join(__dirname, '../public'))

//console.log(__filename)
// express above is a function and we call the function below
const app = express()

//Port def for Heroku
const port = process.env.PORT || 3000

//DefinePaths
const publicDirPath = path.join(__dirname, '../public')
//viewpath
const viewsPath = path.join(__dirname,'../templates/views')
//PartialsPath
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup handlebars engine and views location
//view engine is a key and we can set a value for that using the 
//below function
app.set('view engine', 'hbs')
//Sets the different path for views
app.set('views', viewsPath)
//Set the Partials using register
hbs.registerPartials(partialsPath)
//setup static directory to serve
app.use(express.static(publicDirPath))

app.get('',(req,res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Guruprakash'
    })
})

app.get('/about', (req,res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Guruprakash'
    })
})

app.get('/help', (req,res) => {
    res.render('help', {
        title: 'Help',
        message: "Contact me if you need help on 0452343409",
        name: "Guruprakash"
    })
})
//What should the server do when someone sends a request


app.get('/weather', (req,res) => {
    if (!req.query.address) {
        return res.send({
            error: "You must provide an address"
        })
    }
    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if (error) {
           return res.send({error})
        } 
        // console.log('Error', error)
        // console.log('Data', data)
        //
        forecast(latitude, longitude, (error, {temperature, feelslike, description} = {}) => {
            if (error) {
               return res.send(error)
            }
            
            // console.log(location)
            // console.log(forecastData)
            res.send({
                temperature,
                feelslike,
                description, 
                location,
                address: req.query.address
            })
          })
    })
    // res.send({
    //     forecast : 5,
    //     location : 'Tarneit',
    //     address: req.query.address
    // })
})

app.get('/products', (req,res) => {
    if (!req.query.search) {
        //The code will run when search query is null
        return res.send({
            error: 'You must provide a search term'
        })
    }
    console.log(req.query)
    //There cannot be multiple send funcs, hence we return the previous send
    res.send({
        products: []
    })
})

//Handling errors
//It needs to be at the end of all the other gets

app.get('/help/*', (req,res) => {
    //res.send(" Help Article not Found")
    res.render('error', {
        title: 'Error 404',
        message: 'Help Article Not Found',
        name: 'Guruprakash'
    })
})

app.get('*', (req,res) => {
    //res.send("My 404 Page")
    res.render('error', {
        title: 'Error 404',
        message: 'Requested Page is not Found in the Server',
        name: 'Guruprakash'
    })
})

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})







// app.get('', (req, res) => {
//     res.send('<h1>Weather</h1>')
// })

// app.get('/help', (req,res) => {
//     res.send([{
//         name: "Guru",
//         age: 32
//     }, {
//         name: "Dhiyash",
//         age: 6
//     }])
// })

// app.get('/about', (req,res) => {
//     res.send('<h1><marquee>About Page</h1>')
// })



//app.com
//app.com/help
//app.com/about

//The method below starts the server
