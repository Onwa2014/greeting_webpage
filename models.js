var mongoose = require('mongoose');

var User = mongoose.model('Users', { name: String, count: Number });

module.exports = function(mongoURL){

  mongoose.connect(mongoURL);
  
  return {
    User
  }

}
