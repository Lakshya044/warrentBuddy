import mongoose from 'mongoose';

const roleEnum = {
  CITIZEN: 1,
  LAWYER: 2,
  POLICE: 3,
  JUDGE: 4,
  SUPERUSER: 5,
};
const emailRegexSimple = /^\S+@\S+\.\S+$/ ;
const phoneRegex = /^\d{10}$/;
const pincodeRegex = /^\d{6}$/;

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Username is Required" ] ,
  },
  email: {
    type: String,
    required:  [true, "Email is required" ] ,
    unique: true,
    match : [ emailRegexSimple , 'Please use a valid email address!!!']

  },
  password: {
    type: String,
    required:  [true,"Password is required"] , 
  },
  country: {
    type: String,
    required: [true, "Country is required" ],
  },
  address: {
    type: String,
    required: [true, "Address is required" ],
  },
  city: {
    type: String,
    required: [true, "City is required" ] ,
  },
  pincode: {
    type: String,
    required: [true, "Pincode is required"] ,
    match : [pincodeRegex , "Please enter a valid 6 digit pincode"],
  },
  phonenumber: {
    type: String,
    required: [true, "Phone No is required"],
    unique:true,
    match : [ phoneRegex , 'Please use a valid 10 digit Phone Number!!!']

  },
  role: {
    type: Number,
    enum: Object.values(roleEnum), 
    default: roleEnum.CITIZEN,
  },
} , {timestamps:true});

const User = mongoose.models.User || mongoose.model('User', userSchema , 'warrantbuddy_users');

export default User;
