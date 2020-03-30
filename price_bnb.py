import requests
import json

r = requests.get('https://dex.binance.org/api/v1/ticker/24hr?symbol=MTXLT-286_BNB')

if r.status_code == 200:
    print('Success!')
else:
    print('Error has occured')    
    
packages_json = r.json()

tixlPrice = packages_json[0]['lastPrice']

packages_str = json.dumps(packages_json, indent=2)

print('MTXLT price is ' + tixlPrice + ' BNB')
