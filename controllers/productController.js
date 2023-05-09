import { Product } from "../models/index.js";
import CustomErrorHandler from "../services/customErrorHandler.js";
import fs from 'fs';
import path from 'path';
import Joi from 'joi';
import multer from 'multer';    // for file upload
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'uploads/'),
    filename: (req, file, cb) => {
        const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1E9)}${path.extname(file.originalname)}`;
        cb(null, uniqueName);
    }
});

const handleMultipartData = multer({ storage, limits: { fileSize: 1000000 * 5 } }).single('image'); // 5mb

const productController = {
    async store(req, res, next) {
        handleMultipartData(req,res,async (err)=>{
            if(err){
                return next(CustomErrorHandler.serverError(err.message));
            }
            const filePath = req.file.path; 
            //validation
            const productSchema = Joi.object({
                name: Joi.string().required(),
                price: Joi.number().required(),
                size : Joi.string().required(),
            });
            const {error} = productSchema.validate(req.body);

            if(error){
                // delete the uploaded file
                fs.unlink(`${appRoot}/${filePath}`, async(err)=>{
                    if(err){
                        return next(CustomErrorHandler.serverError(err.message));
                    }
                });
                return next(error);
            }
            
            const {name,price,size} = req.body;

            let document;

            try{
                document = await Product.create({
                    name,
                    price,
                    size,
                    image: filePath
                });
            }catch(err){
                return next(err);
            }
            res.status(201).json(document);
        })
    },

    async update(req, res, next) {
        handleMultipartData(req,res,async (err)=>{
            if(err){
                return next(CustomErrorHandler.serverError(err.message));
            }
            let filePath  
            //validation
            if(req.file){
                 filePath = req.file.path; 
            }
            const productSchema = Joi.object({
                name: Joi.string().required(),
                price: Joi.number().required(),
                size : Joi.string().required(),
            });
            const {error} = productSchema.validate(req.body);

            if(error){
                // delete the uploaded file
                if(req.file){
                fs.unlink(`${appRoot}/${filePath}`, async(err)=>{
                    if(err){
                        return next(CustomErrorHandler.serverError(err.message));
                    }
                });
            }
                return next(error);
            }
            
            const {name,price,size} = req.body;

            let document;

            try{
                document = await Product.findOneAndUpdate({_id:req.params.id},{
                    name,
                    price,
                    size,
                    ...(req.file && {image: filePath})
                },{new:true});
            }catch(err){
                return next(err);
            }
            res.status(201).json(document);
        })
    },

    async destroy(req, res, next) {
        const document = await Product.findOneAndRemove({_id:req.params.id});
        if(!document){
            return next(new Error('Nothing to delete'));
        }
        const imagePath = document.image;
        fs.unlink(`${appRoot}/${imagePath}`, async(err)=>{
            if(err){
                return next(CustomErrorHandler.serverError(err.message));
            }
        });
        res.json(document);
    }

}


export default productController;