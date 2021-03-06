import pkg from 'mongoose'
const { Schema, model } = pkg

const Report = Schema({
  description: {
    type: String,
    required: true
  },
  pet: {
    type: Schema.Types.ObjectId,
    ref: 'Pet'
  },
  isCheked: {
    type: Boolean,
    default: false
  },
  date: {
    type: Date,
    required: true
  },
  from: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  to: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
})

export default model('Report', Report)
