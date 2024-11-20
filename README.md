# 3A_Continuous_feedback_TW2024 - Aplicație Web pentru Acordarea de Feedback

## Descriere Generală

**Feedback3A** este o aplicație web care permite acordarea de feedback continuu pentru cursuri sau seminarii. Platforma este gândită pentru a încuraja interacțiunea în timp real între studenți și profesori, oferind posibilitatea de a colecta și analiza reacțiile participanților pe parcursul unei activități.

Aplicația utilizează o arhitectură modernă de tip **Single Page Application (SPA)** și este accesibilă de pe desktop, dispozitive mobile sau tablete. Sistemul este susținut de un back-end RESTful conectat la o bază de date relațională, și un front-end construit cu **React.js**.

---

## Obiective

- Realizarea unei aplicații web care facilitează feedback-ul anonim și continuu.
- Dezvoltarea unei soluții funcționale și ușor de utilizat pentru studenți și profesori.
- Integrarea unui serviciu extern opțional pentru extinderea funcționalităților.

---

## Funcționalități

### Pentru Profesori:
- Definirea activităților:
  - Specificarea unei date, descrieri și generarea unui cod unic de acces.
  - Setarea unei durate prestabilite pentru activități.
- Vizualizarea feedback-ului:
  - Acces la un dashboard care afișează reacțiile studenților în timp real și istoric.

### Pentru Studenți:
- Accesarea activităților:
  - Introducerea unui cod unic pentru participarea la activitate.
  - Interfață intuitivă
  - Posibilitatea de a trimite reacții multiple și anonime.

---

## Tehnologii Utilizate

### Back-End:
- **Spring Boot** pentru dezvoltarea rapidă a aplicației RESTful.
- **Spring Data JPA** pentru gestionarea operațiilor cu baza de date folosind un ORM.
- **Hibernate** ca implementare ORM pentru maparea obiect-relatională.
- **Bază de date relațională:** SQLite.
- **Spring Web** pentru crearea și expunerea endpoint-urilor REST.
- **Tool-uri de testare:** Postman pentru testarea API-urilor.

### Front-End:
- **React.js** pentru dezvoltarea interfeței SPA.
- Framework CSS (Bootstrap, Tailwind, Material UI) pentru un design responsiv.

---

## Arhitectură

1. **Back-End**:
   - Expune operații CRUD pentru entități:
     - **Activități**: ID, descriere, cod unic, dată, durată.
     - **Feedback**: ID, tip feedback (smiley, frowny, surprised, confused), timestamp, asociat unei activități.
   - Gestiunea bazelor de date cu ajutorul unui ORM.

2. **Front-End**:
   - Consumă API-ul REST pentru gestionarea activităților și feedback-ului.
   - Oferă o interfață interactivă și responsivă.

---

## Funcționalități Detaliate

### Entități:
- **Activitate**:
  - Atribute: `id`, `descriere`, `cod_unic`, `data`, `durata`.
  - Relație: Un profesor poate avea mai multe activități.
- **Feedback**:
  - Atribute: `id`, `tip_feedback`, `timestamp`, `activitate_id`.
  - Relație: Fiecare feedback este asociat unei activități.

### Operații REST:
- `GET /activitati`: Listarea activităților.
- `POST /activitati`: Crearea unei activități.
- `GET /feedback/:activitate_id`: Listarea feedback-urilor pentru o activitate.
- `POST /feedback`: Adăugarea unui feedback.

---

## Stil și Calitatea Codului

- Organizare clară a proiectului cu module structurate.
- Denumiri semnificative pentru variabile și metode.
- Respectarea standardului de naming (`camelCase`).
- Indentare corectă