# Open Music API
Seamlessly manage songs, albums, playlists, users, and collaborations. Built from the ground up for easy integration, this battle-tested API is ready to rock your project. Previously developed to fulfill submission assignments in a course.

## Getting Started
To clone this repository, run:
```shell
git clone  https://github.com/yosmisyael/open-music-api.git
```
After cloning, install required dependencies using:
```shell
npm run install
```
Configuring `.env` file, this application requires following key:
### Server
- `HOST` The hostname of the application environment.
- `PORT` The port number for the application.
### Database
- `PGUSER` The username used to authenticate with the PostgreSQL database.
- `PGPASSWORD` The password for the specified PostgreSQL user.
- `PGDATABASE` The name of the PostgreSQL database to connect to.
- `PGHOST` The hostname or IP address of the PostgreSQL database server.
- `PGPORT` The port number used to connect to the PostgreSQL database server.
### App key
- `ACCESS_TOKEN_KEY` The secret key used for signing access tokens.
- `REFRESH_TOKEN_KEY` The secret key used for signing refresh tokens.
- `REFRESH_TOKEN_KEY` The lifespan of an access token in seconds.
### Broker
- `RABBITMQ_SERVER` The hostname or IP address of the RabbitMQ server.
### Cache Database
- `REDIS_SERVER` The hostname or IP address of the Redis server.

To setup the database, run migrations files with:
```shell
npm run migrate up
```
To run unit test, run:
```shell
npm run test
```
To run the applications, use command:
```shell
npm run start:prod
```
This application require message consumer to handle playlist user export. Refer to [this repository](https://github.com/yosmisyael/open-music-api-queue-consumer) to install it.

## Features
### Core Music Management
- Album Management: Create, read, update, and delete albums.
- Song Management: Create, read, update, delete, and search songs.
- Playlist Management: Create, read, update, delete, and manage playlist content.
### User Interaction and Social Features
- Like Feature: Users can like albums.
- Collaboration: Users can collaborate on playlists, inviting others to contribute.
- User Management: User registration, authentication, and authorization for private resources.

## Built With
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)
![Redis](https://img.shields.io/badge/redis-%23DD0031.svg?style=for-the-badge&logo=redis&logoColor=white)
![RabbitMQ](https://img.shields.io/badge/Rabbitmq-FF6600?style=for-the-badge&logo=rabbitmq&logoColor=white)
![ESLint](https://img.shields.io/badge/ESLint-4B3263?style=for-the-badge&logo=eslint&logoColor=white)
