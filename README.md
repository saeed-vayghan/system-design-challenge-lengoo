# system-design-challenge-lengoo

**System Design**
  A simple sketch on system architecture ([system-design.jpg](resource/system-design.jpg))

**Best practices**
  * [x] Project Structure, Grouping files by technical role (Configs, Routers, Models, Controllers)
  * [ ] Develop your own common utilities as a NPM package (to-do)
  * [x] Separate Express App and Server
  * [x] Secure Environment Variables and Hierarchical Config
  * [x] Well defined Error Handling
  * [x] Eslint
  * [x] Naming-Tagging (Asset-Inventory)
  * [ ] Lock Dependencies (npm-shrinkwrap.json)
  * [ ] Using Snyk.io
  * [ ] Exit the process Gracefully
  * [ ] CORS
  * [ ] Logging (APM, ELK, ...)
  * [ ] Monitoring
  * [ ] Caching
  * [ ] CI-CD
  * [ ] Documentaion (includes API-DOC)
  * [ ] Automations Test and Code Coverage
  * [ ] Filter Input, Escape Output
  * [ ] Authentication Layer (OAuth, JWT)

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
  * [ ] Functional Test
<hr>

**Setup Third Party Services**
  * [x] MongoDB
  * [ ] ELK
  * [ ] Redis
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


**How To**
```bash
sudo sysctl -w vm.max_map_count=262144

docker-compose up --build
```

**TO-DO-Parts**

**Run Eslint**

**Generate API documentation**

**Run application in local environment**

**Run unit tests**
```bash
mocha test/unit/index.js --exit
```

**Run functional tests**

**Generate code coverage report**