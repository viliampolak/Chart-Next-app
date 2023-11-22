import { faker } from "@faker-js/faker";

export function getFakerData(datasetsnum: number, datanum: number){
    const datasets = []
    for(let n=1;n<=datasetsnum;n++){
        let label = `Dataset ${n}`
        
        let data = []
        for(let i=0;i<datanum;i++){
        data.push(faker.datatype.number({min:0, max: 100}))
        }        
        let color = faker.color.rgb()
        datasets.push({label: label,data: data,borderColor: color,backgroundColor: color})
    }
    return datasets
}
