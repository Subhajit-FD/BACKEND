const mongoose = require('mongoose');

const connectDb = () => {
    mongoose.connect("mongodb+srv://Subhajit:Ngv4HOhvYv365ybg@cohort.awt7qzr.mongodb.net/Cohort").then(()=>{
        console.log("Connected to MongoDB successfully");
    })
}

module.exports = connectDb;