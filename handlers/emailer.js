const i18n = require('i18n')
const { sendEmail } = require('./aws.sns')
const CONFIG = require('../config')
// const SQLDB = require('../db/mysql')

/**
 * Sends email
 * @param {Object} data - data
 * @param {boolean} callback - callback
 */
/* const sendEmail = async (data, callback) => {
  const auth = {
    host: CONFIG.get('SMTP.MAIL_HOST'),
    port: CONFIG.get('SMTP.MAIL_PORT'),
    secure: true,
    auth: {
      user: CONFIG.get('SMTP.MAIL_USER'),
      pass: CONFIG.get('SMTP.MAIL_PASS')
    },
    debug: true
  }
  const transporter = nodemailer.createTransport(auth)
  const mailOptions = {
    from: `${CONFIG.get('SMTP.FROM_NAME')} <${CONFIG.get('SMTP.FROM_ADDRESS')}>`,
    to: `${data.user.name} <${data.user.email}>`,
    subject: data.subject,
    html: data.htmlMessage
  }
  transporter.sendMail(mailOptions, err => {
    if (err) {
      return callback(false)
    }
    return callback(true)
  })
} */

/**
 * Prepares to send email
 * @param {string} user - user object
 * @param {string} subject - subject
 * @param {string} htmlMessage - html message
 */
const prepareToSendEmail = async (user, subject, htmlMessage) => {
  user = {
    name: user.name,
    email: user.email,
    verification: user.verification
  }
  const data = {
    user,
    subject,
    htmlMessage
  }
  // if (process.env.NODE_ENV === 'production') {
  const MessageId = await sendEmail(`${CONFIG.get('SMTP.FROM_NAME')} <${CONFIG.get('SMTP.FROM_ADDRESS')}>`, [`${data.user.name} <${data.user.email}>`], [], data.subject, data.htmlMessage)
  return MessageId
  // } else if (process.env.NODE_ENV === 'development') {
  //   console.log(data)
  // }
}

/* prepareToSendEmail({
  name: 'mohnish',
  email: 'mohnish.kataria@brainvire.com',
  verification: true
}, 'TEST DEV', '<html><body><h1>Hello  Charith</h1><p style=\'color:red\'>Sample description</p> <p>Time 1517831318946</p></body></html>') */

module.exports = {
  /**
   * Checks User model if user with an specific email exists
   * @param {string} email - user email
   */
  async emailExists (email) {
    const user_instance = await SQLDB.user.validateUser('email', email)
    return new Promise((resolve, reject) => {
      if (user_instance) return reject(new Error('EMAIL_ALREADY_EXISTS'))
      resolve(false)
    })
  },

  /**
   * Checks User model if user with anSMTP specific email exists but excluding user id
   * @param {string} id - user id
   * @param {string} email - user email
   */
  async emailExistsExcludingMyself (id, email) {
    const user_instance = await SQLDB.user.findOne({
      where: {
        id: {
          $ne: id
        },
        email
      },
      raw: true
    })
    return new Promise((resolve, reject) => {
      if (user_instance) return reject(new Error('EMAIL_ALREADY_EXISTS'))
      resolve(false)
    })
  },

  /**
   * Sends registration email
   * @param {string} locale - locale
   * @param {Object} user - user object
   */
  async sendRegistrationEmailMessage (locale, user) {
    i18n.setLocale(locale)
    const subject = i18n.__('registration.SUBJECT')
    const htmlMessage = i18n.__(
      'registration.MESSAGE',
      user.name,
      CONFIG.get('FRONTEND_URL'),
      user.verification
    )
    return prepareToSendEmail(user, subject, htmlMessage)
  },

  /**
   * Sends reset password email
   * @param {string} locale - locale
   * @param {Object} user - user object
   */
  async sendResetPasswordEmailMessage (locale, user) {
    i18n.setLocale(locale)
    const subject = i18n.__('forgotPassword.SUBJECT')
    const htmlMessage = i18n.__(
      'forgotPassword.MESSAGE',
      user.email,
      CONFIG.get('FRONTEND_URL'),
      user.verification
    )
    return prepareToSendEmail(user, subject, htmlMessage)
  },

  /**
   * Sends customer feedback email
   * @param {string} locale - locale
   */
  async customerFeedbackEmailMessage (locale) {
    i18n.setLocale(locale)
    const user = {
      name: locale.name,
      email: locale.email,
      verification: ''
    }
    const subject = i18n.__('customerFeedback.SUBJECT')
    const htmlMessage = i18n.__(
      'customerFeedback.MESSAGE',
      locale.name,
      locale.message
    )
    return prepareToSendEmail(user, subject, htmlMessage)
  }
}
