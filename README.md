# UKS



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
kao i kreirati freeStyle project sa fazama:
- SCM poll na ovaj github: https://github.com/DusanBucan/UKS.git
- Docker build and push fazu za backend servis
- Docker build and push fazu za frontend servis
- Deploy kubernetes fazu u kojoj se prosledjuju fajlovi deployment-a koje je potrebno izmeniti
