if (process.env.NODE_ENV !== 'production') require('dotenv').config();

const { Storage } = require('@google-cloud/storage');
const CLOUD_BUCKET = process.env.CLOUD_BUCKET_NAME;

const storage = new Storage({
  projectId: process.env.PROJECT_ID,
  keyFilename: process.env.KEY_PATH
})

const bucket = storage.bucket(CLOUD_BUCKET);
const getPublicUrl = (filename) => {
  return `https://storage.googleapis.com/${CLOUD_BUCKET}/${filename}`;
}

const uploadFileToGCS = (req, res, next) => {
	console.log(req.file, '<<< reqfile');
  if (!req.file) {
		// req.body.image_url = '';		
    next()
  } else {
		const gcsname = Date.now() + req.file.originalname.split(' ').join('');
		const file = bucket.file(gcsname);

		const stream = file.createWriteStream({
			metadata: {
				contentType: req.file.mimetype
			},
			resumable: false
		})

		stream.on('error', (err) => {
			req.file.cloudStorageError = err;
			next(err);
		})

		stream.on('finish', () => {
			req.file.cloudStorageObject = gcsname;
			file.makePublic().then(() => {
				req.file.cloudStoragePublicUrl = getPublicUrl(gcsname);
				req.body.image_url = getPublicUrl(gcsname);				
				next();
			});
			console.log(req.file);
		})

		stream.end(req.file.buffer);
  }
}

const deleteFileFromGCS = (url) => {
  if (!url) return;

  let filename = url.split('/').pop();

	console.log(filename);
  try {
    storage
			.bucket(CLOUD_BUCKET)
      .file(filename)
      .delete()
  }
  catch (err) {
    throw new Error(err);
  }
}

module.exports = { uploadFileToGCS, deleteFileFromGCS };