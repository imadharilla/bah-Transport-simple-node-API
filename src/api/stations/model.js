const { Schema, model } = require('mongoose')

const StationSchema = new Schema(
  {
    nom: String
  },
  {
    versionKey: false,
    timestamps: {
      createdAt: 'createdAt'
    }
  }
)

model('Station', StationSchema)
