const express = require('express')
const app = express()
const port = 3000



//body parser
let body_parser = require('body-parser')
var mysql = require('mysql')
app.use(body_parser.urlencoded({extended:false}))
app.use(body_parser.json())

var connection = mysql.createConnection({
    host : 'localhost',
    user: 'root',
    password : '',
    database : 'belajar_express'
})

connection.connect();


let user =[
{
    name: 'alif1',
    email: 'lol@gmail.com',
    phone: 085888995161
},
{
    name: 'Lucinta dia',
    email: 'adf@Gmail.com',
    phone: 1112241211111
},
{
    name: 'mahmud',
    email:'ler@gmail.co.id',
    phone: 00000000000000
}
]

app.get('/', (req, res) => {
    if (req.params.id > user.length - 1 || req.params.id < 0) {
        res.send(404)
    }else{
        res.send(user[req.params.id], 200)
    }
})


app.post('/user', (req, res) => {
   /*
   
    let update_JSON = [
        {
            'name': req.params.name,
            'email': req.params.email,
            'phone': req.body.phone
        }
    ]
   
   */
            let name = req.params.name,
                email = req.params.email,
                phone =  req.body.phone

            

   /**
    * 
    *  user.push(update_JSON)
    res.send(update_JSON, 200)
    */
})

app.put('/user/:id', (req, res) => {
    let update_JSON = {
        'name':req.body.name,
        'email': req.body.email,
        'phone': req.body.phone,
    }
})

app.delete('/user/:id', (req, res) => {
    user.splice(req.params.id, 1)
    res.send({'deleted': true, 'id':req.params.id}, 204)
})





//function that use msyql


app.get('/v2/user', (req, res) => {

    connection.query("SELECT * FROM users", function (error, results) {
        if (error) {
            throw error;
        }

        res.send(results, 200);
        })

 })

 app.get('/v2/user/:id', (req, res) => {
     connection.query('SELECT * FROM users WHERE id= ?',[id], function (error, results) {

        if (results.length > 0) {
            res.send(results[0], 200)
        }else{
            res.send(404);
        }
         
     })
 })

 app.post('/v2/user', (req, res) => {
     var data ={
         name : req.body.name,
         email : req.body.email,
         phone : req.body.phone
     }
     connection.query(`INSERT INTO users (name,email,phone) VALUES(?,?,?)`, [data.name, data.email, data.phone], (error, results) => {
         if (error)  throw error;
         var id = results.insertId;
         if (id) {
             data.id = results.insertId;
             res.send(data, 201);
         }else{
             res.send(400)
         }

         
     })
 })


 app.put('/v2/user/:id', (req, res) => {
    var data ={
        name : req.body.name,
        email : req.body.email,
        phone : req.body.phone
    }
    connection.query(`UPDATE users SET name=?, email=?, phone=? WHERE id=?`, [data.name, data.email, data.phone, id], 
    function(error, results) {
        if (error)  throw error;
        var changedRows = results.changedRows;
        if (changedRows > 0) {
            data.id = id;
            res.send(data, 200);
        }else{
            res.send(400)
        }

        
    })
})

app.get('/error-server', (req, res)=> {
    res.send(500)
})

app.get('/bad-request', (req, res) =>{
    res.send(400)
})

app.get('/created', (req,res) => {
    res.send(201)
})


app.listen(port, () => {
    console.log(`server jalan di port ${port} lurr!!`)
})
