'use client'
import { useEffect, useState } from 'react';
import { getJsonData, getTodayJsonData } from '../../data/data-handler';
import TestChart from "./Chart"

type Props = {
    chart: string
}

export default function Radio({ chart }: Props) {

    const getData = async (period: string, type: string) => {
        switch (period) {
            case "last24": {
                const date = new Date()
                date.setDate(date.getDate() - 1)
                date.setHours(date.getHours())
                const data: { x: string, y: number }[] = []
                const data1 = await getJsonData(chart, date.toISOString().split("T")[0], date.toISOString().split("T")[0], "EH")
                data1.filter((point) => {
                    console.log(point)
                    if (parseInt(point.x.split(" ")[1].split(":")[0]) > date.getHours()) {
                        data.push(point)
                    }
                })
                const data2 = await getTodayJsonData(chart)

                data.push(...data2)

                setData([data])
                break
            }
            case "week": {
                const currentDate = new Date()

                const firstdate = new Date(currentDate)
                firstdate.setDate(currentDate.getDate() - 6)

                const lastdate = new Date(currentDate)
                lastdate.setDate(currentDate.getDate() - 1)
                if(type=="HiLo"){
                const mindata = await getJsonData(chart, firstdate.toISOString().split("T")[0], lastdate.toISOString().split("T")[0], "min")
                const maxdata = await getJsonData(chart, firstdate.toISOString().split("T")[0], lastdate.toISOString().split("T")[0], "max")
                setData([mindata,maxdata])
                }
                else{
                const data = await getJsonData(chart, firstdate.toISOString().split("T")[0], lastdate.toISOString().split("T")[0], type)
                if(type=="EH"){
                    const data1 = await getTodayJsonData(chart)
                    data.push(...data1)
                }
                setData([data])
                }

                break
            }
            case "month": {

                break
            }
            case "all": {

                break
            }
            default: {

                break
            }
        }
        console.log("Fetched Data")
    }

    const [data, setData] = useState<{ x: string, y: number }[][]>([])

    const [period, setPeriod] = useState("last24")
    const [type, setType] = useState("EH")

    useEffect(()=>{
        getData(period, type)
    },[period,type])

    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        setPeriod(event.target.value)
    }

    function handleChangeForType(event: React.ChangeEvent<HTMLInputElement>){
        if(period!="last24"){
            setType(event.target.value)
    }}

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

    const datasets = data.map((dataset,index)=>{
        const color = index ? "#ff0000" : "#0000ff"
        return (
            {
                label: chart,
                data: dataset,
                borderColor: color,
                backgroundColor: color
            })
    })

    return (
        <div className="flex flex-col items-center m-10">
            <TestChart options={options} labels={[]} datasets={datasets} width={900} height={500}></TestChart>
            
            <div className="flex justify-center gap-10 pt-10">
                    <label className="inline-block bg-gray-200 rounded-md p-2 hover:bg-gray-300 transition duration-300 ease-in-out">
                        <input type="radio" name="Radio1" id="24" value="last24" onChange={handleChange}/>
                        <span className="ml-2">Last 24 hours</span>
                    </label>
                    <label className="inline-block bg-gray-200 rounded-md p-2 hover:bg-gray-300 transition duration-300 ease-in-out">
                        <input type="radio" name="Radio1" id="week" value="week" onChange={handleChange} />
                        <span className="ml-2">Last week</span>
                    </label>
                    <label className="inline-block bg-gray-200 rounded-md p-2 focus:bg-gray-300 transition duration-300 ease-in-out">
                        <input type="radio" name="Radio1" id="month" value="month" onChange={handleChange} />
                        <span className="ml-2">Last month</span>
                    </label>
                    <label className="inline-block bg-gray-200 rounded-md p-2 hover:bg-gray-300 transition duration-300 ease-in-out">
                        <input type="radio" name="Radio1" id="Radio" value="all" onChange={handleChange} className="form-radio"/>
                        <span className="ml-2">All records</span>
                    </label>
            </div>

            <div className="flex justify-center gap-10 pt-10">
                    <label className="inline-block bg-gray-200 rounded-md p-2 hover:bg-gray-300 transition duration-300 ease-in-out">
                        <input type="radio" name="Radio2" id="24" value="EH" onChange={handleChangeForType} />
                        <span className="ml-2">Every hour</span>
                    </label>
                    <label className="inline-block bg-gray-200 rounded-md p-2 hover:bg-gray-300 transition duration-300 ease-in-out">
                        <input type="radio" name="Radio2" id="week" value="HiLo" onChange={handleChangeForType} />
                        <span className="ml-2">Highs &amp; Lows</span>
                    </label>
                    <label className="inline-block bg-gray-200 rounded-md p-2 focus:bg-gray-300 transition duration-300 ease-in-out">
                        <input type="radio" name="Radio2" id="month" value="avg" onChange={handleChangeForType} />
                        <span className="ml-2">Avarage</span>
                    </label>
            </div>
        </div>
    )
}