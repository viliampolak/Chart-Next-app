import TestChart from '../components/chart'
import { getFakerData } from '../../../data/data-handler';
import Image from 'next/image';
import temperaturepic from "../../../public/temperature.png"

export default function MyLineChart() {

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

  const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

  // const datasets = getFakerData(2,labels.length)
  const datasets = [
    {
      label: 'Dataset 1',
      data: [
        81, 83, 14, 46,
        54, 18, 38
      ],
      borderColor: '#9fc0e0',
      backgroundColor: '#9fc0e0'
    },
    {
      label: 'Dataset 2',
      data: [
        31, 32, 97, 45,
        78, 95, 45
      ],
      borderColor: '#ae03a9',
      backgroundColor: '#ae03a9'
    }
  ]

  const graphs: string[] = ['temp', 'hum', 'press', 'air', 'hi', 'ha']

  return (
    <main className="flex flex-col items-center">
      <div className="flex flex-row flex-wrap m-40">
        {graphs.map((n) => {
          return (
            // <div className="block p-10 m-10 max-w-lg p-6 border-2 border-indigo-500/50 rounded-lg">
            //   <h1 className="">{n}</h1>
            //   {/* <TestChart key={n} options={options} labels={labels} datasets={datasets} /> */}
            //   <Image src={temperaturepic} width={100} height={100} alt=""></Image>
            // </div>
            <div className="max-w-sm mx-auto rounded overflow-hidden shadow-lg border-2 border-indigo-500/50 rounded-lg">
              <Image src={temperaturepic} width={100} height={100} alt="" className=""></Image>
              <div className="px-6 py-4">
                <div className="flex justify-center mb-2">
                  <h1 className="font-bold text-xl">{n}</h1>
                </div>
                <p className="text-gray-700 text-base text-center">Some description text about the card.</p>
              </div>
              <div className="flex justify-center py-4">
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
                  Read More
                </button>
              </div>
            </div>
          )
        })}

      </div>
    </main>
  );
}