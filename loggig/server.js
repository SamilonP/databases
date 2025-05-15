import express from "express"
import sqlite3 from "sqlite3"
import { nanoid } from "nanoid"
import cookieParser from "cookie-parser"

const app = express()
const db = new sqlite3.Database("data.db")

app.set('view engine', 'ejs')
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('views'))
app.use(cookieParser())

const sessions = {}

app.get('/register', (req, res) => {
    res.render('register')
})

app.get('/login', (req, res) => {
    res.render('login')
})

app.get('/dashboard', (req, res) => {
    const sessionId = req.cookies.sessionId
    if (!sessionId || !sessions[sessionId]) {
        return res.send("ти не ввійшов в систему вилупок")
    } else {
        console.log()
        db.get("SELECT name FROM users WHERE id = ?", [sessions[sessionId].id], (err, row) => {
            console.log(row)
            res.render("dashboard", { name: row.name })
        })
    }
})

app.post('/api/logout', (req, res) => {
    const sessionId = req.cookies.sessionId
    res.clearCookie(sessionId)
    res.send("FUCk")
})

app.post('/api/login', (req, res) => {
    db.all('SELECT * FROM users WHERE email=? and password=?', 
        [req.body.email, req.body.password] , (err, rows) => {
        if (rows.length == 0)
            return res.send("invalid")

        const id = nanoid()
        sessions[id] = {
            id: rows[0].id,
        }
        
        res.cookie("sessionId", id, {
            httpOnly: true,
            sameSite: true
        })
        
        res.redirect("/dashboard")
    })
})

app.post('/api/register', (req, res) => {
    db.run('INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
     [req.body.username, req.body.email, req.body.password], (err) => {
        if (err) {
            res.send(err.message)
        } else {
            res.send("GUUPP!!!")
        }
     })
})

app.listen(3000, (err) => {
    if (err) {
        console.log(err)
    }
})