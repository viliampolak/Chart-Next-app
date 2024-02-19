
export default function Home() {
  return <div>
    <div className="bg-gray-100 min-h-screen flex flex-col justify-center items-center">
      <header className="text-center mb-8">
        <h1 className="text-3xl font-semibold text-gray-800">Meteorological Station</h1>
        <p className="text-lg text-gray-600">Stay informed about the weather</p>
      </header>
      <main className="max-w-lg bg-white p-8 rounded-lg shadow-md">
        <p className="text-lg text-gray-700 mb-4">Welcome to our meteorological station website. Here you can find the latest weather updates, forecasts, and climate data for your area.</p>
        <p className="text-lg text-gray-700 mb-4">Explore our services and stay informed about the weather conditions to plan your activities and make informed decisions.</p>
        <p className="text-lg text-gray-700">Thank you for visiting us!</p>
      </main>
      <footer className="mt-8 text-gray-600">
        &copy; 2024 Meteorological Station. All rights reserved.
      </footer>
    </div>
    <h1>Hello World!</h1>
    <div className="grid grid-cols-2 gap-4">
      <div className="h-64 w-64 bg-sky-700">
      </div>
      <div className="h-64 w-64 bg-sky-800"></div>
      <div className="h-64 w-64 bg-blue-600"></div>
      <div className="h-64 w-64 bg-sky-950"></div>
      <div className="h-64 w-64 bg-zinc-700"></div>
      <div className="h-64 w-64 bg-zinc-300"></div>
    </div>
  </div>
}
