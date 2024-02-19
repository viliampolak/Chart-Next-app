'use server'
import { faker } from "@faker-js/faker";
import fs from "fs";

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

export async function getJsonData(thing: string, start:string, end:string, type: string){
    const starts = start.split("-").map((s)=>{return s}).join("-")
    const ends = end.split("-").map((s)=>{return s}).join("-")

    const jsonData = JSON.parse(fs.readFileSync(`./data/${thing.toLowerCase()}.json`, 'utf8'))

    const keys = Object.keys(jsonData)
    const s = keys.indexOf(starts)
    const e = keys.indexOf(ends)
    
    if(s==-1||e==-1||s>e){
        return []
    }
    
    const slicedkeys = keys.slice(s,e+1)
    
    const data: {x:string, y:number}[] = []
    switch(type){
        case "EH":{
            for(const date of slicedkeys){
                for(let i=0; i<24; i++){
                    data.push({x:`${date} ${i}:00`,y:parseFloat(jsonData[date]["values"][i.toString()])})
                }
            }
            break
        }
        case "min":{
            for(const date of slicedkeys){
                data.push({x:`${date}`,y:parseFloat(jsonData[date]["min"])})
            }
            break
        }
        case "max":{
            for(const date of slicedkeys){
                data.push({x:`${date}`,y:parseFloat(jsonData[date]["max"])})
            }
            break
        }
        case "avg":{
            for(const date of slicedkeys){
                data.push({x:`${date}`,y:parseFloat(jsonData[date]["avg"])})
            }
            break
        }
    }
    return data;
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

export async function getConfigData(){
    const jsonData: {[key: string]: { heading: string, article: string }} = JSON.parse(fs.readFileSync(`./data/config.json`, 'utf8'))
    return jsonData
}
