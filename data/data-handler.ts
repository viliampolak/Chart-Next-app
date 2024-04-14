'use server'
import { faker } from "@faker-js/faker";
import fs from "fs";
import connectMongoDB from "@lib/mongodb";
import { Temperature, Humidity, Pressure, CO2, PM, TestData, Today } from "@lib/schemas";
import mongoose from "mongoose";

export async function getFakerData(datasetsnum: number, datanum: number){
    const datasets = []
    for(let n=1;n<=datasetsnum;n++){
        let label = `Dataset ${n}`
        
        let data = []
        for(let i=0;i<datanum;i++){
        data.push(faker.datatype.number({min:0, max: 100}))
        }        
        let color = faker.color.rgb()
        datasets.push({label: label,data: data,borderColor: color,backgroundColor: color})
    }
    return datasets
}

export async function getConfigData(){
    const jsonData: {[key: string]: { heading: string, article: string }} = JSON.parse(fs.readFileSync(process.cwd() + `/data/config.json`, 'utf8'))
    return jsonData
}

export async function getTodayJsonData(thing: string){
    const data: {x:string, y:number}[] = []
    const jsonData: {[key: string]: { tem: number, hum: number, pressure: number, co2: number, pm: {one: number, two_five: number} }} = JSON.parse(fs.readFileSync(`./data/today.json`, 'utf8'))
    const d = new Date()
    const date = `${d.getFullYear()}-${d.getMonth()+1}-${d.getDate()}`
    Object.entries(jsonData).map(([key, value]) => {
        if(thing=="temperature"){
            data.push({x:`${date} ${key}:00`,y:value.tem})
        }
        else if(thing=="humidity"){
            data.push({x:`${date} ${key}:00`,y:value.hum})
        }
        else if(thing=="pressure"){
            data.push({x:`${date} ${key}:00`,y:value.hum})
        }
        else if(thing=="co2"){
            data.push({x:`${date} ${key}:00`,y:value.co2})
        }
        else if(thing=="pm"){
            data.push({x:`${date} ${key}:00`,y:value.pm.two_five})
        }
      })
    return data
}

export async function getTodayMongoData(thing: string){
    const data: {x:string, y:number}[] = []

    await connectMongoDB()

    const d = new Date()
    const date = `${d.getFullYear()}-${d.getMonth()+1}-${d.getDate()}`
    if(thing=="temperature"){
        const mongoData = await Today.find({}, {"hour":1,"tem":1})
        mongoData.map((u) => {
            data.push({x:`${date} ${u.hour}:00`,y: parseInt(u.tem)})
            })
    }
    else if(thing=="humidity"){
        const mongoData = await Today.find({}, {"hour":1,"hum":1})
        mongoData.map((u) => {
        data.push({x:`${date} ${u.hour}:00`,y: parseInt(u.hum)})
        })
    }
    else if(thing=="pressure"){
        const mongoData = await Today.find({}, {"hour":1,"press":1})
        mongoData.map((u) => {
        data.push({x:`${date} ${u.hour}:00`,y: parseInt(u.press)})
        })
    }
    else if(thing=="co2"){
        const mongoData = await Today.find({}, {"hour":1,"co2":1})
        mongoData.map((u) => {
        data.push({x:`${date} ${u.hour}:00`,y: parseInt(u.co2)})
        })
    }
    else if(thing=="pm"){
        const mongoData = await Today.find({}, {"hour":1,"pm":1})
        mongoData.map((u) => {
        data.push({x:`${date} ${u.hour}:00`,y: parseInt(u.pm["2_5"])})
        })
    }

    return data
}

export async function getMongoData(thing: string, fdate: string, ldate:string, type:string){
    const schemas: { [key: string]: mongoose.Model<any, {}, {}, {}, any, any> } = {"temperature": Temperature, "humidity": Humidity, "pressure": Pressure, "co2": CO2, "pm": PM}

    await connectMongoDB()
    
    var fields = {}
    switch(type){
        case "EH":{
            if(thing!="pm"){ fields = { values:1 } }else{ fields = { "values.'2_5'":1} }
            break
        }
        case "min":{
            if(thing!="pm"){ fields = { min:1 } }else{ fields = { min2_5:1 } }
            break
        }
        case "max":{
            if(thing!="pm"){ fields = { max:1 } }else{ fields = { max2_5:1 } }
            break
        }
        case "avg":{
            if(thing!="pm"){ fields = { avg:1 } }else{ fields = { avg2_5:1 } }
            break
        }
    }
    
    const mongoData  = await schemas[thing].find({ "date": { $gte: fdate, $lte: ldate } }, { date:1, ...fields, _id:0 })
    console.log(mongoData)

    const data: { x: any, y: any }[] = []
    mongoData.map((unit)=>{
        if(type == "EH"){
            unit.values.forEach((value:string, hour:string)=>{
               data.push({x:`${unit.date} ${hour}:00`, y:value})
            })
        }
        else{
            if(thing!="pm"){ data.push({x:unit.date, y:unit[`${type}`]}) }
            else{ data.push({x:unit.date, y:unit[`${type}2_5`]}) }
            
        }
    })
    console.log(data)
    return data
}

export async function getPmMongoData(fdate: string, ldate:string, type:string){
    await connectMongoDB()
    var fields = {}
    switch(type){
        case "EH":{
            fields = { values:1}
            break
        }
        case "min":{
            fields = { min1:1, min2_5:1, min10:1 }
            break
        }
        case "max":{
            fields = { max1:1, max2_5:1, max10:1 }
            break
        }
        case "avg":{
            fields = { avg1:1, avg2_5:1, avg10:1 }
            break
        }
    }
    const mongoData  = await PM.find({ "date": { $gte: fdate, $lte: ldate } }, { date:1, ...fields, _id:0 })
    console.log(mongoData)
    const data: { x: any, y: any }[] = []
    mongoData.map((unit)=>{
        if(type == "EH"){
            unit.values.forEach((value:object, hour:string)=>{
               data.push({x:`${unit.date} ${hour}:00`, y:value})
            })
        }
        else{
            data.push({x:unit.date, y:unit[`avg2_5`]})
        }
    })
    return data
}

export async function getTestMongoData(thing: "temperature"|"humidity"|"pressure"|"co2"){
    await connectMongoDB()
    const mongoData: {temperature: string, humidity: string, pressure: string, co2: string}[] = await TestData.find({},{_id:0})
    const d = mongoData.map((unit)=>{
        return unit[thing]
    })
    return d
}
