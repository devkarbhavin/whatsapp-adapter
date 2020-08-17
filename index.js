// import express from 'express';
// import v1Routes from '../routers/route';
const route=require('./routes/route')
const express=require('express')

//const app = express();
let fs = require('fs');
let path = require('path')
const https_options = {
  key: fs.readFileSync(path.join(__dirname, 'ssl_cert/agcdaindia_pvt.key')),
    cert: fs.readFileSync(path.join(__dirname, 'ssl_cert/agcdaindia_com.crt')),
    ca: [
      fs.readFileSync(path.join(__dirname, 'ssl_cert/AAACertificateServices.crt')),
      fs.readFileSync(path.join(__dirname, 'ssl_cert/USERTrustRSAAAACA.crt')),
      // fs.readFileSync(path.join(__dirname, 'ssl_cert/CA_bundle.crt')),
      // fs.readFileSync(path.join(__dirname, 'ssl_cert/SectigoRSADomainValidationSecureServerCA.crt'))
    ]
}; // Trusted SSL certification (not self-signed).
let app = express() , server = require('https').createServer(https_options, app);

const { PORT = 3000 } = process.env;

// app.use(cors());

app.use(
  express.urlencoded({
    extended: false
  })
);

// app.use(express.json());
//app.use(v1Routes);

app.use('/', route);
// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    errors: {
      message: err.message
    }
  });
});

app.listen(PORT, () => console.log(`App Listening on port ${PORT}`));

// export default app;