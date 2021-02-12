import requests
import json


def getStoreItem(storeID):
    res = requests.get('http://i4a102.p.ssafy.io:8080/app/main/menulist/'+str(storeID))
    return res.json()


def getStoreInfo(storeID):
    res = requests.get('http://i4a102.p.ssafy.io:8080/app/main/storedetail/' + str(storeID))
    return res.json()


def postKakaoPay(itemList, totalAmount, totalCount, phoneNum):
    req = {}
    req['cid'] = 'TC0ONETIME'
    req['contributorPhone'] = phoneNum
    req['isKiosk'] = 1
    req['itemList'] = itemList
    req['totalAmount'] = totalAmount
    req['totalCount'] = totalCount
    req['userSeq'] = 0

    headers = {'Content-Type': 'application/json'}
    print(req)
    data = json.dumps(req, ensure_ascii=False).encode('utf-8')


    res = requests.post('http://i4a102.p.ssafy.io:8080/app/payment/kakaopay',
                        headers=headers,
                        data=data)

    print(res.text)
    return res.text

def sendPgToken(pgToken):
    url = "http://i4a102.p.ssafy.io:8080/app/payment/kakaopaySuccess?pg_token={pgToken}"\
        .format(pgToken=pgToken)
    res = requests.get(url)

