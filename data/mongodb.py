from pymongo import MongoClient

client = MongoClient("mongodb+srv://raspberry_user:pi666@apfcluster.aadktdb.mongodb.net/")

db = client.vilo
db.create_collection("test_collection")
collection = db.test_collection


# inserting document

print(collection.insert_one({"user":"raspberry_user", "message":"test message"}))

# printing data from collection
# for date in temperature_data.find():
#     print(date)