const mongoose = require('mongoose')
const Schema = require('mongoose').Schema
async function connectMongoDB(){
    try{
        await mongoose.connect("mongodb+srv://vilkomnau:6666@apfcluster.aadktdb.mongodb.net/vilo")
        console.log("Database connected")
    }
    catch(error){
        console.log(error)
    }
}

const co2Schema = new Schema(
    {
        _id: { type: mongoose.ObjectId },
        date: { type: String },
        values: { type: Map, of: String },
        max: { type: String },
        min: { type: String },
        avg: { type: String }
    },
{ collection: "co2_data", timestamps: false, versionKey: false})

const s = mongoose.models.CO2 ?? mongoose.model("CO2", co2Schema)

async function f1()
{
    await connectMongoDB();
    for(let limd = new Date("2024-02-01"); limd.getMonth() != new Date().getMonth() || limd.getDate() < new Date().getDate(); limd.setDate(limd.getDate() + 1)){
        if(limd.getUTCHours()==23){ // because of time moving
            limd.setHours(2)
        }
        console.log(limd)
        await s.deleteMany({"date":limd.toISOString().split("T")[0]})
        await new s({ 
            "_id": new mongoose.Types.ObjectId(),
            "date": limd.toISOString().split("T")[0],
            "values": {"0": "22.90", "1": "22.92", "2": "22.93", "3": "22.93", "4": "22.96", "5": "22.99", "6": "23.01", "7": "23.02", "8": "23.02", "9": "23.03", "10": "23.07", "11": "23.09", "12": "23.07", "13": "22.90", "14": "22.55", "15": "22.03", "16": "21.54", "17": "21.18", "18": "20.92", "19": "20.65", "20": "20.33", "21": "19.85", "22": "19.52", "23": "19.35"},
            "max": "23.09",
            "min": "19.35",
            "avg": "22.07"
        }).save()

    }

}

f1()