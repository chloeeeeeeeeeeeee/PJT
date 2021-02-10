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
    req['itemList'] = itemList
    req['totalAmount'] = totalAmount
    req['totalCount'] = totalCount
    req['isUser'] = 0
    req['contributor'] = {}
    req['contributor']['contributorName'] = ''
    req['contributor']['contributorGender'] = ''
    req['contributor']['contributorBirth'] = ''
    req['contributor']['contributorPhone'] = phoneNum

    headers = {'Content-Type': 'application/json'}
    print(req)
    data = json.dumps(req, ensure_ascii=False).encode('utf-8')


    res = requests.post('http://i4a102.p.ssafy.io:8080/app/payment/kakaopay',
                        headers=headers,
                        data=data)
    print("response", res)
    print("Header", res.headers)
    print("Body", res.content)
    return res.text


