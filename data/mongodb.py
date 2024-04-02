from pymongo import MongoClient
class Mongo:
    def __init__(self):
        self.client = MongoClient("mongodb+srv://raspberry_user:pi666@apfcluster.aadktdb.mongodb.net/")
        self.db = self.client.vilo
        self.collection = self.db["test_collection"]

    def insert_to_collection(self, collection, data: object):
        self.db[collection].insert_one(data)

# Testing
# m = Mongo()

# inserting document
# m.insert_to_collection("test_collection", {"temperature": 1, "humidity":2, "pressure":3})

# printing data from collection
# for doc in m.collection.find():
#     print(doc)

