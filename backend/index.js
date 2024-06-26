import express from 'express';
import cors from 'cors';
import mysql from 'mysql2';
import bcrypt from 'bcrypt';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}
));
app.use(cookieParser());
app.use(session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24, 
        secure: false,
        sameSite: 'lax',
        httpOnly: true
    }
}));

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'dog_shelter'
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
    const query = 'SELECT * FROM dogs WHERE status="available" ';
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

app.get('/acceptedDogs', (req, res) => {
    
    pool.query('SELECT * FROM dogs WHERE status="Adopted"', (err, data) => {
        if (err) {
            console.error('Error querying database:', err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        return res.json(data);
    });
});

app.get('/pendingAdoptions', (req, res) => {
    pool.query('SELECT a.*, d.* FROM adoption_forms a JOIN dogs d ON a.dog_id = d.dog_id WHERE a.status = "Pending"', (err, data) => {
        if (err) {
            console.error('Error querying database:', err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        return res.json(data);
    });
});

app.post('/approveAdoption', (req, res) => {
    const { adoptionId, dogId, action } = req.body;
    console.log(`Adoption ID: ${adoptionId}, Dog ID: ${dogId}, Action: ${action}`);

    if (!adoptionId || !dogId) {
        return res.status(400).json({ error: 'Invalid adoptionId or dogId' });
    }

    if (action === 'accept') {
        pool.query('UPDATE adoption_forms SET status="Approved" WHERE form_id=?', [adoptionId], (err, data) => {
        if (err) {
            console.error('Error updating adoption status:', err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
            pool.query('UPDATE dogs SET status="Adopted" WHERE dog_id=?', [dogId], (err, data) => {
                if(err){
                    console.error('Error updating dog status:', err);
                    return res.status(500).json({ error: 'Internal Server Error' });
                }
                return res.json({succes: true, message: 'Adoption approved'});
            });
        });
    } else if (action === 'reject') {
        pool.query('UPDATE adoption_forms SET status="Rejected" WHERE form_id=?', [adoptionId], (err, data) => {
            if (err) {
                console.error('Error updating adoption status:', err);
                return res.status(500).json({ error: 'Internal Server Error' });
            }
            pool.query('UPDATE dogs SET status="Available" WHERE dog_id=?', [dogId], (err, data) => {
                if(err){
                    console.error('Error updating dog status:', err);
                    return res.status(500).json({ error: 'Internal Server Error' });
                }
            return res.json({succes: true, message: 'Adoption rejected'});
            });
        });
    } else {
        return res.status(400).json({ error: 'Invalid action' });
    }
});

const imagesDir = path.join(__dirname,'..', 'public', 'images');
console.log(imagesDir);

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, imagesDir);
    },
    filename: function (req, file, cb) {
        const filename= `${Date.now()}_${file.originalname}`;
        cb(null, filename);
    }
});

const upload = multer({ storage });

app.post('/addDog', upload.single('file'), (req, res) => {
    if(!req.file) {
        return res.status(400).json({ error: 'Image file is required' });
    }

    const {name, breed, age, gender, description} = req.body;
    const image_url = `images/${req.file.filename}`;

    const sql = 'INSERT INTO dogs (`name`, `breed`, `age`, `gender`, `description`, `image_url`) VALUES (?, ?, ?, ?, ?, ?)';
    const insertValues = [name, breed, age, gender, description, image_url];

    pool.query(sql, insertValues, (err, data) => {
        if (err) {
            console.error('Error adding dog to database:', err);
            return res.status(500).json({ error: 'Internal Server Error', details: err.message });
        }
        return res.json(data);
    });
});

app.post('/adopt', (req, res) => {
    const { city, experience, anotherDog, yard, message, email, firstname, phone, userId, dogId } = req.body;

    const insertSql = 'INSERT INTO adoption_forms (`location`, `experience`, `dogs_nr`, `yard`, `message`, `email`, `name`, `phone_number`, `dog_id`, `user_id`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
    const insertValues = [city, experience, anotherDog, yard, message, email, firstname, phone, dogId, userId];

    pool.query(insertSql, insertValues, (err, data) => {
        if (err) {
            console.error('Error adding adoption request to database:', err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        console.log('Adoption data inserted successfully');

        const updateSql= 'UPDATE dogs SET status="pending" WHERE dog_id=?';
        pool.query(updateSql, [dogId], (err, data) => {
            if(err) {
                console.error('Error updating dog status:', err);
                return res.status(500).json({ error: 'Internal Server Error' });
            }
        });
            console.log('Dog status updated successfully to Pending');

        res.status(200).json({ message: 'Adoption data inserted successfully' });
       });
});

app.post('/signup', (req, res) => {
    const { email, password, confirmPassword, firstname, lastname, phone } = req.body;

    const sqlCheckEmail = 'SELECT * FROM users WHERE email = ?';

    pool.query(sqlCheckEmail, email, (err, data) => {
        if (err) {
            return res.json(err);
        }
        if (data.length > 0) {
            return res.status(409).json({ error: 'Email already exists' });
        }

        const validatePhone=/^0[0-9]{9}$/;
        if (!validatePhone.test(phone)) {
            return res.status(422).json({ error: 'Phone not ok' });
        }
   
        const validatePassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
        if (!validatePassword.test(password)) {
            return res.status(406).json({ error: 'Password not ok' });
        }
    
        if(password !== confirmPassword) {
            return res.status(400).json({ error: 'Passwords do not match' });
        }
    
        const saltRounds = 10;
        bcrypt.hash(password, saltRounds, (err, hash) => {
            if (err) {
               console.log(err);
            }
            const sql= 'INSERT INTO users (`email`, `password`, `firstname`, `lastname`, `phone`) VALUES (?, ?, ?, ?, ?)';
            const insertValues = [email, hash, firstname, lastname, phone];

            pool.query(sql, insertValues, (err, data) => {
                if (err) {
                    return res.json(err);    
                }
                return res.json(data);
            });
        });
    });
});

app.post('/login', (req, res) => {
    const sqlCheckEmail = 'SELECT * FROM users WHERE email = ?';
    const {email, password} = req.body;
    
    pool.query(sqlCheckEmail, [email], (err, data) => {
        if (err) {
            return res.json(err);
        }
        if (data.length === 0) {
            return res.status(404).json({ error: 'Email not found' });
        }
        
        const user = data[0];

        bcrypt.compare(password, user.password, (err, result) => {
            if (err) {
                return res.json(err);
            }
            if (!result) {
                return res.status(401).json({ error: 'Incorrect password' });
            }
            
            
            req.session.user = { userId: user.user_id, email: user.email, firstname: user.firstname, userRole: user.role, phone: user.phone};
            res.json({ isLoggedIn: true, email:user.email, firstname: user.firstname, userRole: user.role, phone: user.phone, userId: user.user_id});
        }); 
    });
});


app.post('/logout', (req, res) => {
    req.session.destroy(err =>{
        if (err) {
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    });
    res.json({isLoggedIn: false});
    res.clearCookie('connect.sid');
    res.sendStatus(200);
});

app.listen(5500, () => console.log('Server started on port 5500'));