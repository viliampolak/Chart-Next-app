'use client';
import { SetStateAction } from 'react';
import { useForm } from 'react-hook-form'
import { useState } from "react";

type Params = {
    setParams: (s:string) => void
}

type FormData = {
    thing: string
    // radio: string
    date: string
    color:string
}

export default function AddDatasetForm(params: Params){
    const { register, handleSubmit } = useForm<FormData>()
    const [ alert, setAlert ] = useState(false)

    const onSubmit = handleSubmit(async (data) => {
        console.log(data.thing, data.date, data.color)
        const cd = new Date()
        cd.setHours(0,0,0,0)
        if(data.date != "" && new Date(data.date) < cd){
            setAlert(false)
            params.setParams(`f?${data.thing.toLowerCase()},${data.date},${data.color}`)            
        }
        else{setAlert(true)}
    })

    return(
    <div>
        <h2 className="text-xl font-semibold text-center mb-4">Add new dataset to graph</h2>
        <p className="text-gray-600 text-center mb-6">Enter your details to register.</p>
        <form onSubmit={onSubmit}>
                        <div className="mb-4">
                            <label htmlFor="thing" className="block text-gray-700 text-sm font-semibold mb-2"></label>
                            <select id="thing" {...register('thing')} className="border p-2 rounded w-full">
                                <option>Temperature</option>
                                <option>Humidity</option>
                                {/* <option>CO2 concetration</option>
                                <option>VOC gas</option>
                                <option>Athmosferic preassure</option>
                                <option>PM particles</option> */}
                            </select>
                        </div>
                        {/* <div className="flex flex-row flex-wrap mb-4">
                            <div className="flex items-center w-1/3">
                                <input id="HL" type="radio" value="HL" {...register('radio')} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 dark:bg-gray-700 dark:border-gray-600" />
                                <label htmlFor="HL" className="ms-2 text-sm font-normal text-gray-900 dark:text-gray-300">Highest Lowest</label>
                            </div>
                            <div className="flex items-center w-1/3">
                                <input id="EH" type="radio" value="EH" {...register('radio')} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 dark:bg-gray-700 dark:border-gray-600" />
                                <label htmlFor="EH" className="ms-2 text-sm font-normal text-gray-900 dark:text-gray-300">Every Hour</label>
                            </div>
                            <div className="flex items-center w-1/3">
                                <input id="AVG" type="radio" value="AVG" {...register('radio')} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 dark:bg-gray-700 dark:border-gray-600" />
                                <label htmlFor="AVG" className="ms-2 text-sm font-normal text-gray-900 dark:text-gray-300">Average of the Day</label>
                            </div>
                        </div> */}
                        <div className="mb-4">
                            <label htmlFor="start" className="mr-6">Date:</label>
                            <input type="date" id="date" {...register('date')}/>
                        </div>
                        {/* <div className="mb-4">
                            <label htmlFor="start" className="mr-6">End date:</label>
                            <input type="date" id="to" {...register('to')} />
                        </div> */}
                        <div className="mb-4">
                            <label htmlFor="colorpicker">Color Picker:</label>
                            <input type="color" id="colorpicker" {...register('color')} />
                        </div>
                        <div className="mb-4"><input type="submit" value="Add" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" /></div>
                    </form>
                    <div className={`bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative ${alert ? "visible":"invisible"}`} role="alert">
                        <strong className="font-bold mr-2">Error</strong>
                        <span className="block sm:inline">Invalid date</span>
                    </div>
    </div>
        
    )
}