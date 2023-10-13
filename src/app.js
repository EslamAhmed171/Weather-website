const path = require('path')
const express = require('express') 
const hbs = require('hbs')
const app = express()


const gecode = require('./utlis/gecode')
const forcast = require('./utlis/forcast')
const port = process.env.PORT || 3000 
// Paths
const publicDirectoryPath = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// handlebars
app.set('view engine', 'hbs');
app.set('views', viewPath)
hbs.registerPartials(partialsPath)

// static directory
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) =>{
    res.render('index', {
        title: 'Weather app',
        name: 'Eslam Ahmed'
    })
})

app.get('/about', (req, res) =>{
    res.render('about', {
        title: 'About me',
        name: 'Eslam Ahmed'
    })
})

app.get('/help', (req, res) =>{
    res.render('help', {
        title: 'help page',
        name: 'Eslam Ahmed'
    })
})

app.get('/weather', (req, res) =>{
    if (!req.query.address){
        return res.send({
            error: 'You must provide an address'
        })
    }
    const address = req.query.address
    gecode(address, (error, {latitude, longitude, location} = {}) =>{
        if (error){
            return res.send({
                error
            })
        }
        forcast(latitude, longitude, (error, forcastData) =>{
            if (error){
                    return res.send({
                        error
                })
            }
            res.send({
                location: address,
                forcast: forcastData
            })
        })
    })
})

app.get('/help/*', (req, res) =>{
    res.render('404', {
        title: '404',
        name: 'Eslam Ahmed',
        errorMessage: 'Help artical not found'
    })
})

app.get('*', (req, res) =>{
    res.render('404', {
        title: '404',
        name: 'Eslam Ahmed',
        errorMessage: 'Page not found'
    })
})

app.listen(port, ()=>{
    console.log('Server is running!')
})