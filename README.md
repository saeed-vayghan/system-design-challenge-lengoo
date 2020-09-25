# system-design-challenge-lengoo

**System Design**
  A simple sketch on system architecture ([system-design.jpg](resource/system-design.jpg))<br>

  Tip: This is an experimental project, So I decided to implement a simple Authentication layer to learn how libraries like OAuth works, But for sure we must user standard libraries in the production.

**Best practices**
  * [x] Project Structure, Grouping files by technical role (Configs, Routers, Models, Controllers)
  * [x] Develop your own common utilities as a NPM package (Rate limitters, ...)
  * [x] Separate Express App and Server
  * [x] Secure Environment Variables and Hierarchical Config
  * [x] Well defined Error Handling
  * [x] Eslint
  * [x] Naming-Tagging (Asset-Inventory)
  * [x] Caching
  * [x] Authentication Layer (OAuth, JWT)
  * [x] Automations Test
  * [x] CORS
  * [x] Filter Input, Escape Output
  * [ ] Lock Dependencies (npm-shrinkwrap.json)
  * [ ] Using Snyk.io
  * [ ] Monitoring
  * [ ] Logging (APM, ELK, ...)
  * [ ] Exit the process Gracefully
  * [ ] Documentaion (includes API-DOC)
  * [ ] Code Coverage
  * [ ] CI-CD

**Project Structure**
  * [x] GIT
  * [x] Syestem Design Sketch
  * [x] Dockerize (Node, MongoDB, Redis, ELK, RabbitMQ)
  * [x] PM2
  * [x] Env Variables
  * [x] package.json
  * [x] Levenshtein Distance Algorithm
  * [x] Query sanitizer
  * [x] Unit Test
  * [x] Functional Test
  * [x] File Manager (Local Disk, S3, ...)
  * [x] Nodemailer
<hr>

**Setup Third Party Services**
  * [x] MongoDB
  * [x] Redis
  * [x] RabbitMQ
  * [ ] ELK
<hr>

**Security checklist to consider**
* Mongo Least Privilege Principle (sample: user with Read-Only access)
* Third-Party Packages (if there is a package with too many dependencies, you'd better write your package)
* Lock dependencies with npm shrinkwrap
* Protect User Data (encrypting DB, HTTPS, ...)
* Logging (failed logins, DB interactions, ...)
* Rotate keys (use services like AWS Secrets-Manager)
* Separate development and production environments (dockerize your development dependencies)

**Resource Management**
* Protect yourself from DoS Attacks (Rate-limiters, Debouncers, and Throttlers)
* Tweaking computing resources based on some custom benchmarks
* Make balance between CPU cores and allocated Memory
* Scalability
<hr>

**TO DO**
* Login by Google and Outlook
* ....
<hr>

<hr><br><br>


**Build and Start**
```bash
sudo sysctl -w vm.max_map_count=262144

docker stop $(docker ps -aq); docker-compose up --build

# There will be 6 different containers:
# 1- backend-lengoo
# 2- mongodb-lengoo
# 3- mongoExpress-lengoo
# 4- elk-lengoo
# 5- redis-lengoo
# 6- rabbitmq-lengoo


# Log in to any container
# docker exec -it <container-name> bash

docker exec -it backend-lengoo bash

# Open a new terminal session to bottstrap system prerequisites
curl -XPOST http://127.0.0.1:8090/bootstrap
```

**Run Eslint**
```bash
docker exec -it backend-lengoo bash

npx eslint .
```

**Run Automations Tests**
```bash
docker exec -it backend-lengoo bash

./node_modules/mocha/bin/mocha --exit test/unit/index.js
./node_modules/mocha/bin/mocha --exit test/functional/index.js
```

**Generate API documentation** ([api-doc.png](resource/api-doc.png))
```bash

apidoc -i app/controllers/ -o api-docs/
```

**Generate code coverage report**
```bash
```

**Sample API Calls**
```bash

# Login with admin user

curl -XPOST http://127.0.0.1:8080/users/login \
-H 'Content-Type: application/json' \
-H 'App-Version: 1.0.0' \
-H 'Scope: user' \
-H 'Client: webApp' \
-d \
'{
  "email": "admin@domain.com",
  "password": "md5(123456)"
}'


# Register a new user

curl -XPOST http://127.0.0.1:8080/users/register \
-H 'Content-Type: application/json' \
-H 'App-Version: 1.0.0' \
-H 'Scope: user' \
-H 'Client: webApp' -d \
'{
  "displayName": "user-name",
  "email": "user-1@domain.com",
  "password": "md5(123456)"
}'

# ==> Output:
# {
#   "status": "success",
#   "user": {
#     "displayName": "user-name",
#     "roles": ["USER"],
#     "_id": "5f6c8d3a2bc09200148ed66c",
#     "email": "user4@domain.com",
#     "created": "2020-09-24T12:12:42.480Z",
#     "updated": "2020-09-24T12:12:42.480Z"
#   }
# }



# Login with email address

curl -XPOST http://127.0.0.1:8080/users/login \
-H 'Content-Type: application/json' \
-H 'App-Version: 1.0.0' \
-H 'Scope: user' \
-H 'Client: webApp' \
-d \
'{
  "email": "user-1@domain.com",
  "password": "md5(123456)"
}'

# ==> Output:
# {
#   "status": "success",
#   "accessToken": "v9pn42a2qbggadowzus6fgh0",
#   "refreshToken": "qawf66dxfvmi2mqy60z8orj6"
# }



# Upload a file

curl -XPOST http://127.0.0.1:8080/api/upload \
-H 'Authorization: v9pn42a2qbggadowzus6fgh0' \
-H 'App-Version: 1.0.0' \
-H 'Client: webApp' \
-H 'Scope: user' \
-F "fileName=Matrix-1999-en.txt" -F "sourceLanguage=en" -F "targetLanguage=de" -F "subtitle=@/home/saeed/subs/Matrix-1999-en.txt"



# Introduce translation data
For more sampling: [sample-data.md](resource/sample-data.md))

curl -XPOST http://127.0.0.1:8090/api/translations \
-H 'Authorization: <admin-token>' \
-H 'Content-Type: application/json' \
-H 'App-Version: 1.0.0' \
-H 'Scope: admin' \
-H 'Client: webApp' -d \
'[
  {
    "source": "Hello World",
    "target": "Hallo Welt",
    "sourceLanguage": "en",
    "targetLanguage": "de"
  },
  {
    "source": "Hello guys",
    "target": "Hallo Leute",
    "sourceLanguage": "en",
    "targetLanguage": "de"
  },
  {
    "source": "I walk to the supermarket",
    "target": "Ich gehe zum Supermarkt.",
    "sourceLanguage": "en",
    "targetLanguage": "de"
  },
  {
    "source": "I am Arwen - Ive come to help you",
    "target": "Ich bin Arwen - Ich bin gekommen, um dir zu helfen.",
    "sourceLanguage": "en",
    "targetLanguage": "de"
  },
  {
    "source": "Come back to the light.",
    "target": "Komm zurück zum Licht.",
    "sourceLanguage": "en",
    "targetLanguage": "de"
  },
  {
    "source": "Nooo, my precious!!.",
    "target": "Nein, my Schatz!!.",
    "sourceLanguage": "en",
    "targetLanguage": "de"
  },
  {
    "source": "Nooo00, my precious!!.",
    "target": "Nein, my Schatz!!.",
    "sourceLanguage": "en",
    "targetLanguage": "de"
  },
  {
    "source": "Nooo, dear precious!!.",
    "target": "Nein, my Schatz!!.",
    "sourceLanguage": "en",
    "targetLanguage": "de"
  }
]'
```