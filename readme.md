# demo task
Repo managed by Lerna, to start localy just do:
```
cd star-tex-demo
npm install
npm start
```
To start on remote sever you must set configuration options properly in file
packages/client/src/config.js
```
const config = {
  restApi: 'http://localhost:4040/api',
  socketApi: 'http://localhost:7000',
};

export default config;
```
##Note
npm dont run afterscript when started as root, start and init repo under user 

Alternatively use ```--unsafe-perm``` option (not recomend)
