const multer = require('multer');
const path = require('path');
const fs = require('fs');

/**
 * @param {string} destination 
 * @param {object} options 
 * @returns {object}
 */
const configureMulter = (destination = 'uploads', options = {}) => {
  const uploadPath = path.join(process.cwd(), destination);
  if (!fs.existsSync(uploadPath)) {
    fs.mkdirSync(uploadPath, { recursive: true });
  }

  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, destination);
    },
    filename: (req, file, cb) => {
      const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1E9)}${path.extname(file.originalname)}`;
      cb(null, uniqueName);
    }
  });

  const defaultOptions = {
    limits: {
      fileSize: options.maxSize || 5 * 1024 * 1024, 
    },
    fileFilter: (req, file, cb) => {
      if (options.allowedTypes && options.allowedTypes.length > 0) {
        if (options.allowedTypes.includes(file.mimetype)) {
          cb(null, true);
        } else {
          cb(new Error(`Type de fichier non autorisé. Types acceptés: ${options.allowedTypes.join(', ')}`), false);
        }
      } else {
        cb(null, true);
      }
    }
  };

  const multerOptions = {
    storage,
    ...defaultOptions
  };

  const upload = multer(multerOptions);

  return {
    single: (fieldName) => upload.single(fieldName),
    
    array: (fieldName, maxCount) => upload.array(fieldName, maxCount),
    
    fields: (fields) => upload.fields(fields),
    
    none: () => upload.none()
  };
};

module.exports = configureMulter;