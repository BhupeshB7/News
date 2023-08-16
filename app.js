const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const fileUpload = require('express-fileupload');
const path = require('path'); // Add this line

const articleRoutes = require('./routes/articleRoutes');
const userRoutes = require('./routes/userRoute')
const admitRoutes = require('./routes/admitRoute');
const otpVerification = require('./routes/OTP')
const app = express();
const PORT = process.env.PORT || 5500;
app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));
app.use(bodyParser.json());
app.use(cors());
app.use(fileUpload());
mongoose.connect('mongodb+srv://newsWebAppI:kJIV906k0EDoz1Uh@cluster0.qrvgund.mongodb.net/', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(()=>console.log('MONGODB CONNECTED')).catch((err)=>console.log(err))
const db = mongoose.connection;
//password : kJIV906k0EDoz1Uh
db.once('open', () => {
  console.log('Connected to MongoDB');
});

app.use('/api/articles', articleRoutes);
app.use('/api', userRoutes);
app.use('/api', admitRoutes);
app.use('/api', otpVerification);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
