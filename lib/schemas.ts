import mongoose, { Schema } from 'mongoose'




const TemperatureSchema = new Schema(
    {
        date: { type: String },
        values: { type: Map, of: String },
        max: { type: String },
        min: { type: String },
        avg: { type: String }
    },
    { collection: "temperature_data", timestamps: true });

const Temperature = mongoose.models.Temperature ?? mongoose.model("Temperature", TemperatureSchema)
export { Temperature }

const humiditySchema = new Schema(
    {
        values: { hour: String },
        max: String,
        min: String,
        avg: String
    },
    { collection: "humidity_data", timestamps: true })

const Humidity = mongoose.models.Humidity ?? mongoose.model("Humidity", humiditySchema)
export { Humidity }

const pressureSchema = new Schema(
    {
        values: { hour: String },
        max: String,
        min: String,
        avg: String
    },
    { collection: "pressure_data", timestamps: true })

const Pressure = mongoose.models.Pressure ?? mongoose.model("Pressure", pressureSchema)
export { Pressure }

const co2Schema = new Schema(
    {
        values: { hour: String },
        max: String,
        min: String,
        avg: String
    },
    { collection: "co2_data", timestamps: true })

const CO2 = mongoose.models.CO2 ?? mongoose.model("CO2", co2Schema)
export { CO2 }

const pmSchema = new Schema(
    {
        values: { hour: { pm1: Number, pm25: Number } },
        max: String,
        min: String,
        avg: String
    },
    { collection: "pm_data", timestamps: true })

const PM = mongoose.models.PM ?? mongoose.model("PM", pmSchema)
export { PM }

const TestDataSchema = new Schema(
    {
        temperature: { type: String },
        humidity: { type: String },
        pressure: { type: String },
        // add co2 and pm
    },
    { collection: "test_collection", timestamps: true });

const TestData = mongoose.models.TestData ?? mongoose.model("TestData", TestDataSchema)
export { TestData }