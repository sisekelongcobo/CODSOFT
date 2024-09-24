import process from 'process';
import app from './app.js';
const PORT = process.env.MYSQL_PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server listening on port http://localhost:${PORT}`);
});