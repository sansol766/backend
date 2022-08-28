const winston = require('winston');
const { createLogger, format, transports, log , addColors } = require('winston');
const { combine, timestamp, label, prettyPrint } = format;
const DailyRotateFile = require('winston-daily-rotate-file');
var datetime = require('node-datetime');
var dt = datetime.create();
module.exports.formattedDate = dt.format('Y/m/d H:M:S');
var fileName = dt.format('Y-m-d');

addColors({
    info: 'bold red', 
    warn: 'bold greenBG',
    error: 'bold blue',
    debug: 'bold green',
  });

  const transport = new DailyRotateFile({
    filename: "logs/application-%DATE%.log",
    datePattern: "YYYY-MM-DD-MM",
    zippedArchive: true,
    maxSize: "20m",
    maxFiles: "14d",
    prepend: true
   });


   transport.on("rotate", function (oldFilename, newFilename) {
    // call function like upload to s3 or on cloud
    });

     const winlogger = createLogger({
      level : "info",
        transports: [
          transport,
          new winston.transports.Console(),
          new winston.transports.File({ filename: `logs/${fileName}.log`  })
        ],
        format: combine(
          format.printf(
            info => `${info.message}`
        ),
          format.colorize({
            all:true
          })
        ),  
      });

      module.exports = winlogger;
