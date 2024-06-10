const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const requestLanguage = require('express-request-language');
const requestIp = require('request-ip');
const auth = require("./routes/auth");
const user = require("./routes/user");
const { time } = require('console');





app.use('/images', express.static(path.join(__dirname, 'images')))



const whitelist = ['http://localhost:5500', "http://localhost:3001", "http://localhost:3000", "*"];
const corsOptions = {
  credentials: true, // This is important.
  origin: (origin, callback) => {
    if(whitelist.includes(origin))
      return callback(null, true)

      callback(new Error('Not allowed by CORS'));
  }
}



app.use(cors(corsOptions));
app.use(bodyParser.json())
app.use(cookieParser())

app.use((req, res, next) => {
  const time = new Date();
  console.log(time.getTime())
  const clientIp = requestIp.getClientIp(req); 
  console.log(`Client IP ${clientIp}`);
  const time1 = new Date();
  console.log(time1.getTime())
  next();
})


app.use(requestLanguage({
  languages: ['en-US', 'tr-TR'],
  cookie: {
    name: 'language',
    options: { maxAge: 24*3600*1000 },
  }
}));


app.get('/', (req,res) =>{
  // res.json(req.language);
  res.send("Hello")
})

app.use("/auth", auth);
app.use("/user", user);


const PORT = 5500 | process.env.PORT;
app.listen(PORT, () => {
    console.log(`Listening on ${PORT}`);
})
