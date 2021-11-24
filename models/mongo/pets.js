import pkg from 'mongoose'
const { Schema, model } = pkg

const PetSchema = Schema({

  name: {
    type: String,
    required: true
  },
  gender: {
    type: String,
    required: true
  },
  age: {
    type: Number
  },
  breed: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  profileImg: {
    type: String,
    required: true
  },
  objIMG: {
    type: Object
  },
  date: {
    type: Date
  },
  isLost: {
    type: Boolean
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  isDeleted: {
    type: Boolean
  }
})

// PetSchema.method('toJSON', function () {
//   const { __v, _id, password, ...object } = this.toObject()
//   object.uid = _id
//   return object
// })

export default model('Pet', PetSchema)
