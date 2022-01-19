import asyncio
import random
import datetime
import websockets
import json
import time

import seeed_dht

async def handler(websocket, path):
    sensor = seeed_dht.DHT(seeed_dht.DHT.DHT_TYPE["DHT11"], 5)
    humi_list = []
    temp_list = []
    
    while True:
        humi, temp = sensor.read()        
        print(f"Temp: {temp}, Humi: {humi}")
        data = {
            "labels": ["Temperature", "Humidity"],
            "datasets": [
                {
                    "label": "Temperature && Humidity",
                    "data": [temp, humi],
                },
            ]
        }
        await websocket.send(json.dumps(data))
        await asyncio.sleep(1)

start_server = websockets.serve(handler, "192.168.1.19", 5000)

asyncio.get_event_loop().run_until_complete(start_server)
asyncio.get_event_loop().run_forever()
