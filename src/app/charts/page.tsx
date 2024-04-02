import Image from 'next/image';
import temperaturepic from "@pictures/temperature.png"
import humiditypic from "@pictures/humidity.png"
import carbondioxidepic from "@pictures/carbon-dioxide.png"
import pressurepic from "@pictures/pressure.png"
import vocpic from "@pictures/voc.png"
import pm25pic from "@pictures/pm25.png"
import { getConfigData, getMongoData } from '@data/data-handler';






export default async function ChartMenu() {
  const confdata = await getConfigData()

  const graphs: string[] = Object.keys(confdata)
  const pics = [temperaturepic, humiditypic, pressurepic, carbondioxidepic, vocpic, pm25pic ]

  return (
    <main className="flex flex-col items-center">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mt-10">
      {graphs.map((graph,index) => (
        <div key={confdata[graph]["heading"]} className="bg-white p-4 px-20 rounded-md shadow-md text-center">
          <div className="mb-2">
            <Image src={pics[index]} width={100} height={100} alt="" className="mx-auto mx-20 my-10" />
          </div>
          <div className="mb-2">
            <h1 className="text-lg font-bold">{confdata[graph]["heading"]}</h1>
          </div>
          <div className="mt-4">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
              <a href={`/charts/${graph}`}>Read More</a>
            </button>
          </div>
        </div>
      ))}
    </div>
    </main>
  );
}