const express = require('express');
const cors = require('cors');
const app = express();

const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get('/', (req,res) => {
  res.send('simple crud server running')
})

app.listen(port, () => {
    console.log(`simple crud server running ${port}`)
})