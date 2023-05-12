import { config as dotenvConfig } from 'dotenv';
import setupErrorHandlers from './error/setupErrorHandlers';
import { app } from './app';

dotenvConfig();
setupErrorHandlers();

const PORT = process.env.PORT || 3333;

app.listen(PORT, () => {
  console.log(`app is listening on port ${PORT}`);
});
