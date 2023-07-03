 // import mongoose, { Schema } from 'mongoose';

// const peopleSchema = new Schema(
//   {
//     firstName: {
//       type: String,
//       required: true,
//       trim: true
//     },
//     lastName: {
//       type: String,
//       required: true,
//       trim: true
//     },
//     birthday: {
//       type: Date
//     },
//     activated: {
//       type: Boolean,
//       default: true
//     }
//   },
//   {
//     timestamps: true,
//     toJSON: {
//       virtuals: true,
//       transform: (obj, ret) => {
//         delete ret._id;
//         delete ret.__v;
//       }
//     }
//   }
// );

// peopleSchema.methods = {
//   view(full) {
//     const view = {
//       id: this.id,
//       fullName: `${this.firstName} ${this.lastName}`,
//       age: this.age
//     };

//     return full
//       ? {
//           ...view,
//           birthday: this.birthday,
//           activated: this.activated,
//           createdAt: this.createdAt,
//           updatedAt: this.updatedAt
//         }
//       : view;
//   }
// };

// peopleSchema.virtual('age').get(function() {
//   var birthday = +new Date(this.birthday);
//   return ~~((Date.now() - birthday) / 31557600000);
// });

// const model = mongoose.model('People', peopleSchema);

// export const schema = model.schema;
// export default model;
import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const roleEnum=['admin','user']
const userSchema = new Schema ({  
    
email: {
type: String ,
unique: true,
required: [true,' an email Id is required'],
lowercase: true
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
password:{
    type: String,
    required: [true,' an password  is required'],
},
address:{
    type: String,
    
},
city:{
    type: String,
    
},
role: {
    type:String,
   enum:  roleEnum,
   required: [true,' a role  is required'],
    validate: {
         validator: (inventory_type) => roleEnum.includes(inventory_type),
         message: props => `${props.value} is not a valid  role!`,
      },
}

}, { timestamps: true });

export default mongoose.model('user', userSchema);

