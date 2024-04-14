'use client'
type Props = {
    datasets: string[],
    setParams: (i:string)=> void
}

export default function DatasetsList(props: Props) {
    const deleteDataset = (i:number) => {
        console.log(`Delete ${i}`)
        props.setParams(`d?${i}`)
    }
    return (
        <div className="bg-white dark:bg-sky-800 p-8 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold text-center mb-4">Actual datasets</h2>
            <p className="text-gray-600 dark:text-white text-center mb-6">Enter your details to register.</p>
            <ul>
                { props.datasets.map((dataset,i) => (
                    <li key={i}>{dataset.charAt(0).toUpperCase() + dataset.slice(1)}<button className="border p-1 ml-2 rounded-md" onClick={() => deleteDataset(i)}>Delete</button></li>))
                }
            </ul>
        </div>
    )
}