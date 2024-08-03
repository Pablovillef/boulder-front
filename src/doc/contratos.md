# Contratos Front-Back

## Vista Invitado

- Post Usuario: El invitado podrá crearse un usuario para poder subir videos.
    - POST http://localhost:8080/api/v1/user/enrollment
    - JSON Request
      {
      "name": "Pablo",
      "surname": "Villegas",
      "email": "pablovillef@gmail.com",
      "password": "pass"
      }

    - JSON Response
      {
      "idUser": 1,
      "name": "Pablo",
      "surname": "Villegas",
      "email": "pablovillef@gmail.com",
      "password": "pass"
      }

## Vista Cliente

- Get Rocódromos: Al dar al botón ver rocódromos. Para ver la lista de rocódromos.
    - GET http://localhost:8080/api/v1/boulders

    - JSON Response
      [
      {
      "idBoulder": 1,
      "name": "RascaMuros",
      "address": "C/Santa Lucia, 22",
      "locality": "Muriedas",
      "mail": "RascaMuros@gmail.com",
      "phone": "942 222 222",
      "phone2": null
      }
      ]


- Get Vias: Para ver la lista de vías de un rocódromo seleccionado.
    - GET http://localhost:8080/api/v1/boulder/{idBoulder}/routes

    - JSON Response
      [
      {
      "idRoute": 1,
      "qrRoute": "Rascamuros/1",
      "name": "Via 1",
      "type": "BOULDER",
      "num_nivel": 1,
      "presa": "Naranja",
      "creationDate": "2024-08-03T08:41:47.767+00:00"
      } ...
      ]


- Get Vía: Para ver los datos de la via clickada, incluida su biblio de videos. Además, a través del QR, dependiendo del dato leído, haremos un getVia para mostrar sus datos y videos.
    - GET http://localhost:8080/api/v1/boulder/{idBoulder}/route/{idRoute}

    - JSON Response
      {
      "idRoute": 1,
      "qrRoute": "Rascamuros/1",
      "name": "Via 1",
      "type": "BOULDER",
      "num_nivel": 1,
      "presa": "Naranja",
      "creationDate": "2024-08-03T08:41:47.767+00:00",
      "videos": [
      {
      "id": 1,
      "title": "MiVideo_1_Titulo",
      "description": "Escalando via 1",
      "url": "youtube.com"
      }
      ]
      }


- Get Usuario: Para ver los videos que ha subido un usuario. En la lista de videos puede hacer click en su nombre.
    - GET http://localhost:8080/api/v1/users/{idUser}
    
    - JSON Response
      {
      "idUser": 1,
      "name": "Pablo",
      "surname": "Villegas",
      "email": "pablovillef@gmail.com",
      "videos": [
      {
      "id": 1,
      "title": "MiVideo_1_Titulo",
      "description": "Escalando via 1",
      "url": "youtube.com"
      }
      ]
      }


- Post Video: Un usuario podrá subir un video de una via, mediante un botón.
    - POST http://localhost:8080/api/v1/boulder/via/video/add?userId=1

    - JSON Request
     {
      "title": "MiVideo_1_Titulo",
      "description": "Escalando via 1",
      "url": "youtube.com",
      "idRoute": "1"
      }

    - JSON Response
      {
      "id": 1,
      "title": "MiVideo_1_Titulo",
      "description": "Escalando via 1",
      "url": "youtube.com",
      "user": {
      "idUser": 1,
      "name": "Pablo",
      "surname": "Villegas",
      "email": "pablovillef@gmail.com",
      "password": "pass"
      },
      "route": {
      "idRoute": 1,
      "qrRoute": "Rascamuros/1",
      "name": "Via 1",
      "type": "BOULDER",
      "num_nivel": 1,
      "presa": "Naranja",
      "creationDate": "2024-08-03T08:41:47.767+00:00",
      "boulder": {
      "idBoulder": 1,
      "name": "RascaMuros",
      "address": "C/Santa Lucia, 22",
      "locality": "Muriedas",
      "mail": "RascaMuros@gmail.com",
      "phone": "942 222 222",
      "phone2": null
      }
      }
      }

## Vista Trabajador

- Get Vías: Para ver la lista de vías del rocódromo donde trabaja.
  - Ver Get Vias Vista Cliente.


- Post Via: Crear un nueva via del rocódromo donde trabaja.

    - POST http://localhost:8080/api/v1/boulder/via/enrollment

    - JSON Request
      {
      "idBoulder": "1",
      "qrRoute": "Rascamuros/1",
      "name": "Via 1",
      "type": "BOULDER",
      "num_nivel": 1,
      "presa": "Naranja"
      }

    - JSON Response
      {
      "idRoute": 1,
      "qrRoute": "Rascamuros/1",
      "name": "Via 1",
      "type": "BOULDER",
      "num_nivel": 1,
      "presa": "Naranja",
      "creationDate": "2024-08-03T08:41:47.767+00:00",
      "boulder": {
      "idBoulder": 1,
      "name": "RascaMuros",
      "address": "C/Santa Lucia, 22",
      "locality": "Muriedas",
      "mail": "RascaMuros@gmail.com",
      "phone": "942 222 222",
      "phone2": null
      }
      }


- Put Via: Editar una via del rocodromo donde trabaja.


- Delete Via: Deshabilitar una via del rocodromo donde trabaja.


- Delete Video: Borrar un video de una via del rocodromo donde trabaja.

## Admin

- Post Rocodromo: Crear rocódromo.

    - POST http://localhost:8080/api/v1/boulder/enrollment

    - JSON Request
      {
      "name": "RascaMuros",
      "address": "C/Santa Lucia, 22",
      "locality": "Muriedas",
      "mail": "RascaMuros@gmail.com",
      "phone": "942 222 222"
      }

    - JSON Response
      {
      "idBoulder": 1,
      "name": "RascaMuros",
      "address": "C/Santa Lucia, 22",
      "locality": "Muriedas",
      "mail": "RascaMuros@gmail.com",
      "phone": "942 222 222",
      "phone2": null
      }
