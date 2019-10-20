
- install eslint:
  yarn add eslint -D

- configure:
  yarn eslint --init

  ? How would you like to use ESLint? To check syntax, find problems, and enforce code style
  ? What type of modules does your project use? JavaScript modules (import/export)
  ? Which framework does your project use? None of these
  ? Does your project use TypeScript? No
  ? Where does your code run? Node
  ? How would you like to define a style for your project? Use a popular style guide
  ? Which style guide do you want to follow? Airbnb (https://github.com/airbnb/javascript)
  ? What format do you want your config file to be in? JavaScript

  after configure will be created a file `.eslintrc.js` on the root folder.

- install vscode extension.
  make sure that your vscode is open on the root folder of the app (folder with package.json) for the lint work correctly.

- vscode configure:
  Open setting.json (ctrl+,), and add the lines bellow to use yarn, fix code on save and set languages to lint.

  ```
    "eslint.packageManager": "yarn",
    "eslint.autoFixOnSave": true,
    "eslint.validate": [
        {
            "language": "javascript",
            "autoFix": true
        },
        {
            "language": "javascriptreact",
            "autoFix": true
        },
        {
            "language": "typescript",
            "autoFix": true
        },
        {
            "language": "typescriptreact",
            "autoFix": true
        }
    ]
  ```

- Config prittier and Lint rules:
  yarn add prettier eslint-config-prettier eslint-plugin-prettier -D

  add prettier to `.eslintrc.js`
  ```
  extends: ['airbnb-base', 'prettier'],
  plugins: ['prettier'],
  ```

  I will use some rules that help me.

  ```
  rules: {
    "prettier/prettier": "error",
    "class-methods-use-this": "off",
    "no-param-reassign": "off",
    "camelcase": "off",
    "no-unused-vars": ["error", { "argsIgnorePattern": "next"}]
  }
  ```

  ESlint and prettier have some conflicting rules, so we can configure `.prettierrc` on the root folder to override prettier default behavior.

  after all te setup we can fix all files with this command:

    yarn eslint --fix src --ext .js


- editorconfig

  to ensure that all developer will use the correct styleguide we can install a extension on vscode called Editorconfig `https://github.com/editorconfig/editorconfig-vscode`

  crete a file on the root folder with name `.editorconfig` with the following lines.

```
  root = true

  [*]
  indent_style = space
  indent_size = 2
  charset = utf-8
  trim_trailing_whitespace = true
  insert_final_newline = true
```
