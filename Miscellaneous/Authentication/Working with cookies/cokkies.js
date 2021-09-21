/////////IMPORTANT///

//cookie needs to be http only:
// httpOnly: true 

// HTTP Cookies in Node.js
// Cookies are small data that are stored on a client side and sent to the client along with server requests.
// Cookies have various functionality, they can be used for maintaining sessions and adding user-specific features 
//in your web app. For this, we will use cookie-parser module of npm which provides middleware for parsing of cookies.
// First set your directory of the command prompt to root folder of the project and run the following command:

// npm init
// This will ask you details about your app and finally will create a package.json file.
// After that run the following command and it will install the required module and add them in your package.json 
//file

// npm install express cookie-parser --save
// package.json file looks like this :



let express = require('express'); 
//setup express app 
let app = express() 
  
  
//basic route for homepage 
app.get('/', (req, res)=>{ 
res.send('welcome to express app'); 
}); 
  
//server listens to port 3000 
app.listen(3000, (err)=>{ 
if(err) 
throw err; 
console.log('listening on port 3000'); 
}); 
// After that if we run the command

// node app.js
// It will start our server on port 3000 and if go to the url: localhost:3000, we will get a page showing the message :

// welcome to express app
// Here is screenshot of localhost:3000 page after starting the server :


// So until now we have successfully set up our express app now let’s start with cookies.

// For cookies first, we need to import the module in our app.js file and use it like other middlewares.


var cookieParser = require('cookie-parser');
app.use(cookieParser());

// Let’s say we have a user and we want to add that user data in the cookie then we have to add that 
//cookie to the response using the following code :

res.cookie(name_of_cookie, value_of_cookie);
// This can be explained by the following example :

let express = require('express'); 
let cookieParser = require('cookie-parser'); 
//setup express app 
let app = express() 
  
app.use(cookieParser()); 
  
  
//basic route for homepage 
app.get('/', (req, res)=>{ 
res.send('welcome to express app'); 
}); 
  
//JSON object to be added to cookie 
let users = { 
name : "Ritik", 
Age : "18"
} 
  
//Route for adding cookie 
app.get('/setuser', (req, res)=>{ 
res.cookie("userData", users); 
res.send('user data added to cookie'); 
}); 
  
//Iterate users data from cookie 
app.get('/getuser', (req, res)=>{ 
//shows all the cookies 
// cookie jah volta automaticamente pro server
res.send(req.cookies); 
}); 
  
//server listens to port 3000 
app.listen(3000, (err)=>{ 
if(err) 
throw err; 
console.log('listening on port 3000'); 
}); 


// Now if we again make a request to localhost:3000/getuser as this route is iterating user data from cookies 
//using req.cookies so output will be as follows :

// If we have multiple objects pushed in cookies then we can access specific cookie using req.cookie.cookie_name .

// Adding Cookie with expiration Time
// We can add a cookie with some expiration time i.e. after that time cookies will be destroyed automatically. 
//For this, we need to pass an extra property to the res.cookie object while setting the cookies.
// It can be done by using any of the two ways :


//Expires after 400000 ms from the time it is set.
res.cookie(cookie_name, 'value', {expire: 400000 + Date.now()});


//It also expires after 400000 ms from the time it is set.
res.cookie(cookie_name, 'value', {maxAge: 360000});

Destroy the cookies :
// We can destroy cookies using following code :

res.clearCookie(cookieName);
// Now let us make a logout route which will destroy user data from the cookie. Now our app.js looks like :

let express = require('express'); 
let cookieParser = require('cookie-parser'); 
//setup express app 
let app = express() 
  
app.use(cookieParser()); 
  
  
//basic route for homepage 
app.get('/', (req, res)=>{ 
res.send('welcome to express app'); 
}); 
  
//JSON object to be added to cookie 
let users = { 
name : "Ritik", 
Age : "18"
} 
  
//Route for adding cookie 
app.get('/setuser', (req, res)=>{ 
res.cookie("userData", users); 
res.send('user data added to cookie'); 
}); 
  
//Iterate users data from cookie 
app.get('/getuser', (req, res)=>{ 
//shows all the cookies 
// cookie jah volta automaticamente pro server
res.send(req.cookies); 
}); 
  
//Route for destroying cookie 
app.get('/logout', (req, res)=>{ 
//it will clear the userData cookie 
res.clearCookie('userData'); 
res.send('user logout successfully'); 
}); 
  
  
//server listens to port 3000 
app.listen(3000, (err)=>{ 
if(err) 
throw err; 
console.log('listening on port 3000'); 
}); 
