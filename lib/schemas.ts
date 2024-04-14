import mongoose, { Schema } from 'mongoose'




const temperatureSchema = new Schema(
    {
        date: { type: String },
        values: { type: Map, of: String },
        max: { type: String },
        min: { type: String },
        avg: { type: String }
    },
    { collection: "temperature_data", timestamps: false, versionKey: false});

const Temperature = mongoose.models.Temperature ?? mongoose.model("Temperature", temperatureSchema)
export { Temperature }

const humiditySchema = new Schema(
    {
        date: { type: String },
        values: { type: Map, of: String },
        max: { type: String },
        min: { type: String },
        avg: { type: String }
    },
    { collection: "humidity_data", timestamps: false, versionKey: false})

const Humidity = mongoose.models.Humidity ?? mongoose.model("Humidity", humiditySchema)
export { Humidity }

const pressureSchema = new Schema(
    {
        date: { type: String },
        values: { type: Map, of: String },
        max: { type: String },
        min: { type: String },
        avg: { type: String }
    },
    { collection: "pressure_data", timestamps: false, versionKey: false})

const Pressure = mongoose.models.Pressure ?? mongoose.model("Pressure", pressureSchema)
export { Pressure }

const co2Schema = new Schema(
    {
        date: { type: String },
        values: { type: Map, of: String },
        max: { type: String },
        min: { type: String },
        avg: { type: String }
    },
    { collection: "co2_data", timestamps: false, versionKey: false})

const CO2 = mongoose.models.CO2 ?? mongoose.model("CO2", co2Schema)
export { CO2 }

const pmSchema = new Schema(
    {
        date: { type: String },
        values: { type: Map, of: { type: Map, of: String}},
        max1: String,
        max2_5: String,
        max10: String,
        min1: String,
        min2_5: String,
        min10: String,
        avg1: String,
        avg2_5: String,
        avg10: String
    },
    { collection: "pm_data", timestamps: false, versionKey: false})

const PM = mongoose.models.PM ?? mongoose.model("PM", pmSchema)
export { PM }

const TestDataSchema = new Schema(
    {
        date: { type: String },
        temperature: { type: String },
        humidity: { type: String },
        pressure: { type: String },
        co2: { type: String },
        // add pm
    },
    { collection: "test_collection", timestamps: false, versionKey: false});

const TestData = mongoose.models.TestData ?? mongoose.model("TestData", TestDataSchema)
export { TestData }

const TodaySchema = new Schema(
    {
        hour: { type: String },
        tem: { type: String },
        hum: { type: String },
        co2: { type: String },
        pm: { type: Map, of: String },
        press: { type: String }
    },
    { collection: "today_data", timestamps: false, versionKey: false});

const Today = mongoose.models.Today ?? mongoose.model("Today", TodaySchema)
export { Today }