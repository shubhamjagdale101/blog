const Blog = require('../module/blogModel');
const User = require('../module/userModel');
const asyncHandler = require("express-async-handler")
const generateToken = require("../utils/generateToken")

const blogInsert = asyncHandler( async (req, res) => {
        const {userid, subject, content} = req.body;

        const userExists = await User.findById(userid);
        if(!userExists)
        {
            res.status(400);
            throw new Error("user not exist");
        }
        
        const BlogInsert = await Blog.create({
            userid,
            subject,
            content,
        });
    
        if(BlogInsert){
            res.status(201).json({
                _id : BlogInsert._id,
                email: userExists.email,
                userid : BlogInsert.userid,
                subject : BlogInsert.subject,
                content: BlogInsert.content,
                token : generateToken(BlogInsert._id),
            })
        }
        else
        {
            res.status(400);
            throw new error("something went wrong during insertion into db");
        }
    }
);

const fetchBlogs = asyncHandler(async (req, res) => {
    const { userid } = req.body;
    const blogs = await Blog.find({userid:userid});
    if (blogs) {
      res.status(200).json(blogs);
    } else {
      res.status(404);
      throw new Error('No blogs found');
    }
});

const deleteBlog = asyncHandler(async (req, res) => {
    const { id } = req.body;
    const blog = await Blog.findByIdAndDelete(id);
    if (blog) {
      res.json({ message: 'Blog removed' });
    } else {
      res.status(404);
      throw new Error('Blog not found');
    }
});

module.exports = {blogInsert, fetchBlogs, deleteBlog};