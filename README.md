# UKS

## Dijagram klasa
![alt text](http://www.plantuml.com/plantuml/png/bL9BRzim3BxpLmWv1cYnNOSTEhH6KM1hYoHRZuPYCmaRFGoHMjSz_liamLRM5JxqOd_Wzo0bwe951udMG6Sqir9V6OFw1TH3hmNRHqyEUq2hoS2E0alhj4NO1ny7XY5vddpeWRZLdT1tp2XbxdO5n053J8bWT78QloUNu1HItLdI9gabPlAEIw58_enpNPCSudOSRZXuyR0lfNO8VaS6snWC-B3NZdvgII5WqMvJB9Fh4FZuF2384udaQSWTiITNupUeRJarlEXw7_mZTlAQ-486MRp3GWc9GUYHkq13wLrkjUsrf7B40ghtizwYKJF6pXiVglJIMqjoMWTmj5Q7vnUMW-P3Sg2BLcqq7zUIbCbpkMe-RPehkBbjxrTtrwjclSvurNoxQHxWwkwsgNsoRMwYElyfMn9gEKFm0phiQz037MaCmX-IocLZ7t-VdVspGJX1jNX_VhvSgCGltXMKDm7vCnKgDMrZpZwlMQXbLPIZVb2QcHpYl4vDmYW77-PruuvWRFmsjZwZEK4UOeuhxmXgn5J-pvm_hwZHMxQLKXEnpFzwUnVe-cZDNm00)

## Arhitektura sistema
Na slici ispod je prikazana arhitektura klastera na kojem podigunta aplikacija kao i automatski proces uvodjenja <br> 
nove verzije aplikacije nakon izmena na develop grani.<br>
Krajnji korisnik moze da pristupi aplikaciji preko linka http://192.168.49.2:30007/
![alt text](https://github.com/DusanBucan/UKS/blob/doc_cluster/devOps/UKS_arh.jpeg)

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
