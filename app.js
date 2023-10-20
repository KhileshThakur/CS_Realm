const express = require('express');
const path = require('path');
const fs = require('fs');
const session = require('express-session');
const app = express();
const { adminRec, bookRec, studentRec, bookRent } = require("./schema/schemaDB");
const port = 8080;

app.use('/static', express.static('static'));//for serving files
app.use(express.urlencoded({ extended: false }));//its a middleware which will through data to the express and using req.body you can access it in post request
app.use(express.json());
app.use(session({
    secret: '123-456-789',
    resave: false,
    saveUninitialized: true
}));


app.set('view engine', 'pug');//setting engine as pug
app.set('views', path.join(__dirname, 'views'));//setting view

app.get('/', (req, res) => {
    res.render('./landing.pug');
})
app.get('/admin', (req, res) => {
    res.render('./adminSection.pug');
})
app.get('/client', (req, res) => {
    res.render('./userSection.pug');
})
app.get('/signup', (req, res) => {
    res.render('./signup.pug');
})
app.get('/client/signup', (req, res) => {
    res.render('./clientSignup.pug')
})
app.get('/login', (req, res) => {
    res.render('./login.pug');
})
app.get('/client/login', (req, res) => {
    res.render('./clientLogin.pug');
})
app.get('/about', (req, res)=>{
    res.render('./about.pug');
})
app.get('/rules', (req, res)=>{
    res.render('./rules.pug');
})
app.get('/contact', (req, res)=>{
    res.render('./contact.pug');
})

app.post('/signup', async (req, res) => {

    const data = {
        fullname: req.body.fullname,
        email: req.body.email,
        mobile: req.body.mobile,
        username: req.body.username,
        password: req.body.password
    }

    await adminRec.insertMany([data]);
    res.render('./login.pug')
})
app.post('/client/signup', async (req, res) => {
    const studData = {
        stud_id: req.body.stud_id,
        stud_name: req.body.stud_name,
        email: req.body.email,
        dob: req.body.dob,
        mobile: req.body.mobile,
        address: req.body.address,
        username: req.body.username,
        password: req.body.password
    }

    await studentRec.insertMany([studData]);
    res.redirect('/client/login');
})

app.post('/login', async (req, res) => {


    try {
        const user = await adminRec.findOne({ username: req.body.username })
        if (user.password === req.body.password) {
            req.session.user = user;
            res.render("./dashboard.pug", { user: req.session.user })
        }
        else {
            res.send(`<h3>Wrong Password</h3>`)
        }
    } catch {
        res.send(`<h3>Wrong Details</h3>`)
    }
})
app.post('/client/login', async (req, res) => {
    try {
        const client = await studentRec.findOne({ username: req.body.username })
        if (client.password === req.body.password) {
            req.session.client = client;
            res.render('./clientDashboard.pug', { client: req.session.client })
        }
        else {
            res.send(`<h3>WRONG PASSWORD</h3>`)
        }
    }
    catch {
        res.send(`<h3>WRONG DETAILS</h3>`)
    }
})
app.get('/dashboard', (req, res) => {
    if (req.session.user) {
        res.render('./dashboard.pug', { user: req.session.user });
    } else {
        res.redirect('/login');
    }
});

app.get('/client/dashboard', async (req, res) => {
    
    if (req.session.client) {
        try {
            res.render('./clientDashboard.pug', {
                client: req.session.client
            });
        } catch (error) {
            console.error(error); // Log any errors to the console
            res.status(500).send('Internal Server Error'); // Send an error response to the client
        }
    } else {
        res.redirect('/client/login');
    }
});


app.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/');
});
app.get('/client/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/')
})
app.get('/bookrec', async (req, res) => {
    if (req.session.user) {
        try {
            const books = await bookRec.find();
            res.render('./bookrec.pug', {
                bookrec: books
            });

        }
        catch (err) {
            console.log("Error in finding ");
        }
    } else {
        res.redirect('/dashboard');
    }
});
app.get('/client/availableBooks', async (req, res) => {
    if (req.session.client) {
        try {
            const books = await bookRec.find();
            res.render('./clientAvailableBooks.pug', {
                bookrec: books
            });

        }
        catch (err) {
            console.log("Error in finding ");
        }
    } else {
        res.redirect('/client/dashboard');
    }
})
app.get('/client/books', async (req, res)=>{
    if(req.session.client){
        try{
            const books = await bookRent.find();
            res.render('./clientBookRec.pug', {
                book: books,
                client: req.session.client
            });
        }
        catch(err){
            console.log("error in finding")
        }
    }
    else {
        res.redirect('/client/dashboard');
    }
})
app.get('/stdrec', async (req, res) => {
    if (req.session.user) {
        try {
            const studs = await studentRec.find();
            res.render('./studentrec.pug', {
                stdrec: studs
            });
        }
        catch (err) {
            console.log("error in finding");
        }
    }
    else {
        res.redirect('/dashboard');
    }
});

app.get('/bookInsert', (req, res) => {
    if (req.session.user) {
        try {
            res.render('./bookInsert.pug')
        }
        catch (err) {
            console.log("error in finding");
        }
    }
    else {
        res.redirect('/dashboard');
    }
});
app.post('/bookInsert', async (req, res) => {
    if (req.session.user) {

        try {
            const bookdetail = {
                book_id: req.body.book_id,
                book_name: req.body.book_name,
                author: req.body.author,
                available_status: req.body.available_status
            }

            await bookRec.insertMany([bookdetail]);
            res.redirect('/bookrec')
        }
        catch (err) {
            console.log("error in Insertion");
        }


    }
    else {
        res.redirect('/dashboard');
    }

})
app.get('/bookUpdate/:id', async (req, res) => {
    if (req.session.user) {
        try {
            const bookId = req.params.id;
            const book = await bookRec.findById(bookId);
            res.render('./bookUpdate.pug', { book });

        }
        catch (err) {
            console.log("error in finding");
        }
    }
    else {
        res.redirect('/dashboard');
    }
})

app.post('/bookUpdate/:id', async (req, res) => {
    if (req.session.user) {

        try {
            const bookId = req.params.id;
            const updatedBook = {
                book_id: req.body.book_id,
                book_name: req.body.book_name,
                author: req.body.author,
                available_status: req.body.available_status
            };

            await bookRec.findByIdAndUpdate(bookId, updatedBook);
            res.redirect('/bookrec');
        } catch (err) {
            console.log("error in Update");
        }
    }
});

app.get('/bookRent/:id', async (req, res) => {
    if (req.session.user) {
        try {
            const bookId = req.params.id;
            const book = await bookRec.findById(bookId);
            res.render('./bookRent.pug', { book });
        }
        catch (err) {
            console.log("error in finding");
        }
    }
    else {
        res.redirect('/dashboard');
    }
})
app.post('/bookRent/:id', async (req, res) => {
    if (req.session.user) {
        try {
            const bookId = req.params.id;
            const studID = await studentRec.findOne({ stud_id: req.body.stud_id })
            if (studID.stud_id == req.body.stud_id) {
                const rentBook = {
                    book_id: req.body.book_id,
                    book_name: req.body.book_name,
                    author: req.body.author,
                    available_status: req.body.available_status,
                    stud_id: req.body.stud_id,
                    stud_name: studID.stud_name
                };
                const updatedBook = {
                    book_id: req.body.book_id,
                    book_name: req.body.book_name,
                    author: req.body.author,
                    available_status: req.body.available_status
                };

                await bookRec.findByIdAndUpdate(bookId, updatedBook);
                await bookRent.create(rentBook);

                res.redirect('/bookrec')

            }
            else {
                res.send(`<h3>Wrong Password<h3>`)
            }
        } catch (error) {
            res.send(`<h3>Wrong Details<h3>`)
        }
    }
});
app.get('/rentRec', async (req, res) => {
    if (req.session.user) {
        try {
            const rentR = await bookRent.find();
            res.render('./rentedBookRec.pug', {
                rentRecs: rentR
            });
        }
        catch (err) {
            console.log("error in finding");
        }
    }
    else {
        res.redirect('/dashboard');
    }
})
app.get('/bookDelete/:id', async (req, res) => {
    if (req.session.user) {
        const deletedBook = await bookRec.findByIdAndRemove(req.params.id);
        if (!deletedBook) {
            console.log("Error in deletion");
        }
        res.redirect('/bookrec');
    }
});
app.get('/bookReturn/:id', async (req, res) => {
    if (req.session.user) {
        const bookId = req.params.id;
        if (bookId.book_id == req.body.book_id) {

            await bookRent.findByIdAndRemove(bookId);

            res.redirect('/bookrec');
        }
    }
});



app.listen(port, () => {//listening on port
    console.log(`Running on port  http://localhost:${port}`);
})