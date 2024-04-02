import TestChart from "@components/Chart";
import { getTestMongoData } from '@data/data-handler';

export  default async function Test() { 
    
    const fdata = (await getTestMongoData("temperature")).map((v,i)=>{
        return {x: (i+1).toString(), y:parseFloat(v)}
    })

    const hdata = (await getTestMongoData("humidity")).map((v,i)=>{
        return {x: (i+1).toString(), y:parseFloat(v)}
    })

    const pdata = (await getTestMongoData("pressure")).map((v,i)=>{
        return {x: (i+1).toString(), y:parseFloat(v)}
    })

    console.log(fdata,hdata,pdata)

    // const scale = {
    //     y: {
    //     min: Math.round(Math.min(...fdata.map(item => item.y-5))), // Set minimum value of y-axis
    //     max: Math.round(Math.max(...fdata.map(item => item.y+5))) // Set maximum value of y-axis
    //     }
    // }

    const foptions = {
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
        scales: {
            y: {
            min: Math.round(Math.min(...fdata.map(item => item.y-5)))%2==1 ? Math.round(Math.min(...fdata.map(item => item.y-5)))+1 : Math.round(Math.min(...fdata.map(item => item.y-5))), // Set minimum value of y-axis
            max: Math.round(Math.max(...fdata.map(item => item.y+5)))%2==1 ? Math.round(Math.max(...fdata.map(item => item.y+5)))-1 : Math.round(Math.max(...fdata.map(item => item.y+5))) // Set maximum value of y-axis
            }
        }
    }

    const hoptions = {
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
        scales: {
            y: {
            min: Math.floor(Math.min(...hdata.map(item => item.y-10))/10)*10, // Set minimum value of y-axis
            max: Math.ceil(Math.max(...hdata.map(item => item.y+10))/10)*10 // Set maximum value of y-axis
            }
        }
    }

    const poptions = {
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
        scales: {
            y: {
            min: Math.round(Math.min(...pdata.map(item => item.y-30))/10)*10, // Set minimum value of y-axis
            max: Math.round(Math.max(...pdata.map(item => item.y+30))/10)*10 // Set maximum value of y-axis
            }
        }
    }
    
    const fdataset = {
        label: "temperature",
        data: fdata,
        borderColor: "red",
        backgroundColor: "red"
    }

    const hdataset = {
        label: "humidity",
        data: hdata,
        borderColor: "blue",
        backgroundColor: "blue"
    }

    const pdataset = {
        label: "pressure",
        data: pdata,
        borderColor: "grey",
        backgroundColor: "grey"
    }
    return (
        <div>
            <TestChart options={foptions} labels={[]} datasets={[fdataset]} width={900} height={500}></TestChart>
            <TestChart options={hoptions} labels={[]} datasets={[hdataset]} width={900} height={500}></TestChart>
            <TestChart options={poptions} labels={[]} datasets={[pdataset]} width={900} height={500}></TestChart>
        </div>
    )
}