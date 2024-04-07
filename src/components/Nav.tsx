export default function Nav() {
    return (
        <nav className="bg-sky-700 border-gray-200 dark:bg-blue-600 dark:border-gray-700">
            <div className="max-w-screen-xl flex justify-center items-center mx-auto p-4">
                <button data-collapse-toggle="navbar-dropdown" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-dropdown" aria-expanded="false">
                    <span className="sr-only">Open main menu</span>
                    <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
                    </svg>
                </button>
                <div className="hidden w-full md:block md:w-auto" id="navbar-dropdown">
                    <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-sky-700 rounded-lg bg-sky-700 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-sky-700 dark:bg-blue-600 md:dark:bg-blue-600 dark:border-gray-700">
                        <li>
                            <a href="/" className="block py-2 pl-3 pr-4 text-white rounded md:bg-transparent md:hover:text-blue-700 md:text-white md:p-0" aria-current="page">Home</a>
                        </li>
                        <li>
                        <a href="/charts" className="block py-2 pl-3 pr-4 text-white rounded md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Charts</a>
                        </li>
                        <li>
                            <a href="/compare-chart" className="block py-2 pl-3 pr-4 text-white rounded md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Comparing Chart</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}