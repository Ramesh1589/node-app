// Load the AWS SDK for Node.js
const AWS = require('aws-sdk')
// Set access key, secret key & region
AWS.config.update({ accessKeyId: process.env.AWS_ACCESS_KEY, secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY, region: process.env.AWS_REGION })
// Initialize SNS
const SNS = new AWS.SNS()
// Initialize SES
const SES = new AWS.SES()

exports.createTopic = async (topic_name) => {
  if (!topic_name) return ''
  const data = await SNS.createTopic({ Name: topic_name }).promise()
  return data.TopicArn
}

exports.publishText = async (msg_obj, opt) => { // topic_arn, platform, endpoint_arn
  const gcm_payload = {
    GCM: JSON.stringify({
      data: {
        message: msg_obj.message,
        module: msg_obj.module,
        source_id: msg_obj.source_id
      }
    })
  }
  const apns_payload_string = JSON.stringify({
    aps: {
      alert: msg_obj.message,
      badge: 1,
      sound: 'default',
      module: msg_obj.module,
      source_id: msg_obj.source_id
    }
  })
  const apns_payload = {
    default: msg_obj.message,
    APNS: apns_payload_string,
    APNS_SANDBOX: apns_payload_string
  }
  const payload = opt.topic_arn ? { ...gcm_payload, ...apns_payload } : (opt.platform === 'ios' ? apns_payload : gcm_payload)
  const params = {
    Message: JSON.stringify(payload),
    MessageStructure: 'json'
  }
  if (opt.topic_arn) params.TopicArn = opt.topic_arn
  else if (opt.endpoint_arn) params.TargetArn = opt.endpoint_arn
  else throw new Error('Invalid request')
  const data = await SNS.publish(params).promise()
  return data
}

exports.subscribe = async (topic_arn, endpoint_arn) => {
  const params = {
    Protocol: 'application',
    TopicArn: topic_arn,
    EndPoint: endpoint_arn
  }
  const data = await SNS.subscribe(params).promise()
  return data.SubscriptionArn
}

exports.unsubscribe = async (topic_arn, token) => {
  const sub_data = await SNS.confirmSubscription({
    TopicArn: topic_arn,
    Token: token
  }).promise()
  const params = {
    SubscriptionArn: sub_data.SubscriptionArn
  }
  const data = await SNS.unsubscribe(params).promise()
  return data
}

exports.createEndpoint = async (application_arn, token) => {
  if (!application_arn || !token) return ''
  const params = {
    PlatformApplicationArn: application_arn,
    Token: token
  }
  const data = await SNS.createPlatformEndpoint(params).promise()
  return data.EndpointArn
}

exports.sendSMS = async (contactNo, subject, message) => {
  const SNS = new AWS.SNS({ region: process.env.AWS_SMS_REGION })
  SNS.setSMSAttributes({
    attributes: {
      DefaultSenderID: 'NewsVideo',
      DefaultSMSType: 'Transactional'
    }
  })
  const params = {
    Message: message,
    MessageStructure: 'string',
    PhoneNumber: contactNo,
    Subject: subject
  }
  const data = await SNS.publish(params).promise()
  return data.MessageId
}

exports.sendEmail = async (from, to_addresses, cc_addresses, subject, html) => {
  const params = {
    Source: from,
    Destination: {
      ToAddresses: to_addresses,
      CcAddresses: cc_addresses
    },
    Message: {
      Body: {
        Html: {
          Charset: 'UTF-8',
          Data: html
        }/* ,
        Text: {
          Charset: 'UTF-8',
          Data: 'TEXT_FORMAT_BODY'
        } */
      },
      Subject: {
        Charset: 'UTF-8',
        Data: subject
      }
    }
  }
  const data = await SES.sendEmail(params).promise()
  return data.MessageId
}
