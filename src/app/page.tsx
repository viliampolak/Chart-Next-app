
export default function Home() {
  return <div>
    <h1>Hello World!</h1>
    <div className="grid grid-cols-2 gap-4">
      <div className="h-64 w-64 bg-sky-700">
        {/* <details className="dropdown">
          <summary className="m-1 btn">open or close</summary>
          <ul className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52">
            <li><a>Item 1</a></li>
            <li><a>Item 2</a></li>
          </ul>
        </details> */}
      </div>
      <div className="h-64 w-64 bg-sky-800"></div>
      <div className="h-64 w-64 bg-blue-600"></div>
      <div className="h-64 w-64 bg-sky-950"></div>
      <div className="h-64 w-64 bg-zinc-700"></div>
      <div className="h-64 w-64 bg-zinc-300"></div>
    </div>
  </div>
}
