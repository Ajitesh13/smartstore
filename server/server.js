import express from 'express';
import path from 'path';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import userRoute from './routes/userRoute';
import productRoute from './routes/productRoute';
import orderRoute from './routes/orderRoute';
import config from './config';

const mongodburl = config.MONGODB_URL
mongoose.connect(mongodburl,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    })
    .then(console.log(`Connected to MongoDB`))
    .catch(error => {
        console.log(error.reason);
    });

const app = express();
app.use(bodyParser.json());
app.use("/api/users", userRoute);
app.use("/api/products", productRoute);
app.use("/api/orders", orderRoute);
// app.get("/api/config/paypal", (req, res) => {
//     res.send(config.PAYPAL_CLIENT_ID);
// })
app.use(express.static(path.join(__dirname, '/../client/build')));
app.get('*', (req, res) => {
    res.sendFile(path.join(`${__dirname}/../client/build/index.html`));
});



const port = 5000;
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});

