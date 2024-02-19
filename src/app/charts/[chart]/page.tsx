"use server";
import TestChart from "../../../components/Chart"
import { getConfigData } from '../../../../data/data-handler';
import Radio from "../../../components/Radio"
type Params = {
    params: {
        chart: string
    }
}

export default async function ChartDetail({ params }: Params) {
    const confdata = await getConfigData()
    const heading = confdata[params.chart]["heading"]
    const article = confdata[params.chart]["article"]

    return (
        <div className="flex flex-col items-center">

            <h1 className="m-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">{heading}</h1>
            <Radio chart={params.chart} />
            <p className="my-6 text-base font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400">{article}</p>
        </div>
    )
}
