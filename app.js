const express = require('express')
const port = 3000
const jwt = require('jsonwebtoken')
const config = require('./public/scripts/config')

const app = express()
app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html')
})

app.get('/nosotros', (req, res) => {
    res.sendFile(__dirname + '/public/nosotros.html')
})

app.get('/productos', (req, res) => {
    res.sendFile(__dirname + '/public/productos.html')
})

app.get('/politicas', (req, res) => {
    res.sendFile(__dirname + '/public/politicas.html')
})

app.get('/contacto', (req, res) => {
    res.sendFile(__dirname + '/public/contacto.html')
})

app.get('/login', (req, res) => {
    res.sendFile(__dirname + '/public/login.html')
})

app.get('/register', (req, res) => {
    res.sendFile(__dirname + '/public/register.html')
})

app.post('/signup', (req, res) => {
    console.log(`Post pagina de register ${req.body.username}`)
    console.log(`Post pagina de password ${req.body.password}`)

    if(`${req.body.username}` === 'Jairo Ramirez' && `${req.body.password}` === '29'){
        console.log(`Nombre: ${req.body.username}, Password: ${req.body.password}`)
        const user = {
            nombre: `${req.body.username}`,
            password: `${req.body.password}`
        }

        jwt.sign({user: user}, config.secret, {expiresIn: '200s'}, (err, token) => {
            res.json({token: token})
        })
    }else{
        return res.status(401).json({
            auth: false,
            message: 'Usted no ha proveido un token valido'
        })
    }
})

app.post('/signin', verifyToken, (req, res) => {
    console.log(`Post pagina de register ${req.body.username}`)
    console.log(`Post pagina de password ${req.body.password}`)

    if(`${req.body.username}` === 'Jairo Ramirez' && `${req.body.password}` === '29'){
        res.sendFile(__dirname + '/public/index.html')
        console.log(`Nombre: ${req.body.username}, Password: ${req.body.password}`)
        const user = {
            nombre: `${req.body.username}`,
            password: `${req.body.password}`
        }

    }else{
        return res.sendFile(__dirname + '/public/error.html')
    }
})

function verifyToken(req, res, next){
    const bearerHeader = req.headers['authorization']
    if(typeof bearerHeader !== 'undefined'){
        bearerToken = bearerHeader.split(" ")[1]
        req.token = bearerToken
        next()
    }else{
        res.status(401)
        next()
    }
}

app.use(express.static('public'))

app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
