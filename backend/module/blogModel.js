const mongoose = require('mongoose')

const userSchema = mongoose.Schema(
    { 
        userid:{
            type: String,
            required:true,
        },
        subject : {
            type : String,
            required : true,
        },
        content : {
            type : String,
            required : true,
        },
    },
    {
        timestamps : true,
    }
);

const Blog = mongoose.model('Blog',userSchema);
module.exports = Blog;