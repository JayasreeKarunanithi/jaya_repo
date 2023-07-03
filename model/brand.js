import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const roleEnum=['admin','user']
const userSchema = new Schema ({  
    
brandId: {
type: String ,
unique: true,
required: [true,' an brand Id is required'],

},
name:{
    type:String,
    required: [true,' an name Id is required'],
    trim: true , 
    min: [3, 'name should have min 3 letters']
},
phoneNumber:{
    type: String,
   default:'',
//    validate: {
//       validator: function(v) {
//         return /^(\()?\d{3}(\))?(-|\s)?\d{3}(-|\s)\d{4}$/.test(v);
//       },
//       message: props => `Not a valid phone number!`,
//     },
},

address:{
    type: String,
    
},
city:{
    type: String,
    
},
image : {
    type:String
}

}, { timestamps: true });

export default mongoose.model('user', userSchema);

