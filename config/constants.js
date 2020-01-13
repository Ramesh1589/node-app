const constants = {
  actions: [{
    action_id: 1,
    action_name: 'Create'
  },
  {
    action_id: 2,
    action_name: 'Update'
  },
  {
    action_id: 3,
    action_name: 'View'
  },
  {
    action_id: 4,
    action_name: 'Active / Deactive'
  }
  ],
  languageCode: {
    hindi: 'hi',
    english: 'en'
  },
  areaInfoEn: {
    1: ['Gold', 'Silver'],
    2: ['Chicken', 'Mutton'],
    3: ['Lowest', 'Highest'],
    4: ['City', 'Pollution', 'Air quality'],
    6: ['Tomato', 'Shimla Mirch', 'Onion', 'Cucumber', 'Potato', 'Brinjal', 'Ladies Finger', 'Carrot', 'Cabbage', 'Radish', 'Spinach', 'Taro', 'Ginger', 'Gourd', 'Ridge Gourd', 'Turnip', 'Papaya', 'Sep', 'Pumpkin', 'Lemon', 'Coriander leaves'],
    9: ['Petrol', 'Diesel']
  },
  areaInfoHi: {
    1: ['सोना', 'चांदी'],
    2: ['मुर्गी', 'भेड़े का मांस'],
    3: ['सबसे कम', 'उच्चतम'],
    4: ['शहर', 'प्रदुषण', 'हवा की गुणव्रता'],
    6: ['टमाटर', 'शिमला मिर्च', 'प्याज', 'खीरा', 'आलू', 'बैंगन', 'भिन्डी', 'गाजर', 'गोभी', 'मूली', 'पालक', 'अरबी', 'अदरक', 'लौकी', 'तुरई', 'शलजम', 'पपीता', 'Sep', 'कद्दू', 'नींबू', 'हरी धनिया'],
    9: ['पेट्रोल', 'डीज़ल']
  },
  audio: {
    url: 'http://ivrapi.indiantts.co.in/tts?type=indiantts',
    api_key: '2489d5e0-f0c4-11e9-b80d-676b5575a9de',
    user_id: 65744,
    params: 'action=play&numeric=hcurrency&audioformat=mp3',
    lang_hi: 'hi_mohita',
    lang_en: 'en_mohita'
  },
  mailid: {
    feedback: 'debadatta1903@gmail.com'
  },
  pagination: {
    page: 1,
    limit: 10
  },
  priority: {
    1: 'Very High Priority',
    2: 'High Priority',
    3: 'Medium Priority',
    4: 'Low priority'
  },
  aws_url: 'https://nvdev01.s3.ap-south-1.amazonaws.com/'
}

module.exports = constants
