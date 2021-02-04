import requests

def getStoreItem(storeID):
    res = requests.get("http://i4a102.p.ssafy.io:8080/app/main/menulist/"+str(storeID))
    return res.json()