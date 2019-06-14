const path = require('path')
const express = require('express')
const hbs = require('hbs')
const request = require('request')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
// Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname,  '../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

// setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)
//setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Muskan'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Muskan'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some  text.',
        title: 'Help',
        name: 'muskan'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: 'No address Found'
        })
    }
    
        geocode(req.query.address, (error, {lattitude, longitude , place}={})=> {
            if(error){
                return res.send({
                    error:error
                })
            }
            
            forecast(lattitude, longitude, (error, forecastdata) => {
                if(error){
                    return res.send({
                        error:error
                    })
                }
                
                //res.send(place)
                res.send({
                    forecastdata,
                    place:place,
                    //address: request.query.address
              })
            //   console.log(forecastdata)
            })
    })
})

app.get('/products',(req,res)=>{
    if(!req.query.search){
        return res.send({
            error: 'you must provide a search team'
        })
    }
    res.send({
        product: []
    })
})
app.get('/help/*',(req, res)=>{
    res.render('404',{
        title:'404',
        name:'muskan',
        errorMessage:'no article found on help'
    })
})

app.get('*',(req, res)=>{
    res.render('404', {
        title:'404',
        name:'muskan',
        errorMessage:'page not found'
    })
})


app.listen(3000, () => {
    console.log('Server is up on port 3000.')
    })