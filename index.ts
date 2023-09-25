import app from './src/app';
import dotenv from 'dotenv';
import './src/database';

dotenv.config();

const { PORT } = process.env;
const port = PORT || 3000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
