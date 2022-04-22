const mongoose = require('mongoose');

const Userschema = mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
  //  confirmpassword: {
    //    type: String,
      //  required: true
    //}
})

Userschema.virtual('id').get(function () {
    return this._id.toHexString();
});

Userschema.set('toJSON', {
    virtuals: true,
});



module.exports = mongoose.model('user',Userschema);