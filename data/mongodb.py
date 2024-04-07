from pymongo import MongoClient
import datetime
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