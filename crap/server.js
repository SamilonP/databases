import express from 'express'
import sqlite3 from 'sqlite3'

const app = express()
const db = new sqlite3.Database("quote.db")

app.set('view engine', 'ejs')
app.use(express.json())
app.use(express.urlencoded())
app.use(express.static('public'))

app.delete('/:id', (req, res) => {
    db.run("DELETE FROM quote WHERE id = ?", [req.params.id], (err) => {
        if (err) {
            res.send(err.message)
        } else {
            res.send("hiugulang")
        }
    })
})

app.get('/', (req, res) => {
    db.all('SELECT * FROM quote', (err, rows) => {
        if (err) {
            console.error(err)
            res.status(500).send("VA HÄND!?!?!?")
            return
        } else {
            res.render("index", { text: rows })
        }
    })
})

app.get('/update', (req, res) => {
    res.render("update")
})

app.get('/create', (req, res) => {
    res.render("create")
})

app.post('/api/quote', (req, res) => {
    db.run("INSERT INTO quote (text, author) VALUES (?, ?)", [req.body.quote, req.body.author], (err) => {
        if (err) {
            res.send(err.message)
        } else {
            res.send("uihfgu")
        }
    })
})

app.put('/api/quote', (req, res) => {
    console.log(req.body, "asidjrhg")
    db.run("UPDATE quote SET text = ?, author = ? WHERE id = ?", [req.body.text, req.body.author, req.body.id], (err) => {
        if (err) {
            res.send(err.message)
        } else {
            res.send("!!!")
        }
    })
})
 
app.listen(3000, err => {
    if (err) {
        console.error(err)
    }
})
