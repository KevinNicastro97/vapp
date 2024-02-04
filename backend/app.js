const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;
const mongoose = require('mongoose')


mongoose.connect('mongodb://127.0.0.1:27017/vapp')
.then(console.log('MongoDB conectado'))
.catch(e => console.error('MongoDB No conectado: ' + e))



app.use(express.urlencoded({ extended: false }))
app.use(express.json())



const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const User = mongoose.model('User', userSchema);

app.post('/api/register', async (req, res) => {
  try {
    const newUser = new User(req.body);
    await newUser.save();
    res.status(201).json({ message: 'Usuario registrado con éxito' });
  } catch (error) {
    console.error('Error al registrar usuario', error);
    res.status(500).json({ message: 'Error al registrar usuario' });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor Express en el puerto ${PORT}`);
});