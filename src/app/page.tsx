import Image from 'next/image';
import cloudpic from "@pictures/cloud.png"

export default function Home() {
  return <div className="min-h-screen flex flex-col justify-center items-center">
      <div className="bg-white dark:bg-sky-800 flex flex-col items-center justify-center p-10 rounded-lg shadow-md max-w-4xl pt-0">
      <Image src={cloudpic} width={250} height={250} alt="" className="mx-auto mx-20 my-10" />
      <header className="text-center mb-8">
        <h1 className="text-6xl font-semibold mb-10">Meteorological Station</h1> {/*text-gray-800*/}
        <p className="text-2xl">Stay informed about the weather</p>{/*text-gray-600*/}
      </header>
        <p className="text-xl mb-4">Welcome to our meteorological station website.</p>
        <p className="text-xl mb-4">This site is part of graduation project by Viliam Polak.</p>
        <p className="text-xl mb-4">Here you can delve into a treasure trove of historical weather data, unlocking insights into temperature fluctuations, humidity levels, and Particulate Matter concentrations spanning various timeframes. Whether you're a weather enthusiast, a researcher, or simply curious about past weather patterns, our extensive database awaits your exploration.</p>
        <p className="text-xl">Our user-friendly interface allows you to navigate through the years effortlessly, visualizing data trends and patterns through interactive graphs and charts. Whether you're interested in comparing seasonal variations or tracking long-term climate trends, our platform empowers you to analyze the past to better understand the present and anticipate the future.</p>
        <p className="text-xl">Thank you for visiting us!</p> {/*text-gray-700*/}

      </div>
      <footer className="mt-8"> {/*text-gray-600*/}
        &copy; 2024 Meteorological Station. All rights reserved.
      </footer>

    </div>
}
// Welcome to our meteorological station website.

// Here you can delve into a treasure trove of historical weather data, unlocking insights into temperature fluctuations, humidity levels, and Particulate Matter concentrations spanning various timeframes. Whether you're a weather enthusiast, a researcher, or simply curious about past weather patterns, our extensive database awaits your exploration.

// Our user-friendly interface allows you to navigate through the years effortlessly, visualizing data trends and patterns through interactive graphs and charts. Whether you're interested in comparing seasonal variations or tracking long-term climate trends, our platform empowers you to analyze the past to better understand the present and anticipate the future.

// Thank you for visiting us and embarking on this meteorological journey with us!"