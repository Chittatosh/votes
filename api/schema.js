import mongoose from 'mongoose';

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MLAB_URI, { useMongoClient: true });
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));

const dataPointsSchema = mongoose.Schema({
  label: {
    type: String,
    required: true,
    maxlength: [20, 'Label too long.']
  },
  value: {
    type: Number,
    required: true,
    min: [0, 'Negative value.']
  }
});

const pollSchema = mongoose.Schema({
  title: {
    type: String,
    trim: true,
    lowercase: true,
    index: true,
    unique: true,
    required: true,
    maxlength: [100, 'Title too long.']
  }, 
  dataPoints: [dataPointsSchema]
});

export default mongoose.model("Poll", pollSchema);