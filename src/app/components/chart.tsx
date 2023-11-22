'use client'

import { Chart as ChartJS, CategoryScale, LinearScale, Tooltip, PointElement, LineElement } from "chart.js"
import { Line } from "react-chartjs-2"

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip
  );

type Dataset = {
  label: string
  data: number[]
  borderColor: string
  backgroundColor: string
}

type Props = {
    options: object
    labels: string[]
    datasets: Dataset[]
}

export default function TestChart({ options, labels, datasets }: Props){

    const data={ labels: labels, datasets: datasets }
    return <Line options={options} data={data}/>
}