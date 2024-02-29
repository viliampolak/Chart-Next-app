'use client'
import TestChart from "@components/Chart"
import { getMongoData } from '@data/data-handler';
import AddDatasetForm from "@components/AddDatasetForm"
import DatasetsList from "@components/DatasetsList"
import { useEffect, useState } from "react";

type Dataset = {
    label: string
    data: {x:string, y:number}[]
    borderColor: string
    backgroundColor: string
  }

export default function CompareChart() {
    const [p, setParams] = useState("")
    const [datasets, setDatasets] = useState<Dataset[]>([])
    const [labels, setLabels] = useState<string[]>([])
    // const [lmin,setLmin] = useState("")
    // const [lmax,setLmax] = useState("")

    // `${data.thing}-${data.radio}-${data.from}-${data.to}-${data.color}`
    useEffect(() => {
        const setlabels = (datas: {x: string, y: number}[][]) => {
            console.log("datas in func setlabels : ",datas)
            let fdt = ""
            let ldt = ""
            datas.map((data)=>{
                if(fdt == ""){ fdt = data[0]["x"] }
                else{ 
                    if(Date.parse(fdt)>Date.parse(data[0]["x"])){ 
                        fdt = data[0]["x"]
                    }
                }
            })
            datas.map((data)=>{
                let sus = data.slice(-1)[0]["x"]
                if(ldt == ""){ ldt = sus }
                else{ 
                    if(Date.parse(ldt)<Date.parse(sus)){ 
                        ldt = sus
                    }
                }
            })
            const [fd,ft] = fdt.split(" ")
            const [ld,lt] = ldt.split(" ")
            console.log("fdtldt: ", fdt,ldt)
            console.log("fdftldlt: ", fd,ft,ld,lt)

            if(fdt!=undefined && ldt!=undefined){
            const [fdate, ldate] = [fd.split("-").map((str)=>{return parseInt(str)}), ld.split("-").map((str)=>{return parseInt(str)})]
            const [ftime, ltime] = [parseInt(ft.split(":")[0]), parseInt(lt.split(":")[0])]

            console.log(fdate[0],fdate[1],fdate[2],ftime)
            console.log(ldate[0],ldate[1],ldate[2],ltime)
            
            const l: string[] = []
            for(let year=fdate[0], month=fdate[1], day=fdate[2];day<=ldate[2];day++){
                for(let hour=ftime;hour<24||(day==ldate[1]&&hour<=ltime);hour++){
                    labels.push(`${year}-${month}-${day} ${hour}:00`)
                }
            }
            return l
            }
            else{return ["0"]}
        }

        const fetchData = async (p: string) => {
            const [thing,radio,from,to,color] = p.split(",")
            console.log(p)
            const data = await getMongoData(thing, from, to, radio) // TODO aby sa mohli zadata hocijake casy
            console.log(data)

            setDatasets([...datasets, {label: thing, data: data, borderColor: color, backgroundColor: color}])//TODO kvoli labels pridat casi k zaznamom
            // setLabels(setlabels(datasets.map((d)=>{return d.data})))
            console.log(datasets)

        }

        const deleteData = (i: number) => {
            const da: Dataset[] = datasets.filter((_, index, array) => {if(i != index){return _}});
            console.log(`Deleted dataset ${i}`)
            setDatasets(da)
            console.log(datasets.map((d)=>{return d.data}))
            // setLabels(setlabels())
        }

        const pa = p.split("?")
        if (pa[0]=="f"){
            fetchData(pa[1])
        }
        else if(pa[0]=="d"){
            deleteData(parseInt(pa[1]))
        }

    }, [p])

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top' as const,
            },
            title: {
                display: true,
                text: 'Chart.js Line Chart',
            },
        },
    }

    return (
        <div className="flex flex-col items-center">
            <h1 className="m-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">Compare Chart</h1>
            <div className="flex flex-row">
                <DatasetsList datasets={datasets.map((dataset) => { return dataset.label })} setParams={setParams}></DatasetsList>
                <div className="flex flex-col items-center m-10">
                    <TestChart options={options} labels={labels} datasets={datasets} width={900} height={500}></TestChart>
                </div>
                <div className="bg-white p-8 rounded-lg shadow-lg">
                    <AddDatasetForm setParams={setParams}></AddDatasetForm>
                </div>
            </div>
        </div>)
}
