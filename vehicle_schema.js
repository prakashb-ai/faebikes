const mongoose = require('mongoose');
const { required } = require('nodemon/lib/config');
const Vehicle = mongoose.Schema({
 registration_number: {
   type: String,
   required: true,
 },
 name:{
   type: String,
   required: true
 },
 model:{
   type: String,
  default: '',
 },
 description: {
   type: String,
   required: true
 },
 price: {
   type: String,
   default: 0,
 },
 logo: {
     type: String,
 }

      

})


Vehicle.virtual('id').get(function () {
  return this._id.toHexString();
});

Vehicle.set('toJSON', {
  virtuals: true,
});


module.exports = mongoose.model('vehicle',Vehicle);