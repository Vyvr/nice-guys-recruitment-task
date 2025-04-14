# Opis zadania

Zadanie rekrutacyjne Nice Guys

Stwórz prostą stronę, która wyświetla dane pobrane z API.

1. Skorzystaj z API https://jsonplaceholder.typicode.com/users do wyświetlenia kafelków użytkowników.

2. Stwórz switch służący do zmiany roli użytkownika (imitacja logowania się).

3. Na stronie głównej wyświetl kafelki użytkowników, pamiętając o RWD.

4. Po kliknięciu na kafelek strona przenosi na podstronę użytkownika
   - wyświetl tylko name, username, email i address.
   - Tylko admin widzi użytkowników od id 7 do id 10.
   - Tylko admin widzi dane adresowe wszystkich użytkowników.
5. Stwórz formularz umożliwiający dodanie nowego użytkownika (tylko name, username i email) używając metody POST (przez to, że nie jest to realne API, dodaj tego użytkownika do stanu aplikacji żeby był widoczny na liście).

---

Zarządzanie stanem, routing, stylowanie - dowolność.
Mile widziane korzystanie z paczek.

Opcjonalne:

1. Dodaj paginację na stronę główną.
2. Zamień switch do logowania na mini panel do logowania admina (login i hasło hardcoded)
3. Dodany użytkownik będzie widoczny po odświeżeniu strony.
4. Możliwość filtrowania po "name"
5. Możliwość filtrowania po name, username lub emailu. (wyklucza się z 4).
