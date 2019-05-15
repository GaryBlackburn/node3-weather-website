const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require("./utils/forecast")

const app = express()

//define paths for express config
const viewPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//static directory to serve
app.use(express.static(path.join(__dirname, '../public')))
//setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(partialsPath)

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Gary'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Gary'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Gary',
        message: 'This is the help page'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.location) {
        return res.send({
            error: 'You must supply a location'
        })
    }

    geocode(req.query.location, (error, {latitude, longitude, location} = {}) => {
            if (error) {
                return res.send({error})
            }
            
            forecast(latitude, longitude, (error, forecastData) => {
                if (error) {
                    return res.send({error})
                }
                
                res.send({
                    location,
                    forecast: forecastData
                })
            })
        })
})

app.get('/products', (req,res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req,res) => {
    res.render('NotFound', {
        title: 'Help',
        name: 'Gary',
        errorMessage: 'Help article not found'
    })
})

app.get('*', (req,res) => {
    res.render('NotFound', {
        title: 'Not Found',
        name: 'Gary',
        errorMessage: 'Page Not Found'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})