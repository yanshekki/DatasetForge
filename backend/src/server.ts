import app from './app';

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`\uD83D\uDE80 DatasetForge Backend running on port ${PORT}`);
  console.log(`\uD83D\uDCCD Environment: ${process.env.NODE_ENV || 'development'}`);
});