import multer from 'multer';
import path from 'path';
import cryto from 'crypto';

const tmpFolder = path.resolve(__dirname, '..', '..', 'tmp');

export default {
  directory: tmpFolder,
  storage: multer.diskStorage({
    destination: tmpFolder, // Define a pasta de imagens
    filename(request, file, callback) {
      const fileHash = cryto.randomBytes(10).toString('hex');
      const fileName = `${fileHash}-${file.originalname}`; // Une uma hash aleatória com o nome da img original, para não haver duplicatas

      return callback(null, fileName);
    },
  }),
};
