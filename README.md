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
