import mongoose ,{Schema} from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new Schema(
    {
        username:{
            type:String,
            required:true,
            unique:true,
            trim:true,
            lowercase:true,
            index:true,

        },
        email:{
            type:String,
            required:true,
            unique:true,
            trim:true,
            lowercase:true,

        },
        fullname:{
            type:String,
            required:true,
          
            trim:true,
         
            index:true,

        },
        avatar:{
            type:String,
            required:true
        },
        coverImage:{
            type:String,
            
        },
        watchHistory:[
            {
                type:Schema.Types.ObjectId,
                ref:"Video"
            }
        ],
        password:{
            type:String,
            required:[true,"Password is required"],
        },
        refreshTokens:{
            type:String

        }
    },{
        timestamps:true,
});

userSchema.pre("save",async function(next){
    if(!this.isModified("password")){
        return next();
    }
    this.password= bcrypt.hash(this.password,10);
    next();
})
userSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password,this.password);
}
userSchema.methods.genrateAccessToken= function(){
    return jwt.sign({
        _id:this._id,
        email:this.email,
        fullname:this.fullname
    },process.env.ACCESS_TOKEN_SECRET,{
        expiresIn:process.env.ACCESS_TOKEN_EXPIRY
    });



}
userSchema.methods.genrateRefreshToken= function(){
    return jwt.sign({
        _id:this._id
    },process.env.REFRESH_TOKEN_SECRET,{
        expiresIn:process.env.REFRESH_TOKEN_EXPIRY
    })
}
// here we are adding new methods to the userSchema




export const User = mongoose.model("User",userSchema);
