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

    useEffect(() => {
        const fetchData = async (p: string) => {
            const [thing,date,color] = p.split(",")
            console.log(thing, date, color)
            const data = await getMongoData(thing, date, date, "EH") // TODO aby sa mohli zadata hocijake casy
            const d = data.map((u,i)=>{
                return {x: String(i), y: u.y}
            })
            console.log(d)

            setDatasets([...datasets, {label: `${thing} ${date}`, data: d, borderColor: color, backgroundColor: color}])//TODO kvoli labels pridat casi k zaznamom
            const numbersArray: string[] = Array.from({ length: 24 }, (_, index) => String(index));
            setLabels(numbersArray)
        }

        const deleteData = (i: number) => {
            const da: Dataset[] = datasets.filter((_, index, array) => {if(i != index){return _}});
            console.log(`Deleted dataset ${i}`)
            setDatasets(da)
            console.log(datasets.map((d)=>{return d.data}))
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
            }
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
                <div className="bg-white dark:bg-sky-800 p-8 rounded-lg shadow-lg">
                    <AddDatasetForm setParams={setParams}></AddDatasetForm>
                </div>
            </div>
        </div>)
}