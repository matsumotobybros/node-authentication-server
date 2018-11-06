### 1. Installation
```
npm install
```
### 2. Configure secret key
Rename config.sample.js to config.js and configure secret key

### 3. MongoDB Setup
If you'd like to setup mongodb, follow procedures down below.
```
brew update
```
```
brew install mongodb
```
```
mkdir -p /data/db

sudo chown -R $USER /data/db

mongod
```
#### If previous mongo process is running, follow either way.
#### 3-1. Try with different port
```
mongod --port 27018
``` 
#### 3-2. or you can kill the previous mongod instance
```
sudo lsof -iTCP -sTCP:LISTEN -n -P
```
Search for mongod COMMAND and its PID and type,
```aidl
sudo kill <mongo_command_pid>
```
Start your mongod instance by typing this
```aidl
mongod
```

### 4. Start server
```
node dev
```

### 5. How to user this mock server
* Add some controllers and configure them in router.js
* If you need to store some data, make models.

### 6. Authorization
```aidl
authorization: ${token}
```