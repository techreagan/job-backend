# Jobs Board API

Job board

## API Documentation

API documentation with examples response: [API](https://documenter.getpostman.com/view/9407876/UVXjLGKn)

## Configuration File

Rename .env.example to .env in the config folder - Modify the .env file to your environment variable

```ENV
NODE_ENV=development
PORT=3001

DB_USER=
DB_PASS=
DB_NAME=
DB_HOST=
DB_DIALECT=
```

## Installation

Install all npm dependecies

```console
npm install
```

Install nodemon globally

```console
npm install -g nodemon
```

Install sequelize cli globally

```console
npm install -g sequelize-cli
```

Make sure you create your database, if not you can run this command to create the database

```console
sequelize db:create
```

Run migrations to setup the database

```console
sequelize db:migrate
```

## Run App

```console
node run dev
```

## License

This project is licensed under the MIT License
