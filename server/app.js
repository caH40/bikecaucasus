import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
import path from 'path';

import serverRoutes from './routes/routes.js';

try {
  mongoose
    .connect(process.env.MONGODB)
    .then(() => console.log('Connected to Mongo..'))
    .catch((error) => console.log(error));
} catch (error) {
  console.log(error);
}

const __dirname = path.resolve();
const app = express();

app.use(express.json({ limit: '25mb' }));
app.use(express.urlencoded({ extended: false }));
// app.use(express.urlencoded({ limit: '25mb' }));
app.use(express.static(path.resolve(__dirname, '../web')));
// CORS;
// app.use(function (req, res, next) {
//   res.header('Access-Control-Allow-Origin', '*');
//   res.header(
//     'Access-Control-Allow-Headers',
//     'Origin, X-Requested-With, Content-Type, Accept'
//   );
//   next();
// });

app.use(serverRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server run on port ${process.env.PORT}...`);
});
