import mongoose from 'mongoose';
import validator from 'validator';

const schema = new mongoose.Schema({

    name:{
        type:String,
        required:[true,"Please enter your name"]
    },
    email:{
        type:String,
        required:[true,"Please enter your email"],
        unique:true,
        validate:validator.isEmail,
    },
    password:{
        type:String,
        required:[true,"Please enter your password"],
        minlength:[6,"Minimum password length is 6 characters"],
        select:false,

    },
    role:{
        type:String,
        enum:["admin","user"],
        default:"user",
    },
    subscription:{
        id:String,
        status:String,
    },
    avatar:{
        public_id:{
            type:String,
            required:true,
        },
        url:{
            type:String,
            required:true,
        }
    },
    playlist:[
        {
            anime:{
                type:mongoose.Schema.Types.ObjectId,
                ref:"Anime",
            },
            poster:String,
        },
    ],
    createdAt:{
        type:Date,
        default:Date.now,
    },
    ResetPasswordToken:String,
    ResetPasswordExpire:String,
});

export const User = mongoose.model("User", schema);