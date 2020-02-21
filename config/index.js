const convict = require('convict')
const path = require('path')

const config = convict({
  env: {
    doc: 'The applicaton environment.',
    format: ['production', 'development'],
    default: 'development',
    env: 'NODE_ENV',
    arg: 'env'
  },
  db: {
    mysql: {
      host: {
        doc: 'Holds the SQL Server Host',
        format: String,
        default: 'localhost'
      },
      port: {
        doc: 'Holds the SQL Server Port',
        format: Number,
        default: 3306
      },
      username: {
        doc: 'Holds the SQL Server Username',
        format: String,
        default: 'root'
      },
      password: {
        doc: 'Holds the SQL Server Password',
        format: String,
        default: ''
      },
      database: {
        doc: 'Holds the Database In SQL Server',
        format: String,
        default: 'demo'
      },
      dialect: {
        doc: 'Holds the Dialect Details That we are using for the Connection',
        format: String,
        default: 'mysql'
      },
      logging: {
        doc: 'Whether Logging is Enabled or not',
        format: Boolean,
        default: false
      },
      define: {
        underscored: {
          doc: 'underscored',
          format: Boolean,
          default: true
        },
        freezeTableName: {
          doc: 'freezeTableName',
          format: Boolean,
          default: true
        },
        syncOnAssociation: {
          doc: 'syncOnAssociation',
          format: Boolean,
          default: true
        },
        charset: {
          doc: 'charset',
          format: String,
          default: 'utf8mb4'
        },
        collate: {
          doc: 'charset',
          format: String,
          default: 'utf8mb4_unicode_ci'
        }
      },
      dialectOptions: {
        multipleStatements: {
          doc: 'Whether to allow Multiple SQL Statements or not',
          format: Boolean,
          default: true
        }
      },
      sync: {
        force: {
          doc: 'sync',
          format: Boolean,
          default: true
        }
      },
      syncOnAssociation: {
        doc: 'syncOnAssociation',
        format: Boolean,
        default: true
      },
      pool: {
        max: {
          doc: 'Holds the Maximum SQL Pool Size',
          format: Number,
          default: 10
        },
        min: {
          doc: 'Holds the Minimum SQL Pool Size',
          format: Number,
          default: 0
        },
        idle: {
          doc: 'Holds the Idle Time for SQL To Reset the Connection.',
          format: Number,
          default: 30000
        },
        acquire: {
          doc: 'Holds the Value for the time to Acquire the SQL Connection.',
          format: Number,
          default: 60000
        }
      }
    },
    mongodb: {
      server: {
        doc: 'Holds the Mongo Server Host',
        format: String,
        default: 'localhost'
      },
      port: {
        doc: 'Holds the Mongo Server Port',
        format: Number,
        default: 27017
      },
      user: {
        doc: 'Holds the Mongo Server Username',
        format: String,
        default: ''
      },
      password: {
        doc: 'Holds the Mongo  DB Server Password',
        format: String,
        default: ''
      },
      database: {
        doc: 'Holds the Database In Mongo Server',
        format: String,
        default: 'demo'
      },
      options: {
        useUnifiedTopology: {
          doc: 'Whether Logging is Enabled or not',
          format: Boolean,
          default: true
        },
        useNewUrlParser: {
          doc: 'Whether Logging is Enabled or not',
          format: Boolean,
          default: true
        },
        useCreateIndex: {
          doc: 'Whether Logging is Enabled or not',
          format: Boolean,
          default: true
        },
        autoReconnect: {
          doc: 'Moong DB Aujto recconnect topology',
          format: Boolean,
          default: true
        },
        keepAlive: {
          doc: 'Keep live',
          format: Boolean,
          default: true
        },
        reconnectTries: {
          doc: 'Mongo DB Reconnect Ttries',
          format: Number,
          default: 100
        },
        reconnectInterval: {
          doc: 'Mongodb recconnect intervals',
          format: Number,
          default: 1000
        },
        connectTimeoutMS: {
          doc: 'MOngoDB Connection Timeout in millisecods',
          format: Number,
          default: 300000
        },
        socketTimeoutMS: {
          doc: 'Mongo DB Socket Timeout in Milisecods',
          format: Number,
          default: 300000
        },
      },
    }
  },
  logger: {
    httpLogFormat: {
      doc: 'Holds the http Log Format',
      format: String,
      default: ':remote-addr - :remote-user [:date] ":method :url HTTP/:http-version" :status :res[content-length] | :response-time ms ":referrer" ":user-agent"'
    },
    httpLogFileName: {
      doc: 'Holds the httpLogFileName',
      format: String,
      default: 'http.log'
    },
    logFileName: {
      doc: 'Holds the logFileName',
      format: String,
      default: 'info.log'
    },
    exceptionLogFileName: {
      doc: 'Holds the exceptionLogFileName',
      format: String,
      default: 'exceptions.log'
    },
    logFileSize: {
      doc: 'Holds the logFileSize',
      format: Number,
      default: 5242880
    },
    path: {
      doc: 'Holds the path',
      format: String,
      default: './logs/'
    }
  },
  jwt: {
    secretKey: {
      doc: 'secretKey',
      format: String,
      default: process.env.JWT_SECRET_KEY
    },
    expiresInMin: {
      doc: 'expiresInMin',
      format: Number,
      default: 600
    }
  },
  encryption: {
    mode: {
      doc: 'mode',
      format: String,
      default: 'aes-256-ecb'
    },
    secretKey: {
      doc: 'secretKey',
      format: String,
      default: process.env.ENCRYPT_SECRET_KEY
    },
    salt: {
      doc: 'salt',
      format: String,
      default: process.env.ENCRYPT_SALT
    },
    publicSecretKey: {
      doc: 'Public secretKey',
      format: String,
      default: process.env.ENCRYPT_PUBLIC_SECRET_KEY
    }
  },
  FRONTEND_URL: {
    doc: 'FRONTEND_URL',
    format: String,
    default: ''
  },
  SMTP: {
    MAIL_HOST: {
      doc: 'smtp mail host',
      format: String,
      default: 'smtp.gmail.com'
    },
    MAIL_PORT: {
      doc: 'smtp mail port',
      format: Number,
      default: 465
    },
    MAIL_USER: {
      doc: 'smtp mail user name',
      format: String,
      default: process.env.SMTP_MAIL_USER
    },
    MAIL_PASS: {
      doc: 'smtp mail password',
      format: String,
      default: process.env.SMTP_MAIL_PASS
    },
    FROM_NAME: {
      doc: 'smtp mail from name',
      format: String,
      default: 'News Video'
    },
    FROM_ADDRESS: {
      doc: 'smtp mail from address',
      format: String,
      default: ''
    }
  },
  aws: {
    params: {
      accessKeyId: {
        doc: 'accessKeyId',
        format: String,
        default: process.env.AWS_ACCESS_KEY
      },
      secretAccessKey: {
        doc: 'secretAccessKey',
        format: String,
        default: process.env.AWS_SECRET_ACCESS_KEY
      },
      region: {
        doc: 'region',
        format: String,
        default: process.env.AWS_REGION
      }
    },
    s3: {
      bucketName: {
        doc: 'bucket name',
        format: String,
        default: ''
      }
    },
    sns: {
      arn: {
        globalTopic: {
          doc: 'All Platform ARN',
          format: String,
          default: ''
        },
        android: {
          doc: 'Android App Platform ARN',
          format: String,
          default: ''
        },
        ios: {
          doc: 'IOS App Platform ARN',
          format: String,
          default: ''
        }
      },
      sms_region: {
        doc: 'region',
        format: String,
        default: process.env.AWS_SMS_REGION
      }
    }
  }
})

config.loadFile(path.join(__dirname, '/config-' + config.get('env') + '.json'))

// validate
config.validate()

module.exports = config
