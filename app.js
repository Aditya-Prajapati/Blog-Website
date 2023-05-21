const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");
const { urlencoded } = require("body-parser");

const homeStartingContent = "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Perspiciatis quaerat nisi itaque iure praesentium consectetur accusamus labore saepe? A dolore totam magnam? Odit quos soluta, est aliquid laboriosam perferendis dolorem?";
const aboutContent = "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Perspiciatis quaerat nisi itaque iure praesentium consectetur accusamus labore saepe? A dolore totam magnam? Odit quos soluta, est aliquid laboriosam perferendis dolorem?";
const contactContent = "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Perspiciatis quaerat nisi itaque iure praesentium consectetur accusamus labore saepe? A dolore totam magnam? Odit quos soluta, est aliquid laboriosam perferendis dolorem?";
let posts = [];

const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", function(req, res){
    res.render("home", {homeStartingContent: homeStartingContent, posts: posts});
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

app.get("/posts/:blogTitle", function(req, res){

    let requestTitle = _.lowerCase(req.params.blogTitle);

    posts.forEach(function(post){
        let availableTitle = _.lowerCase(post.title);

        if (requestTitle == availableTitle){
            res.render("post", {title: post.title, content: post.content});
        }
    })
})

app.post("/compose", function(req, res){

    let post = {
        title: req.body.newBlogTitle,
        content: req.body.newBlogContent
    }

    posts.push(post);

    res.redirect("/");
})

app.listen(3000, function(){
    console.log("Listening");
})