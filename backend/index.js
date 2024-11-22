const express = require('express');
const http = require('http');


const app = express();
const server = http.createServer(app);


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const cors = require('cors');
app.use(cors());

const path = require('path');
app.set('view engine', 'ejs');
app.set('views', path.resolve('./views'));

const connectDB = require('./config/database.js');
connectDB();

const {articleRouter} = require("./Routes/articles.js")
const {postRouter} = require("./Routes/post.js")
const userRoute = require('./Routes/user.js');
const { checkForAuthentication } = require('./middlewares/auth.js');

const cookieParser = require('cookie-parser')
app.use(cookieParser())

const paymentRouter = require("./Routes/payment.js")
app.use("/payment", paymentRouter)

// app.use(checkForAuthentication())






const PORT = 9001;

app.use("/articles", articleRouter)
app.use('/', userRoute);
app.use("/post", postRouter)


server.listen(PORT, () => {
  console.log(`Listening at http://localhost:${PORT}`);
});


// Here you can add WebSocket functionality using the 'io' object

