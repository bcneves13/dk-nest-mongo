# START SERVER
```
docker-compose up -d --build
```
### MONGODB URI
```
mongodb://127.0.0.1:27019/local
```
## Users Automation LinkAPI

### START AUTOMATION
```
curl --location --request GET 'localhost:5555/users'
```

### USERS REPORT IN CSV
```
curl --location --request GET 'localhost:5555/users/users-report'
```

## GO File API

### PUBLIC FOLDER
```
https://gofile.io/d/b0d6fc6c-d485-458e-80c7-512252964936
```
### CREATE FOLDER
```
curl --location --request POST 'localhost:5555/go-files/create-folder' \
--header 'Content-Type: application/json' \
--data-raw '{
    "folderName": "pasta teste"
}'
```

### UPLOAD FILE

```
curl --location --request POST 'localhost:5555/go-files/upload-file' \
--form 'file=@"{#path to your file#}/{#file name#}"' \
--form 'folderName="pasta teste"'
```

### DELETE FILE

```
curl --location --request DELETE 'localhost:5555/go-files/file' \
--header 'Content-Type: application/json' \
--data-raw '{
    "folderName": "pasta teste",
    "fileName": "TestUpload.txt"
}'
```