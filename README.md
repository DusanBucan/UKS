# UKS

## Dijagram klasa
![alt text](http://www.plantuml.com/plantuml/png/TL9BRzim3BxpLmWv1cYnNOSTEhH6KM1hYoHRZuPYCp4RFGoHMjSz_ljapLQM5BxO7_WzI8cwOj51eZNG6Csir5V6e7u1jT1gmVhPayCMq6eoiAF0KZjj4VR1nvwXJvuN7reWhdKZz1q7b39tkmnYZo6cH30wEOtVayimXnpTWwHEKalCv1tdGfRy6UUw9UdYTXokxxnusETItGU_8uDr30Pys6j7FxMa4B1ejocMoJK8V7Zj4UI5H8Pfo1sm9LVYDwZjlrEVT7qC_XaRUKjyIHrPlCDC2Ob1Q96RG7tkdM-rRhMaSiGCYlUptg9HCyR66n-AzDfRIt9S1t2qLeVN4qkdkKiETD6gZUR3Mf8oUQvNrQTDTGDtz_NZwk5sLQtN0rvLt-wg9xXvkA-cFjasDr6P_vWj2TKyGF0zEcnBq1CTQ0p27vBAUMCVVrzS_BT1E4ArU7zvkLoen2_U3IXl0eRFL2ZKj8qv-xncePP5aO_wGMbcSeZpEZK9etG-pEl67S7O-9mj3sL6aDlCSVcbG8cOocVcuLEeCs_UHqfDn3B_f_kvGjT6Q_u2)

## Arhitektura sistema
Na slici ispod je prikazana arhitektura klastera na kojem podigunta aplikacija kao i automatski proces uvodjenja <br> 
nove verzije aplikacije nakon izmena na develop grani.<br>
Krajnji korisnik moze da pristupi aplikaciji preko linka http://192.168.49.2:30007/
![alt text](https://github.com/DusanBucan/UKS/blob/release_2.0/devOps/UKS_arh2.jpeg)

### Unapredjenje u release2.0
- **Zamenjen Dockerfile za frontend tako da se angular aplikacija izbilda
i dodao kao skup statickih fajlova na nginx-alpine.**

- **Nginx-alpine je konfigurisan da:**
  -  za defaultnu rutu vraca index.html koji je angularov index.html 
  - da za putanje /apii/ radi reverse_proxy na backend-service-svc koji pogadja 
  Django aplikaciju

- **moguca su dalja unapredjenja konfiguracijom nginx servera:**
  - ssl
  - kesiranje sadrzaja
    - iako se sada front servira kao staticki sadrzaj sa nginx
    - mogu odgovori backend-a da se hesiraju npr (dobavljanje svih labela ili tako nesto
    sto se ne menja cesto)
  - ....

### Pokretanje klastera lokalno
Potrebno je instalirati:
- minkube
- kubectl
- jenkins
Nakon instalacije i pokretanja klastera potrebno je resurse iz foldera devOps (servise i deploymente) staviti na klaster.<br>

Za upotrebu jenkinsa potrebno je instalirati i podesiti verzije za plugine:
- Docker build and push
- Deploy to kubernetes

Nakon instalacije plugina kreirati freeStyle project sa fazama:
- SCM poll na ovaj github: https://github.com/DusanBucan/UKS.git
- Run Django tests
- Docker build and push fazu za backend servis
- Docker build and push fazu za frontend servis
- Deploy kubernetes fazu u kojoj se prosledjuju fajlovi deployment-a koje je potrebno izmeniti
- Send email to admin if tests fail
