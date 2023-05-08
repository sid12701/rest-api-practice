import Product from '../models/index.js';
import multer from 'multer';

const storage = multer.diskStorage({
    destination:(req,file,cb)
})
const productController = {
    async store(req, res,next) {
        //multiport from data
    }
}

export default productController;