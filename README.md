# 💬 Nest-Chat-Websocket

Application de messagerie en temps réel développée avec Angular 19 pour le frontend et NestJS pour le backend. Elle permet aux utilisateurs de s’inscrire, se connecter, envoyer des messages et voir les messages des autres en temps réel grâce à WebSocket.

---

## 🧰 Technologies utilisées

- **Frontend** : Angular 19, TailwindCSS, RxJS Signals, WebSocket
- **Backend** : NestJS, TypeORM, PostgreSQL, WebSocket (Socket.IO)
- **Base de données** : PostgreSQL
- **Conteneurisation** : Docker & Docker Compose

---

## 🚀 Lancer le projet

### Prérequis

- Docker & Docker Compose
- Port 3000 et 4200 libres sur la machine

### Étapes

1. **Cloner le dépôt**

```bash
git clone <url-du-dépôt>
cd Nest-Chat-Websocket
```

2. **Lancer le conteneur**
```bash
docker-compose up --build
```

Le frontend Angular sera accessible sur : http://localhost:4200<br>
L'API NestJS sera disponible sur : http://localhost:3000/api/v1

## 👥 Tester le chat en temps réel
Pour tester l’échange de messages en direct entre utilisateurs :
1. Ouvrir deux fenêtres ou onglets de navigateur :
   - Une en navigation normale.
   - L’autre en navigation privée/incognito (important pour éviter les conflits de session).

2. Créer deux comptes différents via la page d'inscription.

3. Envoyer des messages depuis un utilisateur :<br>
✅ Le second utilisateur doit recevoir les messages en temps réel, sans rechargement de page.

4. Modifier la couleur du profil depuis les paramètres utilisateur et vérifier son impact visuel sur les messages.
