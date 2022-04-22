const express = require('express');
const router = express.Router();
const bodyparser = require('body-parser');
const Vehicle = require('./vehicle_schema');
const path = require('path');
const mongoose = require('mongoose');
const res = require('express/lib/response');
const multer = require('multer');
const { append } = require('express/lib/response');
const { base } = require('./vehicle_schema');
router.use(bodyparser.json());
   



const FILE_TYPE_MAP = {
    'image/png': 'png',
    'image/jpeg': 'jpeg',
    'image/jpg': 'jpg'
};

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const isValid = FILE_TYPE_MAP[file.mimetype];
        let uploadError = new Error('invalid image type');

        if (isValid) {
            uploadError = null;
        }
        cb(uploadError, 'upload/image');
    },
    filename: function (req, file, cb) {
        const fileName = file.originalname.split(' ').join('-');
        const extension = FILE_TYPE_MAP[file.mimetype];
        cb(null, `${fileName}-${Date.now()}.${extension}`);
    }
});

const uploadOptions = multer({ storage: storage });

router.use('image',express.static('upload/image'));
router.post('/details',uploadOptions.single('logo'),async(req,res)=>{

    const file = req.file;
    if (!file) return res.status(400).send('No image in the request');

    const filename = req.file.filename;
    const basepath = `http://localhost:${process.env.PORT}/upload/image/`
   
    const vehicle = new Vehicle({
        registration_number: req.body.registration_number,
        name: req.body.name,
        model: req.body.model,
        description: req.body.description,
        price: req.body.price,
        logo: `${basepath}${filename}`
    })

    res.send(vehicle);
   const created = await vehicle.save();
  if(created){
      return res.status(201).json('created');
  }
  else{
      return res.status(500).json('not created');
  }


})



router.get('/details',async(req,res)=>{
    const  {page =1, limit =10} = req.query
    const vehicle = await Vehicle.find()
    .limit(limit *1).skip((page-1)*limit);//paginated

    res.send(vehicle);


    if(!vehicle){
        return res.status(404).json('not found');
    }
    else{
        return res.status(200).json('found');
    }

})
  
     router.put("/:id",async(req,res)=>{
         const updatedata = await Vehicle.findByIdAndUpdate(req.params.id);
         res.send(updatedata);
         if(!updatedata){
             return res.status(500).json('bad');
         }
         else{
             return res.status(200).json('created');
         }
     })


    router.patch("/:id",async(req,res)=>{
        const finddata = await Vehicle.findById(req.params.id);
        res.send(finddata);
        if(!finddata){
            return res.status(404).json('not found the data');
        }
        else{
            return res.status(200).json('found data');
        }
    })

    router.delete("/:id",async(req,res)=>{
        const delete_data = await Vehicle.findByIdAndDelete(req.params.id);
        res.send(delete_data);
        if(!delete_data){
            return res.status(500).json('server error');
        }
        else{
            return res.status(201).json('data is deleted ');
        }
    })




module.exports = router;