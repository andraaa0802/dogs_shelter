import express from 'express';
import cors from 'cors';
import mysql from 'mysql2';

const app = express();
app.use(cors());

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'dog_shelter',
    connectionLimit: 10 
});

pool.getConnection((err, connection) => {
    if (err) {
        console.error('Error connecting to database:', err);
        return;
    }
    console.log('Connected to database');

    connection.release();
});

app.get("/", (req, res) => {
    return res.json("From backend");
});

app.get('/dogs/:id', (req, res) => {
    const dogId = req.params.id;
    pool.query('SELECT * FROM dogs WHERE dog_id = ?', [dogId], (err, data) => {
        if (err) {
            console.error('Error querying database:', err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        if (data.length === 0) {
            return res.status(404).json({ error: 'Dog not found' });
        }
        return res.json(data[0]);
    });
});

app.get('/dogs', (req, res) => {
    let query = 'SELECT * FROM dogs WHERE status="available" ';
    const gender = req.query.gender;
    const breed = req.query.breed;
    const age = req.query.age;
    const search = req.query.search;

    if (gender) {
        query += `AND gender="${gender}"`;
    }

    if (breed) {
        if (breed==='rasa') {
            query += `AND breed !="Comună"`;}
        else if (breed==='comuna') {
            query += `AND breed ="Comună"`;}
    }

    if (age==='crescator') {
        query += `ORDER BY age ASC`;
    } else if (age==='descrescator') {
        query += `ORDER BY age DESC`;
    }

    if (search) {
        query += `AND (name LIKE '%${search}%' OR breed LIKE '%${search}%' OR description LIKE '%${search}%' OR age LIKE '${search}') `;
    }

    pool.query(query, (err, data) => {
        if (err) {
            console.error('Error querying database:', err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        return res.json(data);
    });
});

app.listen(5500, () => console.log('Server started on port 5500'));