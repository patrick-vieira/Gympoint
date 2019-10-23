
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

  - create another folder called `database` this folder holds the infrastructure layer from our database with f olders `migrations` and `seeds`.


## Migrations to make changes on DB.

  > create a migration

  ```
  yarn sequelize migration:create --name=create-users
  ```

  ```js
  module.exports = {
    up: (queryInterface, Sequelize) => {
      return queryInterface.createTable('users', {
        id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
        },
        name: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        email: {
          type: Sequelize.STRING,
          allowNull: false,
          unique: true,
        },
        password_hash: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        role: {
          type: Sequelize.INTEGER,
          defaultValue: 0,
          allowNull: false,
        },
        created_at: {
          type: Sequelize.DATE,
          allowNull: false,
        },
        updated_at: {
          type: Sequelize.DATE,
          allowNull: false,
        },
      });
    },

    down: (queryInterface, Sequelize) => {
      return queryInterface.dropTable('users');
    },
  };
```

  > execute  migration

  ```
  yarn sequelize db:migrate
  ```

  > to undo the last migration

  ```
  yarn sequelize db:migrate:undo
  ```
  > to undo all migrations

  ```
  yarn sequelize db:migrate:undo:all
  ```

  ## Working with models


  ```js
  import Sequelize, { Model } from 'sequelize';

  class User extends Model {
    static init(connection) {
      super.init(
        {
          name: Sequelize.STRING,
          email: Sequelize.STRING,
          password_hash: Sequelize.STRING,
          role: Sequelize.INTEGER,
        },
        {
          sequelize: connection,
        }
      );
    }
  }

  export default User;
```

  > load models on app

  - In `index.js` we load the models

  on app.js in the root folder we import our database

  ```js
  import './database';
  ```





