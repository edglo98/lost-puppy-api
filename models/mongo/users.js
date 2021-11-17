import pkg from 'mongoose'
const { Schema, model } = pkg

const UserSchema = Schema({

  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  // password: {
  //   type: String,
  //   required: true
  // },
  picturePath: {
    type: String
  },
  isGoogleSignIn: {
    type: Boolean,
    required: true
  }

})

// UserSchema.method('toJSON', function () {
//   const { __v, _id, password, ...object } = this.toObject()
//   object.uid = _id
//   return object
// })

export default model('User', UserSchema)
