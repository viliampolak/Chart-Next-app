


type Params = {
    params:{
        chart: string
    }
}

export default function ChartDetail({ params }: Params){
    
    return <h1>{params.chart}</h1>
}