const { Schema, model } = require('mongoose')

const VoyageSchema = new Schema(
  {
    depart: { type: Schema.Types.ObjectId, ref: 'Station' },
    arrive: { type: Schema.Types.ObjectId, ref: 'Station' },
    heureDepart: String, // "07:30"
    heureArrive: String, // "08:30"
    transport: { type: String, enum: ['taxi', 'bus', 'train'] },
    price: Number
  },
  {
    versionKey: false,
    timestamps: {
      createdAt: 'createdAt'
    }
  }
)

model('Voyage', VoyageSchema)
