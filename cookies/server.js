const express=require("express");
const app=express();
const session= require("express-session");
const flash= require("connect-flash");
const path=require("path");

app.set("view engine","ejs");
app.set("views", path.join(__dirname,"views"));

app.listen(3000,()=>{
    console.log("server is listening");
});

app.use(session({
    secret: 'mysupersecretstring',
    resave: false,
    saveUninitialized: true,
    // cookie: { secure: true }
  }));
  app.use(flash());

  // app.get("/test", (req,res)=>{
  //   res.send("test sucessful!")
  // });

  // app.get("/reqcount", (req,res)=>{
  //   if(req.session.count){
  //     req.session.count++;
  //   }else{
  //     req.session.count=1;
  //   }
  //   res.send(`you sent a request ${req.session.count} times`)
  // });


  //middleware
  app.use((req,res,next)=>{
    res.locals.sucessMsg=req.flash("sucess");
    res.locals.errorMsg=req.flash("error");
    next();
  });

  app.get("/register",(req,res)=>{
    let {name="anonymous"}=req.query
    req.session.name=name;
    // console.log(req.session.name)
    if(name==="anonymous")
    {
      req.flash("error", "user not registerd!")
    }
    else{
      req.flash("sucess", "user registerd sucessfully!")
    }
  
    res.redirect("/hello")
  });

  app.get("/hello",(req,res)=>{
    res.render("page.ejs",{name:req.session.name, msg:req.flash("sucess")});
  });