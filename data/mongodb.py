from pymongo import MongoClient
import json
import random
class Mongo:
    def __init__(self):
        self.client = MongoClient("mongodb+srv://raspberry_user:pi666@apfcluster.aadktdb.mongodb.net/")
        self.db = self.client.vilo
        self.collection = self.db["test_collection"]

    def insert_to_collection(self, collection, data: object):
        self.db[collection].insert_one(data)

# Testing
# m = Mongo()

# inserting data
# m.insert_to_collection()

# printing data from collection
# for doc in m.collection.find():
#     print(doc)
# o = {"0": {"1": "5", "2_5": "6", "10": "15"}, "1": {"1": "9", "2_5": "12", "10": "9"}, "2": {"1": "15", "2_5": "19", "10": "8"}, "3": {"1": "8", "2_5": "6", "10": "16"}, "4": {"1": "5", "2_5": "7", "10": "16"}, "5": {"1": "6", "2_5": "11", "10": "14"}, "6": {"1": "18", "2_5": "10", "10": "6"}, "7": {"1": "10", "2_5": "9", "10": "5"}, "8": {"1": "9", "2_5": "14", "10": "6"}, "9": {"1": "18", "2_5": "6", "10": "12"}, "10": {"1": "14", "2_5": "14", "10": "18"}, "11": {"1": "5", "2_5": "13", "10": "20"}, "12": {"1": "5", "2_5": "5", "10": "11"}, "13": {"1": "20", "2_5": "11", "10": "8"}, "14": {"1": "7", "2_5": "10", "10": "18"}, "15": {"1": "12", "2_5": "11", "10": "11"}, "16": {"1": "17", "2_5": "11", "10": "6"}, "17": {"1": "13", "2_5": "17", "10": "18"}, "18": {"1": "7", "2_5": "8", "10": "15"}, "19": {"1": "19", "2_5": "15", "10": "5"}, "20": {"1": "7", "2_5": "8", "10": "10"}, "21": {"1": "9", "2_5": "19", "10": "20"}, "22": {"1": "12", "2_5": "9", "10": "13"}, "23": {"1": "5", "2_5": "5", "10": "20"}}
# a1, a2_5, a10 = 0, 0, 0
# min1, min2_5, min10 = 100,100,100
# max1, max2_5, max10 = 0, 0, 0
# for v in o.values():
#     v["1"] = int(v["1"])
#     v["2_5"] = int(v["2_5"])
#     v["10"] = int(v["10"])

#     a1 += v["1"]
#     a2_5 += v["2_5"]
#     a10 += v["10"]

#     if v["1"] < min1:
#         min1 = v["1"]
#     elif v["1"] > max1:
#         max1 = v["1"]

#     if v["2_5"] < min2_5:
#         min2_5 = v["2_5"]
#     elif v["2_5"] > max2_5:
#         max2_5 = v["2_5"]

#     if v["10"] < min10:
#         min10 = v["10"]
#     elif v["10"] > max10:
#         max10 = v["10"]

# print(json.dumps(o))
# print(round(a1/24,2), round(a2_5/24,2), round(a10/24,2), "\n", min1, min2_5, min10, "\n", max1, max2_5, max10)


import requests

parameters = {'key': 'tf53h4gk5xlxqgmsu7c9h7uaoskhtq4iyi21q2i2',
              'place_id': 'postal-sk-84101'}

url = f"https://www.meteosource.com/api/v1/flexi/time_machine?place_id={parameters['place_id']}&date=2024-04-10&timezone=UTC&units=auto&key={parameters['key']}"

data = requests.get(url, parameters).json()

print(data)