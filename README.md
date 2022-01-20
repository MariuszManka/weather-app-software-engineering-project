# Weather App - Frontend   [![Build Status](https://travis-ci.org/joemccann/dillinger.svg?branch=master)](https://travis-ci.org/joemccann/dillinger)

## Instalacja oraz uruchomienie warstwy Frontendu
### Aby uruchomić warstwę Frontendową naszej aplikacji potrzebujemy mieć zainstalowany na naszej lokalnej maszynie program [Node.js](https://nodejs.org/en/) w wersji co najmniej `16.13.2`

Gdy już spełnimy to wymaganie, ściągamy projekt na naszą lokalną maszynę. Możemy to zrobić używając polecenia:
```git
git clone https://github.com/MariuszManka/weather-app-software-engineering-project.git
``` 
z poziomu wybranego przez nas folderu. 

Gdy już projekt zostanie ściągnięty na nasz lokalny komputer, wydajemy z poziomu konsoli polecenie: 
``` cmd
npm install
``` 
Pozwoli to na natychmiastowe zainstalowanie niezbędnych do działania projektu paczek za pomocą jednej komendy. Następnie możemy już uruchomić nasz frontend poleceniem:
```python
npm start
```
**Po chwili powinna nam się otworzyć strona startowa projektu pod adresem: `127.0.0.1:3000`**   
***
## Dokumentacja aplikacji:
Aplikacja posiada `3 różne widoki`, korzystające z `3 różnych endpointów`, reprezentowane przez zakładki u góry strony. Szata graficzna pierwszych dwóch widoków jest bardzo podobna. jedyną różnicą są karty z prognozą pogody. Natomiast wygląd trzeciej zakładki nieco odbiega od reszty. Przedstawiony jest na nim wykres, którego dane generowane są w czasie rzeczywistym na podstawie danych otrzymywanych z serwera `WebSocket`. W pierwszych dwóch widokach istnieje możliwość interakcji ze stroną. W górnej części widoku, na środku udostępniona jest kontrolka, w której można wpisać nazwę miasta dla którego chcemy pobrać pogodę. Nazwa ta zostanie użyta jako parametr i przekazana do pythonowego serwera pogody z którego korzysta aplikacja. **Dzięki temu zawartość ekranu zostanie uzupełniona danymi dotyczącymi pogody dla wybranego przez nas miasta**. Nazwę miasta zatwierdzamy przyciskiem `Enter`. **Nazwy miast lub regionów można wprowadzać w języku polskim zwracając uwagę na poprawność wprowadzanych danych.** Na uwagę zasługuje również prawy panel z pierwszych dwóch zakładek, prezentujący dodatkowe informacje o pogodzie w formie ikonek. Po najechaniu kursorem myszy na daną ikonkę wyświetlona zostanie informacja o tym jakie dane są przez nią reprezentowane. W centralnej części ekranu wyświetlane są informacje o temperaturze. Dużą oraz pogrubioną czcionką prezentowane są dane o obecnej temperaturze. Mniejszą czcionką oznaczona jest informacja o najwyższym oraz najniższym odczycie temperatury danego dnia. 
***
## `Aktualna pogoda`
![Zakładka aktualna pogoda](https://github.com/MariuszManka/weather-app-software-engineering-project/blob/master/images/aktualna_pogoda.png)


#### **Zakładka korzysta z endpointu: :** `http://127.0.0.1:5000/api/v1/current-weather?q={city_name}` gdzie `city_name` to parametr mówiący o tym dla jakiego miasta pobieramy pogodę. Parametr ten pobierany jest z kontrolki.

***

## `Prognoza pogody`
![Zakładka prognoza pogody](https://github.com/MariuszManka/weather-app-software-engineering-project/blob/master/images/prognoza_pogody.png)


#### **Zakładka korzysta z endpointu: :** `http://127.0.0.1:5000/api/v1/forecast?q={city_name}` gdzie `city_name` to parametr mówiący o tym dla jakiego miasta pobieramy prognozę. Parametr ten pobierany jest z kontrolki.

***

## `Pogoda z czujnika`
![Zakładka pogoda z czujnika](https://github.com/MariuszManka/weather-app-software-engineering-project/blob/master/images/pogoda_z_czujnika.gif)


#### **Zakładka korzysta z endpointu: :** `ws://192.168.1.19:8888`.
W tym widoku dane pochodzą z serwera `WebSocket`. Na podstawie odświeżających się z częstotliwością `5-ciu sekund` danych rysowany jest wykres przedstawiający rozkład temperatury (`czerwona linia`) oraz wilgotności powietrza (`niebieska linia`) w czasie. 

