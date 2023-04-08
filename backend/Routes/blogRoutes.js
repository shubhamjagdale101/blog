const express = require('express');
const  {blogInsert, fetchBlogs, deleteBlog} = require('../controllers/blogController');
const {verify} = require('../controllers/emailVerifyController');
const router = express.Router();

router.route("/insert").post(blogInsert);
router.route("/fetchBlog").post(fetchBlogs);
router.route("/delete").post(deleteBlog);
router.route("/otp").post(verify);

module.exports = router;