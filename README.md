# Weather App - Software Engineering Project [![Build Status](https://travis-ci.org/joemccann/dillinger.svg?branch=master)](https://travis-ci.org/joemccann/dillinger)


### Mariusz Mańka - Tymoteusz Małkowski - Damian Ludwig
### Informatyka - niestacjonarnie - V semestr
### Politechnika Śląska - Wydział Matematyki Stosowanej 
### Inżynieria oprogramowania - Projekt zaliczeniowy

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
| ------ | ------ | ------ | ------ |
| recharts | 2.1.8 | **JavaScript** | [recharts.org](https://recharts.org/en-US/) |
| lodash | 4.17.21 | **JavaScript** | [lodash.com](https://lodash.com/) |
| momentjs | 2.29.1 | **JavaScript** | [momentjs.com/docs](https://momentjs.com/docs/) |
| react-swipeable-views | 0.14.0 | **JavaScript** | [react-swipeable-views.com](https://react-swipeable-views.com/) |
| @mui/material | 5.2.8 | **JavaScript** | [mui.com](https://mui.com/) |
***
## Ważne pojęcia:
### `WebSocket`
Aplikacja w zakładce `Pogoda z czujnika` łączy się z serwerem opartym na protokole `WebSocket`. 
Aby dobrze zrozumieć czym jest `WebSocket` warto wspomnieć o problemie który ten protokuł rozwiązuje. Klasyczny model komunikacji Klient - Serwer, zakłada że to klient wysyła zapytanie do serwera z prośbą o zwrócenie mu interesujących go danych. Serwer to żądanie przetwarza i wysyła dane o które klient prosi, lub komunikat o błędzie gdy coś pójdzie źle. Jednak bezpośrednia komunikacja w drugą stronę nie jest możliwa w tym modelu - **serwer nie może sam ustanowić połączenia z klientem na przykład w celu powiadomienia go że dane które posiada uległy zmianie.**. Klient chcąc dowiedzieć się czy posiada najbardziej aktualne dane, musi wysłać żądanie i czekać na odpowiedź z serwera. Taka sytuacja robi się **uciążliwa w przypadku gdy dane na serwerze zmieniają się z dużą częstotliwością.** Chcąc mieć ich aktualną wersję klient wysyła do serwera powtarzające się żądania i sprawdza, czy jest jakaś nowa wiadomość do odebrania. Nie jest to zbyt wydajne.  
Ten problem rozwiązuje protokół `WebSocket`. Pozwala on na otwarcie interaktywnej sesji komunikacyjnej pomiędzy klientem a serwerem. Dzięki temu API **może wysłać wiadomość do serwera oraz otrzymać od niego odpowiedzi jako zdarzenia, bez konieczności ponownego odpytywania o nie serwera**. Technologia ta pozwala serwerowi na powiadamianie klienta o tym że posiadane przez niego uległy zmianie i muszą zostać zaktualizowane. Umożliwia również swobodną wymianę wiadomości między klientem a serwerem bez zbytniej straty wydajności.   
Działanie tego protokołu jest proste: aby ustanowić połączenie typu `WebSocket`, klient musi najpierw wysłać żądanie typu `handshake`, dla którego serwer zwraca odpowiednią odpowiedź - zgadzając się na tego typu połącznie lub je odrzucając. Gdy już połącznie zostanie nawiązane, klient i serwer mogą swobodnie wymieniać między sobą wiadomości. Gdy sesja ma zostać zakończona, połączenie `handshake` jest zrywane. Na poniższym obrazku dobrze widać schemat działania połączenia typu `WebSocket`:


| ![Websocket](https://github.com/MariuszManka/weather-app-software-engineering-project/blob/master/images/websocket_connection.png) | 
|:--:| 
| **1. Schemat połączenia typu `WebSocket`** |

**W naszej aplikacji protokół ten został wykorzystany w celu aktualizacji danych dotyczących odczytów temperatury oraz wilgotności z czujnika.** Komunikacja przebiega więc jednostronnie (serwer -> klient). Gdy serwer dokona odczytu aktualnych danych z czujnika, wysyła je od razu za pomocą protokołu `WebSocket` do frontendu, aby ten mógł na nie należycie zareagować odświeżając informacje na stronie oraz aktualizując wykres. 
