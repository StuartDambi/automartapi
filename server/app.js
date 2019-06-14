import express from 'express';
import config from 'config';
import carRoute from './routes/carRoute';
import userRoute from './routes/userRoute';
import authRoute from './routes/authRoute';

const app = express();
app.use(express.json());
app.use('/api/v1/cars', carRoute);
app.use('/api/v1/uath', userRoute);
app.use('/api/v1/auth/signip', authRoute);

// configs
console.log(`Application name: ${config.get('name')}`);
// The server port
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`AutomartAPi listening to port ${port}...`));
