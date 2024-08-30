const app = require('./App');

app.listen(process.env.PORT, ()=>{
  console.log(`listening on port ${process.env.PORT}`);
});