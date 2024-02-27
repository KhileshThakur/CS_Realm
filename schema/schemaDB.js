const mongoose = require("mongoose")
const { boolean } = require("webidl-conversions")

mongoose.connect('mongodb+srv://omthakur6640:Om25MongoDB@cluster0.ufgbeas.mongodb.net/lbmsDB?retryWrites=true&w=majority&appName=Cluster0/')
    .then(() => {
        console.log("MongDB Connected Successfully")
    })
    .catch(() => {
        console.log("MongoDB Failed to Connect")
    })

const adminSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    mobile: {
        type: Number,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})

const bookSchema = new mongoose.Schema({
    book_id: {
        type: Number,
        required: true
    },
    book_name: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    available_status: {
        type: Boolean,
        required: true
    }
})

const studentSchema = new mongoose.Schema({
    stud_id: {
        type: Number,
        required: true
    },
    stud_name: {
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    dob:{
        type:Date,
        required: true
    },
    mobile:{
        type: Number,
        required: true
    },
    address:{
        type: String,
        required: true
    },
    username:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    }

})

const bookRentSchema = new mongoose.Schema({
    book_id: {
        type: Number,
        required: true
    },
    book_name: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    available_status: {
        type: Boolean,
        required: true
    },
    stud_id: {
        type: Number,
        required: true
    },
    stud_name:{
        type: String, 
        required:true
    }
})

const bookRec = new mongoose.model("bookRec", bookSchema);
const studentRec = new mongoose.model("studentRec", studentSchema);
const adminRec = new mongoose.model("adminRec", adminSchema);
const bookRent = new mongoose.model("bookRent", bookRentSchema);

module.exports = {
    bookRec,
    studentRec,
    adminRec,
    bookRent
};
