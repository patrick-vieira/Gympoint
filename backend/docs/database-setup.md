
# We will use sequelize as our ORM. All data manipulation will be made on code (javascript).

## install dependencies:

  > sequelize

    yarn add sequelize
    yarn add sequelize-cli -D

  > postgres

    yarn add pg
    yarn add pg-hstore


## Configurations:

  First we create a file called `.sequelizerc` on the root folder, this file define where our configuration files are located.

  ``` js
    const { resolve } = require('path');

    module.exports = {
      config: resolve(__dirname, 'src', 'config', 'database.js'),
      'models-path': resolve(__dirname, 'src', 'app', 'models'),
      'migrations-path': resolve(__dirname, 'src', 'database', 'migrations'),
      'seeders-path': resolve(__dirname, 'src', 'database', 'seeds')
    };
  ```

  - On src create a folder `config` to hold our configuration files.
  - One file is called `database.js`, with informations used to connect on the database.

  ``` js
    module.exports = {
      dialect: 'postgres',
      host: 'localhost',
      port: 5433,
      username: 'patrick',
      password: 'docker',
      database: 'gympoint',
      define: {
        timestamp: true,  //add columns created_at and updated_at to tables
        underscored: true, //change the name of tables from camelcase to underscore
        underscoredAll: true, //same as above but now for columns
      },
    };

  ```

  - create another folder called `database` this folder holds the infrastructure layer from our database with migrations and seds.

  - on `index.js` we load the models





## Migrations to make changes on DB.

  ```
  yarn sequelize migration:create --name=create-users
  yarn sequelize db:migrate
  yarn sequelize db:migrate:undo
  yarn sequelize db:migrate:undo:all
  ```
