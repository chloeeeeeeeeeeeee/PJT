import requests
import json
import datetime

serverUrl = "https://ooriggini.me:8080/app/"

def getStoreItem(storeID):
    res = requests.get(serverUrl + 'main/menulist/'+str(storeID))
    return res.json()


def getStoreInfo(storeID):
    res = requests.get(serverUrl + 'main/storedetail/' + str(storeID))
    return res.json()


def postKakaoPay(bag, totalAmount, totalCount, phoneNum):
    req = {}
    req['cid'] = 'TC0ONETIME'
    req['contributorPhone'] = phoneNum
    req['isKiosk'] = 1
    req['itemList'] = bag
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
    print(res.text)

def sendCreditCard(an, bag, totalAmount, totalCount, phoneNum):
    d = datetime.datetime.today()
    date = d.strftime('%Y%m%d-%I%M%S')
    req = {}
    req['approvalNumber'] = an
    req['contributorPhone'] = phoneNum
    req['itemList'] = bag
    req['paidAt'] = date
    req['totalAmount'] = totalAmount
    req['totalCount'] = totalCount

    headers = {'Content-Type': 'application/json'}
    print(req)
    data = json.dumps(req, ensure_ascii=False).encode('utf-8')


    res = requests.post(serverUrl + 'payment/creditcard',
                        headers=headers,
                        data=data)
    print(res.text)


def sendGdreamCard(an, bag, totalCount, totalAmount):
    d = datetime.datetime.today()
    date = d.strftime('%Y%m%d-%I%M%S')
    req = {}

    req['gdreamApproval'] = an
    req['itemList'] = bag
    req['paidAt'] = date
    req['totalCount'] = totalCount
    req['totalGDreamAmount'] = totalAmount

    headers = {'Content-Type': 'application/json'}
    print(req)
    data = json.dumps(req, ensure_ascii=False).encode('utf-8')

    res = requests.post(serverUrl + 'payment/creditcard',
                        headers=headers,
                        data=data)

    print(res.text)
