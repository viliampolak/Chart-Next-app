import RPi.GPIO as GPIO
from lib_nrf24 import NRF24
import time
import spidev
from datetime import datetime

import json
from mongodb import Mongo

m = Mongo()
GPIO.setwarnings(False)
GPIO.setmode(GPIO.BCM)
radio = NRF24(GPIO, spidev.SpiDev())
if(radio.begin(0, 22)):
        print("Radio working")
else: print("Radio not working")
radio.setPayloadSize(32)
radio.setChannel(5)
radio.setDataRate(NRF24.BR_250KBPS)
radio.setPALevel(NRF24.PA_MIN)
radio.setAutoAck(True)
radio.enableDynamicPayloads()
radio.enableAckPayload()
radio.openReadingPipe(1, [0xF0, 0xF0, 0xF0, 0xF0, 0xE1])
radio.printDetails()
radio.startListening()
radio.powerUp()
data = {"temperature": None, "humidity":None, "pressure":None} # add co2, pm
try:
    while True:
        start = time.time()
        while not radio.available(0):
            time.sleep(1/100)
        receivedMessage = []
        radio.read(receivedMessage, radio.getDynamicPayloadSize())
        string = ""
        for n in receivedMessage:
        # Decode into standard unicode set
            if (n >= 32 and n <= 126):
                string += chr(n)
        print("Out received message decodes to: {}".format(string))
        message: dict = json.loads(string)
        if "tem" in message.keys():
            data["temperature"] = message["tem"]
        elif "hum" in message.keys():
            data["humidity"] = message["hum"]
        elif "pres" in message.keys():
            data["pressure"] = message["pres"]
            if all(data.values()):
                print("Added data to mongoDB ", data)
                m.insert_to_collection("test_collection", data)
                data = {"temperature": None, "humidity":None, "pressure":None}
                # add_new_data("data/today.json", datetime.now().strftime("%H"), data)

except:
    radio.stopListening()
    radio.powerDown()
    radio.end()
    print("Radio is turned off")