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
        <div className="bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold text-center mb-4">Actual datasets</h2>
            <p className="text-gray-600 text-center mb-6">Enter your details to register.</p>
            <ul>
                { props.datasets.map((dataset,i) => (
                    <li key={i}>{dataset} {i}<button onClick={() => deleteDataset(i)}>Delete</button></li>))
                }
            </ul>
        </div>
    )
}