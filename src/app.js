const path = require('path')
const express = require('express')
const app = express()
const hbs = require('hbs')
const request = require('request')
const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')

// path directory 
const publicDirectoryPath = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(partialsPath)


app.use(express.static(publicDirectoryPath))


app.get('/', (req, res) => {
    res.render('index', {
        title: 'Weather', 
        name: 'Deva'
    })
})


app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some helpful text',
        title: 'Help',
        name: 'Deva'
    })
})


app.get('/about', (req, res) => { 
    res.render('about', {
        title : 'About Me', 
        name: 'Deva'
    })
})

app.get('/products', (req, res) => {
    if(!req.query.search){
        return res.send({
            error: 'Please key in the search query'
        })
    }
    res.send({
        products: []
    })
})



app.get('/weather', (req, res) => {
    const address = req.query.address
    if(!address){
        return res.send({
            error: 'you must provide an address'
        })
    }


    geocode(address, (error, {latitude, longitude, location} = {}) => {
    if(error){
        return res.send({error})
    }

    forecast(latitude, longitude, (error, dataForcast) =>{
        if(error){
            return res.send({error})
        }

        res.send({
            forecast: dataForcast, 
            location, 
            address
        })
    })
})
    // res.send({
    //     forecast: 'it is snowing', 
    //     location: 'philadelphia'
    // })
})

app.get('*', (req, res) => {
    res.render('404', {
        name: 'Deva Adithya', 
        title: '404', 
        errorMessage: 'Page not found'
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404', 
        name: 'Deva Adithya', 
        errorMessage: 'Help Article is not found'
    })
})


app.listen(3000, () => {
    console.log('Website has started on port 3000')
})