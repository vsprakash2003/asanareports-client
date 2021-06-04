## Download and Install Node.js

### Install yarn through npm which comes bundled with Node.js
### To install yarn
```bash
    npm install yarn
```
### If there are permission issues while installing yarn
```bash
    sudo chown -R $USER /usr/local/lib/node_modules
    sudo chown -R $USER /usr/local/bin
```

## Project scaffold through Next.js

### Install Next.js
``` bash
    npx create-next-app asanareports-client
```
### Install typescript
``` bash
    touch tsconfig.json
```
The above command create tsconfig.json which can be configured

``` bash
    yarn dev
```
The above command throws errors and walks through what ts files to install. Once all issues are resolved, copy contents to tsconfig.json


