import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import helmet from 'helmet';
import morgan from 'morgan';
import kpiRoutes from './routes/kpi.js';
import KPI from './models/kpi.js';
import {kpis, products, transactions} from './data/data.js';
import productRoutes from './routes/product.js';
import Product from './models/Product.js';
import transactionRoutes from './routes/transaction.js';
import Transaction from './models/Transaction.js';

/* CONFIGURATION */
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }));
app.use(morgan('common'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

console.log("Hello World");

/*ROUTES*/
app.use('/kpi', kpiRoutes);
app.use('/product', productRoutes)
app.use('/transaction', transactionRoutes);

/* MONGOOSE SETUP */
const PORT = process.env.PORT || 9000;
mongoose.connect(process.env.MONGODB_URI).then(async() => {
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`));
    // await mongoose.connection.db.dropDatabase();
    // await KPI.insertMany(kpis);
    // Product.insertMany(products);
    // Transaction.insertMany(transactions);
}).catch((error) => console.log(`${error} did not connect`));