const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");
const mongoose = require("mongoose");
const { urlencoded } = require("body-parser");

const homeStartingContent = "Welcome to BLOG ME !";
const aboutContent = "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Perspiciatis quaerat nisi itaque iure praesentium consectetur accusamus labore saepe? A dolore totam magnam? Odit quos soluta, est aliquid laboriosam perferendis dolorem?";
const contactContent = "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Perspiciatis quaerat nisi itaque iure praesentium consectetur accusamus labore saepe? A dolore totam magnam? Odit quos soluta, est aliquid laboriosam perferendis dolorem?";
// let posts = [];

const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect("mongodb+srv://adityaprajapati:Asdf%401234@cluster0.loih2fs.mongodb.net/blogWebsiteDB");

const blogSchema = new mongoose.Schema({
    title: String,
    content: String
})

const Blog = mongoose.model("Blog", blogSchema);

const defaultBlog = new Blog({
    title: "This is a Defualt Blog, Blog1",
    content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus laborum autem vero expedita? Provident quibusdam, cumque sed perferendis consequatur modi. Quisquam facere laborum commodi nulla, ratione quasi aut eaque saepe!"
})

// defaultBlog.save();

app.get("/", function(req, res){

    let blogs = Blog.find({}).then((blogs)=>{
        console.log("All blogs are successfully fetched.");

        res.render("home", {homeStartingContent: homeStartingContent, blogs: blogs});
    })
    .catch((err)=>{
        console.log("Error in fetching blogs from database.")
    })
})

app.get("/about", function(req, res){
    res.render("about", {aboutContent: aboutContent});
})

app.get("/contact", function(req, res){
    res.render("contact", {contactContent: contactContent});
})

app.get("/compose", function(req, res){
    res.render("compose");
})

app.post("/compose", function(req, res){

    let newBlog = new Blog({
        title: req.body.newBlogTitle,
        content: req.body.newBlogContent
    })

    newBlog.save();

    // posts.push(newBlog);

    res.redirect("/");
})

app.get("/blogs/:blogId", function(req, res){
    
    let blogId = req.params.blogId;

    Blog.findById(blogId).then((blog)=>{
        res.render("post", {title: blog.title, content: blog.content});
    }).catch((err)=>{
        console.log("Error in fetching the blog from database", err);
    })
})

app.listen(3000, function(){
    console.log("Successfully listening on port: 3000");
})