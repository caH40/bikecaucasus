import multer from 'multer';

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'treks/');
  },
  filename(req, file, cb) {
    const date = new Date().getTime();
    cb(null, `${date}-${file.originalname}`);
  },
});

const fileFilter = (req, file, cb) => {
  // if(file.mimetype === ){
  cb(null, true);
  // } else {
  //cb(null,false)
  // }
};

export default multer({
  storage: storage,
  fileFilter: fileFilter,
});
