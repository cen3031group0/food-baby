var eventSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  address: String,
  building: String,
  room: String,
  time: Date,
  host: String,
  dietary_prefs: String,
  created_at: Date,
  updated_at: Date
});
