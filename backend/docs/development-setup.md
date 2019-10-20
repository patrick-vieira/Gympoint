- Nodemon & Sucrase & Debug

  First install the dependencies 
  - yarn add nodemon sucrase -D

  After install sucrase we can use our import to use ES6 sintax, but if we try to run `node src/server.js` an SyntaxError will be thrown, to fix this we will use sucrase `yarn sucrase-node src/server.js`.

  We will use nodemon to detect changes on code and automatic reload for us, but it will run with node, to work correctly with sucrase we need to configure `nodemon.json` on the root folder of the backend app.

  ```
    {
      "execMap": {
        "js": "node -r sucrase/register"
      }
    }
  ```

  And to debug our app we can use this configuration on vscode

  ```
  {
    "type": "node",
    "request": "attach",
    "name": "Launch Program",
    "program": "${workspaceFolder}/backend/src/server.js",
    "restart": true
  }
  ```
  
  Now we can create an script on `package.json` to speedup our development.

  ```
  "scripts": {
    "dev": "nodemon src/server.js",    
    "dev:debug": "nodemon --inspect src/server.js"
  }
  ```


- ESlint & Prettier

  yarn add eslint -D
  yarn eslint --init