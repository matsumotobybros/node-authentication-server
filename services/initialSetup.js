const axiosBase = require('axios');
const User = require('../models/user');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:auth/auth', { useNewUrlParser: true });
const axios = axiosBase.create({
  baseURL: 'https://api.opendota.com/', // バックエンドB のURL:port を指定する
  headers: {
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest'
  },
  responseType: 'json'
});


axios.get('api/heroStats')
  .then(function(res) {
    storeUsers(res.data);
   })
  .catch(function(error) {
    console.log('ERROR!! occurred in Backend.')
  });
var i = 0;
var userCollection = [];
function storeUsers(data) {
  data.forEach(function(item) {
    if(i === 50) {
      return;
    }
    i++
    const user = new User({
      account: 'Uzabase',
      id: item._id,
      localized_name: item.localized_name,
      password: item.name,
      pass_second: item.name,
      icon: 'https://api.opendota.com'+item.icon,
      type: item.attack_type,
      age: item.base_agi,
      introduction: 'test test test test',
      from : 'us'
    });
    userCollection.push(user);
  });
  userCollection.forEach(function(user) {
    user.save(function(err, response) {
      if (err) { return console.log(err) }
    })
  })
}