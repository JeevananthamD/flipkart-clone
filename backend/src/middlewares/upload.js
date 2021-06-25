const multer = require("multer");
const { nanoid } = require("nanoid");


let d, n;
const regexp = RegExp(' ','g');

function upload(fieldname, directory) {

  d = new Date();
  n = d.toDateString().replace(regexp, '-');
  n = n.substr(4,n.length); 
  
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, directory)
    },
    filename: function (req, file, cb) {
      cb(null, `${nanoid()}-${n}-${file.originalname}`)
    }
  })

  const upload = multer({ storage });

  return upload.array(fieldname);
}


module.exports = {
  upload
}