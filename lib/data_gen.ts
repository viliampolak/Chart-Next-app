
const mongoose = require('mongoose');

async function connectMongoDB(){
    try{
        await mongoose.connect("mongodb+srv://vilkomnau:6666@apfcluster.aadktdb.mongodb.net/vilo")
        console.log("Database connected")
    }
    catch(error){
        console.log(error)
    }
}

const TemperatureSchema = new mongoose.Schema({
        date: { type: String },
        values: { type: Map, of: String },
        max: { type: String },
        min: { type: String },
        avg: { type: String }
    },{ collection: "temperature_data", timestamps: true }
    );

const Temperature = mongoose.models.Temperature ?? mongoose.model("Temperature", TemperatureSchema)

export async function f1()
{
    await connectMongoDB();
    const lim = await Temperature.find({},{}).sort({"date":-1}).limit(1)
    const d = new Date("2024-02-29")
    d.setDate(d.getDate() + 1)
    for(let limd = d; limd.getMonth() != new Date().getMonth() || limd.getDate()< new Date().getDate(); limd.setDate(limd.getDate() + 1)){
        if(limd.getUTCHours()==23){ // because of time moving
            limd.setHours(2)
        }
        console.log(limd)
        await Temperature.deleteOne({"date":limd.toISOString()})
        await new Temperature({ 
            "date": limd.toISOString().split("T")[0],
            "values": 
            {
            "0": "22.90", "1": "22.92", "2": "22.93", "3": "22.93", "4": "22.96", "5": "22.99", "6": "23.01", "7": "23.02", "8": "23.02", "9": "23.03", "10": "23.07", "11": "23.09", "12": "23.07", "13": "22.90", "14": "22.55", "15": "22.03", "16": "21.54", "17": "21.18", "18": "20.92", "19": "20.65", "20": "20.33", "21": "19.85", "22": "19.52", "23": "19.35"
            },
            "max": "23.09",
            "min": "19.35",
            "avg": 22.07
        }).save()
    }

}
  
f1();