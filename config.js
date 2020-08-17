//Important: Set the env to either development or production to use the appropriate config
/****************************************/
const env = "development"; // 'development' or 'production'
/*******************************************/

let appRoot = require("app-root-path");
const { format } = require("winston");
//const { combine, timestamp, printf } = format;
const timestampFormat = 'YYYY-MM-DD HH:mm:ss.SSS';

//All Configurations
const development = { 
  projectId: 'idbibankwhatsapp-v9wc',
  sessionIdTimeoutInMinutes: '20',
  port:'3000',
  jsonKey:{
    privateKey: '-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQCrKwQ0WsVaeAmE\n1XzmrK3yIFpI3WmUnTU50JXd76JL9SaPt8+6YIum66SHwlYJ6bjCOXWLbWC8MNvW\nmJvYZ/GM6z9229cFe4VK1tDoeAKx7eu36+br7xmZ7seK2Yu+UNfUevRgC50FF6ps\nKKbAnfJ5A/w4AAt6jXlpwJwzYNTfsJiJekRk0IPyPCfHJxbKeHWDE2s9xDEV1o+W\n6wpuCY8Xu1TTp0As3L/+mVDsrsFYoJ+e52d1ymVbxScTTSo4rM2Z6l8XtSiKjxs8\nh9+hFXO4KKeZI8hiiRnRHT/uLrD5Nt8njzNx2sbmWSzZdF6rTx7UgWuhLf6ie9A8\n4F4bHF3tAgMBAAECggEAAYrnbsQydKBhLVeFPxMnbB/y+kVaPYwk9F2VLpUgo3wv\n2AKOFI3t7jBFGBiP9M1BI4+vi6g+bH0KWx56rAoE0GdqtTb3h1RUj6UYBxFusapb\nAMq9uBRQz1IBfUSgs9nfzlFOwcMdMQtOtMXFsjr1sn2kxhKMB++lZ/EhY2hjkSR2\nvcTU4DaM4Hbw2uEydFCHHwxdwDEo10QfGySqxVljVQQpnlaicoN8jwZMHkC9W5p5\nFnz1PbDifSiJVSSx7Kgi1M+9cb0ggFs9ZyIy3mgr5KxvvP/fyFZJAAr7oi9X1wqy\nBAu6nd2OhiHqdzEfcbZ9KdiL+TfJVNVLhM/F0JPjGQKBgQDrZwvsBpYPSwPDOAM4\nuVGJdaZPReipUvbLCIx5lJPhnZp79wWF0tEYYSkGj4dT6aMgJnp6q3FnjJ0L8WAU\ndy3+vL8TP6/FWYRPlZJHHqFyJSyQtz3uvKRfzfI5B7IEwieR9eiIRxMOvuF7Ywd3\nSPyMlqkiuVKtiKDBdB1aENYcJQKBgQC6JSJrErm+Ir7/Eetw6grOkmRtjfTEm9nR\n9LX5lzxMhSB7IGyPbNH9TxwiKaMFc3eeKnPHKPbQZHtF7zKm/9Gd4wUakA/BUtl/\nM4shRN/3V8gputyRxnVdgDDx5IQtfC6F37DPWBO32v4FIS6tXcQKvAxU/OMTWpuy\ngd00nXWsKQKBgHhINBhLGTwBOY/zu/ms/5O8UNlqwEJcyQvfd1/cYl/DFx/GjcTe\nfsb1RnA6wIxI8nhIEQdDOPQPLmPe1xg9+XuTWBLu1NKDNg8wPwkmBpp7kjTz3Kpz\nK45kfiNT4kt6JZv4SfPwVTWQpUhVxofV/G2dwhijFzLigDm5KhJOTgkdAoGABlen\nkZBkxca3TUeWBxXiYmF4jIcOtPg+drnozWVKx6yti6RyLnzdtszQP5W9mTzy8W+u\n3DVYG4eg76QTzL7grImErgAEmWiyQnRGJE8NdocGKe3VAB6L9zCb+lH38vjNOQCD\nLL1qhpQunYwg5AVS3a7EmMy5C/rFXVKxb86BqOkCgYBN35OhaK74Xl8+0mXniu77\njDygjYPDn2VRyNb8ctj+gU3gA7/t7LUxZEP7ApRp6IxZsBQdRUulOVIKXsNrXOgZ\nPIR4iuMWGqJ1n8HtIYQQtnhNlTfyEEQJP0LC3RqNGm6nO6zyQRpmWmlkKX+F8Url\n674DSs18UUwejuf4fkgp4g==\n-----END PRIVATE KEY-----\n',
    clientEmail: 'dialogflow-qrjgan@idbibankwhatsapp-v9wc.iam.gserviceaccount.com'
  },
  viber:{
    webhookUrl : 'https://agile-garden-38620.herokuapp.com',
    botName : 'agcvibertestbot',
    botAvatarLink : 'https://www.ebl.com.bd/download/DIA_logo.jpg',
    viberToken : '4b320043b2e7dd8e-fa7fbafbc56f4bb8-97951eefae8e3f08'
  },
  logs: {
    file: {
      level: 'debug',
      filename: `C:/AGC/IDBI-Whatsapp-Connector/Logs/%DATE%-trace.log`,
      datePattern: "YYYY-MM-DD",
      zippedArchive: false,
      maxSize: '10m',
      maxFiles: '30',
      format: format.combine(
          format.timestamp({format: timestampFormat}),
          format.printf(
              info => `${info.timestamp} [${info.logId}] ${info.level}: ${info.message}`
          )
      ),
    },
    console: {
      level: 'info',
      datePattern: "YYYY-MM-DD",
      format: format.combine(
        format.colorize(),
        format.timestamp({format: timestampFormat}),
        format.printf(
        info => `${info.timestamp} [${info.logId}] ${info.level}: ${info.message}`
        )
      ),
    },
    morgan: {
      format: ":method :url :status :res[content-length] - :response-time ms"
    }
  }
};

const production = {
    logs: {
      file: {
        level: 'debug',
        filename: `C:/Users/satish.gunjal/Google Drive/Projects/ChatBOT/EBL-Dia/1-Source-Code/Logs/EBL-DIA-Viber-Connector/%DATE%-trace.log`,
        datePattern: "YYYY-MM-DD",
        zippedArchive: false,
        maxSize: '10m',
        maxFiles: '30',
        format: format.combine(
            format.timestamp({format: timestampFormat}),
            format.printf(
                info => `${info.timestamp} [${info.logId}] ${info.level}: ${info.message}`
            )
        ),
      },
      console: {
        level: 'info',
        datePattern: "YYYY-MM-DD",
        format: format.combine(
          format.colorize(),
          format.timestamp({format: timestampFormat}),
          format.printf(
          info => `${info.timestamp} [${info.logId}] ${info.level}: ${info.message}`
          )
        ),
      },
      morgan: {
        format: ":method :url :status :res[content-length] - :response-time ms"
      }
    }
  };

const config = {
  development,
  production
};

module.exports = config[env];
