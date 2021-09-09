## Groupomania Corporate Social Network

A corporate social network

<img width="1258" alt="Capture d’écran 2021-08-08 à 12 53 16" src="https://user-images.githubusercontent.com/56540121/132663245-dcac742b-7edc-490a-946e-985d9180640e.png">
<img width="1258" alt="Capture d’écran 2021-08-08 à 12 53 32" src="https://user-images.githubusercontent.com/56540121/132663259-26022c56-58cf-49f3-84ac-ef8513c95fd6.png">
<img width="1258" alt="Capture d’écran 2021-08-08 à 12 55 17" src="https://user-images.githubusercontent.com/56540121/132663264-fe2cbc17-b81b-488b-805b-c7588866cb10.png">
<img width="1258" alt="Capture d’écran 2021-08-08 à 12 55 28" src="https://user-images.githubusercontent.com/56540121/132663269-f3921f99-a137-4663-8e2c-9d0fc8b00508.png">

## Stack

Frontend :

- React.js
- Axios
- Local Storage

Backend :

- Node.js
- Express
- dotenv
- Mysql

## Features

- Create , delete a profile
- Create , delete a post
- Reply to a post
- Adding Gifs and images
- Account administration management
- Fully responsive
- Mobile notifications

## Try it locally

1. Git clôner le projet

2. Installez les dépendances comme pour n'importe quel projet(assurez vous d’avoir mySql)

3. Dans le dossier backend => config => config.json mettez-y votre username et votre mot de passe pour la base de donnée development

4. créer localement la base de donnée « groupomania_development »

5. Dans l'invite de commande déplacez vous dans le dossier backend : cd backend , tapez sequelize db:create , puis sequelize db:migrate , (assurez vous que sequelize-cli est bien installé)

6. Dans le dossier backend => models => index.js suivez les instructions pour créer un compte modérateur , enregistrez les modifications , puis lancer nodemon.

7. Pour le frontend déplacez vous dans le dossier frontend à l’aide de la commande cd frontend puis npm start

8. Vous pouvez maintenant vous connecter avec votre compte modérateur ou créer un autre compte normal
