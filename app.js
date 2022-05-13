import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
import path from 'path';
import cors from 'cors';

import serverRoutes from './routes/routes.js';
import authRouter from './routes/authRouter.js';
import controlRegistration from './app_modules/control-registration.js';

const __dirname = path.resolve();
const app = express();

// app.enable('strict routing');
app.use(express.json({ limit: '25mb' }));
// app.use(express.urlencoded({ extended: false }));
app.use(express.urlencoded({ limit: '25mb' }));
app.use(express.static(path.resolve(__dirname, 'static/')));
app.use(cors());
// app.use(multer({ dest: 'uploads' }).single('filedata'));
// CORS;
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});

app.use(serverRoutes);
app.use('/auth', authRouter);

//опрос неактивированных аккаунтов
const millisecondsInFourHours = 1440000;
setTimeout(() => {
  controlRegistration();
}, millisecondsInFourHours);

const start = async () => {
  try {
    await mongoose
      .connect(process.env.MONGODB)
      .then(() => console.log('Connected to Mongo..'))
      .catch((error) => console.log(error));

    app.listen(process.env.PORT, () => {
      console.log(`Server run on port ${process.env.PORT}...`);
    });
  } catch (error) {
    console.log(error);
  }
};
start();
