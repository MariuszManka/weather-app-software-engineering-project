# Weather App - Software Engineering Project [![Build Status](https://travis-ci.org/joemccann/dillinger.svg?branch=master)](https://travis-ci.org/joemccann/dillinger)

Aplikacja została stworzona na potrzeby przedmiotu **"Inżynieria oprogramowania"** jako projekt zaliczeniowy. 
Serwer aplikacji został napisany w języku **Python** z wykorzystaniem biblioteki **Flask**. Warstwa wizualna łącząca się z pythonowym API została napisana w języku **Java**. W aplikacji wykorzystaliśmy  zewnętrzne API w celu uzyskania szczegółowych informacji o pogodzie. **API to pochodzi ze strony: [openweathermap.org]( https://openweathermap.org/api)** i pozwala nam na zebranie informacji o obecnym stanie pogody, oraz prognozie na najbliższe 3 dni dla podanego przez nas miasta. W projekcie również korzystamy z **Raspberry Pi w wersji 3 B+** wraz z nakładką **Grove Base HAT** oraz kompatybilnym z nią czujnikiem temperatury oraz wilgotności - **Grove Temp&Humi Sensor DHT11**. 

***
## Funkcjonalności 
Aplikacja posiada 3 główne funkcjonalności: 
1. **3-dniowa prognoza pogody** dla miasta podanego przez użytkownika oraz z zadaną przez niego dokładnością
2. **Aktualna pogoda** w mieście podanym przez użytkownika
3. **Temperatura oraz wilgotność powietrza** odczytywana "na żywo" z czujnika podpiętego do Raspberry
***
## Używane biblioteki:
| Biblioteka | wersja  | Język programowania | Dokumentacja | 
| ------ | ------ | ------ | ------ |
| Flask | 1.0.2 | **Python** | [flask.palletsprojects.com](https://flask.palletsprojects.com/en/2.0.x/) |
| Requests | 2.21.0 | **Python** | [docs.python-requests.org](https://docs.python-requests.org/en/latest/) |
| Seeed_python_dht | 0.0.2 | **Python** | [github.com/Seeed-Studio](https://github.com/Seeed-Studio/Seeed_Python_DHT) |
| Websockets | 10.0 | **Python** | [websockets.readthedocs.io](https://websockets.readthedocs.io/en/stable/) |
| Werkzeug | 0.14.1 | **Python** | [werkzeug.palletsprojects.com](https://werkzeug.palletsprojects.com/en/2.0.x/) |
***

## Instalacja
##### Aby uruchomić serwer aplikacji wymaganym jest posiadanie środowiska **Python w wersji co najmniej 3.7.x lub wyższej!**
Aby uruchomić serwer API ściągamy projekt na naszą lokalną maszynę. Możemy to zrobić używając polecenia:
```git
git clone https://github.com/MariuszManka/weather-api-project.git
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
**Od tego momentu możemy już korzystać z serwera łącząc się z endpointami które dostarcza.**
***

## Dokumentacja Serwera:
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


#### `ws://localhost:5000`
```
ws://localhost:5000
```
##### **Opis:**
Endpoint bazujący na protokole komunikacyjnym `WebSocket`. Zapewnia on dwukierunkowy kanał wymiany danych poprzez pojedyncze połączenie TCP. Inaczej niż w tradycyjnym połączeniu klient-serwer gdzie otrzymujemy dane jednorazowo - później połączenie jest zamykane - w protokole `WebSocket` **raz otwarte połączenie pomiędzy klientem a serwerem pozwala na ciągłą wymianę danych** do czasu gdy klient bądź serwer zerwią to połączenie. W naszym przypadku klient nie wysyła żadnych danych do serwera, oczekuje jedynie na aktualizację danych pochodzących z czujnika temperatury i wilgotności podłączonego do płytki Raspberry Pi. Dane są zwracane klientowi w interwałach `5-cio sekundowych` w formacie przedstawionym poniżej:
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
