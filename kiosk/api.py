import requests
import json

serverUrl = "https://i4a102.p.ssafy.io:8080/app/"

def getStoreItem(storeID):
    res = requests.get(serverUrl + 'main/menulist/'+str(storeID))
    return res.json()


def getStoreInfo(storeID):
    res = requests.get(serverUrl + 'main/storedetail/' + str(storeID))
    return res.json()


def postKakaoPay(bag, totalAmount, totalCount, phoneNum):
    req = {}
    req['itemList'] = []
    req['cid'] = 'TC0ONETIME'
    req['contributorPhone'] = phoneNum
    req['isKiosk'] = 1
    for bagList in bag:
        tempItemList = {"itemCount": 1,
                        "itemId": bagList["itemId"],
                        "itemName": bagList["itemName"],
                        "itemPrice": bagList["itemPrice"],
                        "msg": "맛있게 드세요!",
                        "storeId": bagList["storeId"],
                        "support": bagList["isSupport"]}
        req['itemList'].append(tempItemList)
    req['totalAmount'] = totalAmount
    req['totalCount'] = totalCount
    req['userSeq'] = 0

    headers = {'Content-Type': 'application/json'}
    print(req)
    data = json.dumps(req, ensure_ascii=False).encode('utf-8')


    res = requests.post(serverUrl + 'payment/kakaopay',
                        headers=headers,
                        data=data)

    print(res.text)
    return res.text

def sendPgToken(pgToken):
    url = serverUrl + "payment/kakaopaySuccess?pg_token={pgToken}"\
        .format(pgToken=pgToken)
    print(url)
    res = requests.get(url)
    print(res)

