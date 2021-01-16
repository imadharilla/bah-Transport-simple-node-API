const { Schema, model } = require('mongoose')

const UserSchema = new Schema(
  {
    age: Number,
    transport: { type: String, enum: ['taxi', 'bus', 'train'] },
    handicap: Boolean
  },
  {
    versionKey: false,
    timestamps: {
      createdAt: 'createdAt'
    }
  }
)

model('User', UserSchema)
