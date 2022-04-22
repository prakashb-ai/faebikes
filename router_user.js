const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('./user_schema');
const bodyparser = require('body-parser');
const middleware = require('./middleware');
const cors = require('cors');



router.use(bodyparser.json());

 router.post('/register',async(req,res)=>{
     try{ 
          const {username,email,password,confirmpassword} = req.body;
          const exit = await User.findOne({email});
          if(exit){
              return res.status(400).send('user already exits');
          }
          if(password!==confirmpassword){
              return res.status(400).send(' passwords are mismatch');
          }

          const user = new User({
              username,
              email,
              password,
              confirmpassword
          })
           
           await user.save();
          return res.status(200).send('registred successfully');

     }
     catch{
         return res.status(500).send('server error');

     }
 })
  router.post('/login',async(req,res)=>{
      try {
            const {email,password} = req.body;
            const exit = await User.findOne({email})
            
            
            if(!exit){
                return res.status(400).send('user not found');
            }
            if(exit.password !==password){
                return res.status(400).send('invalid credentials');
            }
            
            const payload = {
                user: {
                    id: exit.id
                }
            }
            jwt.sign(payload,'jwtSecret',{expiresIn: 3600000},
             (err,token)=>{
                 if(err) throw err;
                 return res.json({token});
             }
            )
      } 
      catch (error) {
          console.log(err);
      }
  })
   router.get('/myprofile',middleware,async(req,res)=>{
       try {
        const {page=1 ,limit =10} = req.query;

            const exit = await User.findById(req.params.id)
            .limit(limit*1)//paginated
            
            .skip((pase-1)*limit);

             res.send(exit);
            if(!exit){
                return res.status(400).send('user not found');
            }
             res.send(exit);
       } catch (error) {
           return res.status(200).send('done');
           
       }
   })
   
   router.put('/:id',async(req,res)=>{
       try {
           
           const update_data = await User.findByIdAndUpdate(req.params.id);
           if(!update_data){
               return res.status(404).send('data is not update');
           }
           
       } catch (error) {
           return res.status(200).send('data update');
           
       }
   })
     router.delete('/:id', async(req,res)=>{
         const delete_data = await User.findByIdAndDelete(req.params.id);

         if(!delete_data){
             return res.status(404).send('not delete data');
         }
         else {
             return res.status(200).send('delete data');
         }
     })




module.exports =router;