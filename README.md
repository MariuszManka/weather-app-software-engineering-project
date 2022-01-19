# Weather App - Backend  [![Build Status](https://travis-ci.org/joemccann/dillinger.svg?branch=master)](https://travis-ci.org/joemccann/dillinger)

## Instalacja oraz uruchomienie serwera API
### Aby uruchomić serwer aplikacji wymaganym jest posiadanie środowiska **Python w wersji co najmniej 3.7.x lub wyższej!**
Aby uruchomić serwer API ściągamy projekt na naszą lokalną maszynę. Możemy to zrobić używając polecenia:
```git
git clone https://github.com/MariuszManka/weather-app-software-engineering-project.git
``` 
z poziomu wybranego przez nas folderu. 
Gdy już projekt zostanie ściągnięty na nasz lokalny komputer, wydajemy z poziomy konsoli polecenie: 
```python
pip install -r ./requirements.txt
``` 
Pozwoli to na natychmiastowe zainstalowanie niezbędnych do działania projektu paczek za pomocą jednej komendy.  Następnie możemy już uruchomić nasz serwer poleceniem:
```python
python ./weather_app_api.py
```
**Od tego momentu możemy już korzystać z serwera łącząc się z endpointami które dostarcza.   
Bazowy adres naszego serwera to: `http://127.0.0.1:5000/api/1/`**
***

## Instalacja oraz uruchomienie serwera WebSocket
### Do poprawnego działania serwera `WebSocket` wymagane jest posiadanie płytki **Raspberry Pi** z **zainstalowanym interpreterem pythona w wersji co najmniej `3.7.0`**, nakładką **[Grove Base HAT](https://wiki.seeedstudio.com/Grove_Base_Hat_for_Raspberry_Pi/)** a ponadto kompatybilnym z nią czujnikiem temperatury oraz wilgotności **[Grove Temp&Humi Sensor DHT11](https://wiki.seeedstudio.com/Grove-TemperatureAndHumidity_Sensor/)**

Na samym początku należy poprawnie umieścić nakładkę `Grove Base HAT` na płytce `Raspberry Pi`. Nastepnie właściwym przewodem połączyć czujnik temperatury `Grove Temp&Humi DHT11` z portem `D5` na nakładce `Grove Base HAT`. Po tej operacji należy uruchomić `Raspberry Pi`.  Gdy już to zrobimy wcześniej omawianymi poleceniami pobieramy projekt do wybranej przez nas lokacji i przechodzimy do nastepnego kroku.

Aby uruchomić serwer `WebSocket` przechodzimy do folderu `routes` następującym poleceniem:
```cmd
  cd routes
```
Następnie uruchamiamy nasz serwer poleceniem: 
``` cmd
python raspberry_weather_api.py
```

Od tego momentu serwer `WebSocket` zostanie uruchomiony pod adresem: `ws://192.168.1.19:8888`, gdzie `192.168.1.19` należy zastąpić adresem IP naszego `Raspberry Pi`, który sprawdzimy wydając polecenie `ifconfig` w konsoli.
***
## Dokumentacja Serwera API:
Aplikacja bazowo działa na lokalnym serwerze pod adresem: `http://127.0.0.1:5000/api/v1/`. 
**Serwer dostarcza 3 różne endpointy:**
#### `/forecast`
```
http://127.0.0.1:5000/api/v1/forecast?q={city_name}&cnt={cnt}
```
##### **Opis parametrów:**
#
| Parametr | Wymagany/Opcjonalny | Domyślnie | Opis |
| ------ | ------ | ------ | ------ |  
| `q` | **Opcjonalny** | *Warsaw* | Nazwa miasta dla którego chcemy pobrać prognozę. Można przekazać zarówno nazwę miasta, jak również kod kraju w formacie IOS3166. Nazwę kraju można podawać **nie tylko** w języku angielskim, a odpowiedź interfejsu API zostanie zwrócona w tym samym języku, co język żądanej nazwy lokalizacji. W bazie API z którego korzystamy znajduje się ponad 200 000 lokalizacji |
| `cnt` | **Opcjonalny** | *10* | Parametr ten określa liczbę "odstępów czasowych" zwróconych przez API. W praktyce jest to liczba obiektów która zostanie zwrócona w celu prognozy pogody. Inaczej ten parametr można traktować jako **dokładność prognozy**, lub **odstęp czasowy w jakim ma być podana prognoza** |

#### `/current-weather`
```
http://127.0.0.1:5000/api/v1/current-weather?q={city_name}
```
##### **Opis parametrów:**
#
| Parametr | Wymagany/Opcjonalny | Domyślnie | Opis |
| ------ | ------ | ------ | ------ |  
| `q` | **Opcjonalny** | *Warsaw* | Nazwa miasta dla którego chcemy pobrać prognozę. Można przekazać zarówno nazwę miasta,                                      jak również kod kraju w formacie IOS3166. Nazwę kraju można podawać **nie tylko** w języku angielskim, a odpowiedź interfejsu API zostanie zwrócona w tym samym języku, co język żądanej nazwy lokalizacji. W bazie API z którego korzystamy znajduje się ponad 200 000 lokalizacji |


## Dokumentacja Serwera `WebSocket`:
Serwer bazowo działa na lokalnej maszynie pod adresem `ws://192.168.1.19:8888`, gdzie `192.168.1.19` to w sieci lokalnej naszego `Raspberry`.
**Serwer działa za pomocą jednego endpointa:** `ws://192.168.1.19:888/`.

##### **Opis:**
Serwer bazujący na protokole komunikacyjnym `WebSocket`. Zapewnia on dwukierunkowy kanał wymiany danych poprzez pojedyncze połączenie TCP. Inaczej niż w tradycyjnym połączeniu klient-serwer gdzie otrzymujemy dane jednorazowo - później połączenie jest zamykane - w protokole `WebSocket` **raz otwarte połączenie pomiędzy klientem a serwerem pozwala na ciągłą wymianę danych** do czasu gdy klient bądź serwer zerwią to połączenie. W naszym przypadku klient nie wysyła żadnych danych do serwera, oczekuje jedynie na aktualizację danych pochodzących z czujnika temperatury i wilgotności podłączonego do płytki Raspberry Pi. Dane są zwracane klientowi w interwałach   
`5-cio sekundowych` w formacie przedstawionym poniżej:

```json
{
"dt": {timestamp}, 
"dt_txt": {YYYY-MM-DD HH:MM:SS}, 
"humidity": {humi}, 
"temp": {temp}
}
```

**gdzie:**
- `dt` - Timestamp
- `dt_text` - Obecna data i czas w formacie: YYYY-MM-DD HH:MM:SS
- `humidity` - Obecny odczyt wilgotności z czujnika
- `temp` - Obecna temperatura

***
