import mongoose from 'mongoose'

export default async function connectMongoDB(){
    try{
        await mongoose.connect("mongodb+srv://nextjs_user:342800@apfcluster.aadktdb.mongodb.net/vilo")
        // console.log("Database connected")
    }
    catch(error){
        console.log(error)
    }
}