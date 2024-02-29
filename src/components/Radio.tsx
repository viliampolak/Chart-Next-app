'use client'
import { useEffect, useState } from 'react';
import { getTodayJsonData, getMongoData } from '@data/data-handler';
import TestChart from "./Chart"

type Props = {
    chart: string
}

export default function Radio({ chart }: Props) {

    const getData = async (period: string, type: string) => {
        const date = new Date()
        switch (period) {
            case "last24": { // this should be just EH
                date.setDate(date.getDate() - 1)
                date.setHours(date.getHours())
                const data: { x: string, y: number }[] = []
                const data1 = await getMongoData(chart, date.toISOString().split("T")[0], date.toISOString().split("T")[0], "EH")
                data1.filter((point) => {
                    console.log(point)
                    if (parseInt(point.x.split(" ")[1].split(":")[0]) > date.getHours()) {
                        data.push(point)
                    }
                })
                const data2 = await getTodayJsonData(chart)

                data.push(...data2)
                console.log(data, period, type)
                setData([data])
                break
            }
            case "week": {
                const firstdate = new Date(date)
                firstdate.setDate(date.getDate() - 8)

                const lastdate = new Date(date)
                lastdate.setDate(date.getDate() - 1)
                
                if (type == "HiLo") {
                    const mindata = await getMongoData(chart, firstdate.toISOString().split("T")[0], lastdate.toISOString().split("T")[0], "min")
                    const maxdata = await getMongoData(chart, firstdate.toISOString().split("T")[0], lastdate.toISOString().split("T")[0], "max")

                    setData([mindata, maxdata])
                }
                else {
                    // const data = await getJsonData(chart, firstdate.toISOString().split("T")[0], lastdate.toISOString().split("T")[0], type)
                    const mongoData = await getMongoData(chart, firstdate.toISOString().split("T")[0], lastdate.toISOString().split("T")[0], type)
                    
                    if (type == "EH") {
                        // const data1 = await getTodayJsonData(chart)
                        // data.push(...data1) // !!!
                    }
                    setData([mongoData])
                }
                break
            }

            case "month": {
                const firstdate = new Date(date)
                firstdate.setDate(date.getDate() - 30)

                const lastdate = new Date(date)
                lastdate.setDate(date.getDate() - 1)
                
                if (type == "HiLo") {
                    const mindata = await getMongoData(chart, firstdate.toISOString().split("T")[0], lastdate.toISOString().split("T")[0], "min")
                    const maxdata = await getMongoData(chart, firstdate.toISOString().split("T")[0], lastdate.toISOString().split("T")[0], "max")

                    setData([mindata, maxdata])
                }
                else {
                    // const data = await getJsonData(chart, firstdate.toISOString().split("T")[0], lastdate.toISOString().split("T")[0], type)
                    const mongoData = await getMongoData(chart, firstdate.toISOString().split("T")[0], lastdate.toISOString().split("T")[0], type)
                    setData([mongoData])
                }
                break
            }

            case "all": {
                // const firstdate = new Date(date)
                // firstdate.setDate(date.getDate() - 29)

                // const lastdate = new Date(date)
                // lastdate.setDate(date.getDate() - 1)
                
                // if (type == "HiLo") {
                //     const mindata = await getMongoData(chart, firstdate.toISOString().split("T")[0], lastdate.toISOString().split("T")[0], "min")
                //     const maxdata = await getMongoData(chart, firstdate.toISOString().split("T")[0], lastdate.toISOString().split("T")[0], "max")

                //     setData([mindata, maxdata])
                // }
                // else {
                //     const data = await getJsonData(chart, firstdate.toISOString().split("T")[0], lastdate.toISOString().split("T")[0], type)
                //     const mongoData = await getMongoData(chart, firstdate.toISOString().split("T")[0], lastdate.toISOString().split("T")[0], type)
                //     setData([mongoData])
                // }
                break
            }
            default: {

                break
            }
        }
    }

    const [data, setData] = useState<{ x: string, y: number }[][]>([])

    const [period, setPeriod] = useState("last24")
    const [type, setType] = useState("EH")

    useEffect(() => {
        getData(period, type)
        console.log("Fetched Data")
    }, [period, type])

    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        setPeriod(event.target.value)
    }

    function handleChangeForType(event: React.ChangeEvent<HTMLInputElement>) {
        if (period != "last24") {
            setType(event.target.value)
        }
    }

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

    const datasets = data.map((dataset, index) => {
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
                    <input type="radio" name="Radio1" id="24" value="last24" onChange={handleChange} />
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
                    <input type="radio" name="Radio1" id="Radio" value="all" onChange={handleChange} className="form-radio" />
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