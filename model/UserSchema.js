import mongoose from "mongoose"
import bcrypt from "bcrypt"
import validator from "validator"

const Schema = mongoose.Schema;
const Model = mongoose.model;


const userSchema = new Schema({
    name : {
        type : String,
        required : true,
        minLength : [3 , "Name is too short."], 
        maxLength : [30 , "Name is cannot exceed 30 charecters."]
    },
    email : {
        type : String ,
        required : true,
        validate : [validator.isEmail, "Please provide a valid email address."]
    },
    phone : {
        type : Number,
        required : true,

    },
    password : {
        type: String,
        required : true,
        minLength : [8 , "Password is too short."],
        maxLength : [32 , "Password cannot exceed 32 charecters.."]
    },
    bitcoinWallet : {
        type : String,
    },
    createdAt : {   
        type : Date,
        default : Date.now
    }
})

userSchema.pre("save" , async function () {
    if(this.isModified("password")){
        this.password = await bcrypt.hash(this.password , 10);
    }
})

userSchema.methods.comparePassword = async function (enteredPassword) {
     return await bcrypt.compare(enteredPassword , this.password);
}


export const User = Model("User" , userSchema);
