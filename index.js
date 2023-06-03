const mongoose = require('mongoose');
mongoose.set('strictQuery', false);

const uri = 'mongodb+srv://admin:admin@cluster0.nikbntq.mongodb.net/?retryWrites=true&w=majority';

async function connectToDatabase() {
  try {
    await mongoose.connect(uri, {
      dbName: 'projekt',
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('Povezava z bazo podatkov je bila uspešno vzpostavljena!');
    // Nadaljnje operacije z bazami podatkov lahko izvedete tukaj
  } catch (error) {
    console.error('Napaka pri povezavi z bazo podatkov:', error);
  }
}

connectToDatabase();

const express = require('express');
const app = express();
const cors = require("cors");
console.log("App listen at port 5000");

app.use(express.json());

app.use(cors());
app.listen(5000);

app.get("/", (req, resp) => {
 
    resp.send("App is Working");
    // You can check backend is working or not by
    // entering http://loacalhost:5000
     
    // If you see App is working means
    // backend working properly
});

const koloSchema = new mongoose.Schema({
  serijska_stevilka: String,
  mnenje: [String]
});

const Kolo = mongoose.model('kolesa', koloSchema, 'kolesa');

const postajalisceSchema = new mongoose.Schema({
  ime: String,
  naslov: String,
  latitude: Number,
  longitude: Number,
  kolesaArray: [koloSchema]
});

const Postajalisce = mongoose.model('postajalisca', postajalisceSchema, 'postajalisca');

// klic za pridobitev vseh postajalisc iz podatkovne baze

app.get('/postajalisca', async (req, res) => {
  try {
    console.log("CALL -> get postajalisca");

    const postajalisca = await Postajalisce.find();

    res.json(postajalisca);
  } catch (error) {
    console.error('Napaka pri pridobivanju podatkov:', error.message);
    res.status(500).json({ error: 'Napaka pri pridobivanju podatkov' });
  }
});

app.get('/kolesa', async (req, res) => {
  try {
    const kolesa = await Kolo.find();

    res.json(kolesa);
  } catch (error) {
    console.error('Napaka pri pridobivanju podatkov:', error.message);
    res.status(500).json({ error: 'Napaka pri pridobivanju podatkov' });
  }
});