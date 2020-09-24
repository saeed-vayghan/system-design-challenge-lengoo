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
  * [ ] Lock Dependencies (npm-shrinkwrap.json)
  * [ ] Using Snyk.io
  * [ ] Exit the process Gracefully
  * [x] CORS
  * [ ] Logging (APM, ELK, ...)
  * [ ] Monitoring
  * [x] Caching
  * [ ] Documentaion (includes API-DOC)
  * [x] Automations Test
  * [ ] Code Coverage
  * [ ] Filter Input, Escape Output
  * [x] Authentication Layer (OAuth, JWT)
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
<hr>

**Setup Third Party Services**
  * [x] MongoDB
  * [ ] ELK
  * [x] Redis
  * [ ] RabbitMQ
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

**Generate API documentation**

**Generate code coverage report**