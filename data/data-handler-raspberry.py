import json, random
from datetime import datetime

TPATH = "data/today.json"
TEMPATH = "data/temperature.json"
HUMPATH = "data/humidity.json"

def flush_jsonfiles():
    write_to_jsonfile(TPATH,{})
    write_to_jsonfile(TEMPATH,{})
    write_to_jsonfile(HUMPATH,{})

def read_from_jsonfile(path):
    with open(path,"r") as r:
        jsondata: list = json.load(r)
        r.close()
    return jsondata

def write_to_jsonfile(path,data):
    with open(path,"w") as w:
        json.dump(data, w)
        w.close()

def add_new_data(path,time, values):
    jsondata = read_from_jsonfile(path)
    jsondata[time] = values
    write_to_jsonfile(path,jsondata)
    print(f"Added data: {values} at {time} to {path}")
    if path==TPATH:
        if len(jsondata)==24:
            print(f"Archiveing data from {TPATH}")
            archive_data()

def archive_data():
    jsondata = read_from_jsonfile(TPATH)

    tems = {}
    hums = {}
    for k,v in jsondata.items():
        tems[k] = v["tem"]
        hums[k]= v["hum"]
    print(tems,hums)
    tmax, tmin = max(tems.values()), min(tems.values())
    hmax, hmin = max(hums.values()), min(hums.values())
    avgt = round(sum(map(lambda x : float(x), tems.values()))/len(tems), 2)
    avgh = round(sum(map(lambda x : float(x), hums.values()))/len(hums), 2)

    print((tmax,tmin),(hmax,hmin))

    add_new_data(TEMPATH, datetime.now().strftime("%Y-%m-%d"), {"values":tems, "max":tmax, "min":tmin, "avg":avgt})
    add_new_data(HUMPATH, datetime.now().strftime("%Y-%m-%d"), {"values":hums, "max":hmax, "min":hmin, "avg":avgh})

    write_to_jsonfile(TPATH,{})

def dearchive_last():
    tdata = read_from_jsonfile(TEMPATH)
    hdata = read_from_jsonfile(HUMPATH)
    tvalues = tdata[list(tdata.keys())[-1]]
    hvalues = hdata[list(hdata.keys())[-1]]
    for i,(t,h) in enumerate(list(zip(tvalues,hvalues))):
        add_new_data(TPATH,i,{"hum":h,"tem":t})

# Testing
# flush_jsonfiles()
# for i in range(12):
#     add_new_data(TPATH, i, {"tem":random.randint(0, 30),"hum":random.randint(40, 70)})

# dearchive_last()
# archive_data()