const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const sequelize = require('./config/database');
const otpRoutes = require('./routes/otpRoutes');

dotenv.config();

const app = express();
app.use(bodyParser.json());
app.use('/api/otp', otpRoutes);

const startServer = async () => {
  try {
    await sequelize.sync({force:true}); // Sync database models
    app.listen(process.env.PORT, () => {
      console.log(`Server running on port ${process.env.PORT}`);
    });
  } catch (error) {
    console.error('Database connection failed:', error);
  }
};

startServer();
