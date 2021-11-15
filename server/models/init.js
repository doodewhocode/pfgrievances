const mongoose = require('mongoose')
const Grid = require('gridfs-stream');

mongoose.Promise = global.Promise



let gfs;
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true, useCreateIndex: true,
  useUnifiedTopology: true
})
  .then(() => {
    //gfs = Grid(mongoose.connection.db, mongoose.mongo);
    //gfs.collection('uploads');
    //gfs = new mongoose.mongo.GridFSBucket(mongoose.connection.db, { bucketName: 'uploads' });
    console.log('Successfully connected to database')
  })
  .catch(error => {
    console.error('Error connecting to MongoDB database', error)
  })


module.exports = {
  mongoose,
  gfs
}