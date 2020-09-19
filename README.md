# system-design-challenge-lengoo

**System Design**
  A simple sketch on system architecture ([system-design.jpg](resource/system-design.jpg))


**Project Structure**
  * [x] GIT
  * [x] Syestem Design Sketch
  * [x] Dockerize (Node, MongoDB, Redis, ELK, RabbitMQ)
  * [x] PM2
  * [x] Eslint
  * [ ] package.json
  * [ ] npm-shrinkwrap.json
  * [ ] Env Variables
  * [ ] Naming-Tagging (Asset-Inventory)
  * [ ] Models, Plugins, Routes, Controllers
  * [ ] Query sanitizer
  * [ ] Unit-Test
  * [ ] Functional-Test
  * [ ] Code Coverage
  * [ ] API-DOC
  * [ ] Security check through snyk.io
  * [ ] Handle CORS
  * [ ] Logging
  * [ ] Monitoring
  * [ ] Caching
  * [ ] CI-CD
  * [ ] Documentaion
<hr>

**Third Party**
  * [ ] MongoDB
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
* Escape Input / Filter Output

**Resource Management**
* Protect yourself from DoS Attacks (Rate-limiters, Debouncers, and Throttlers)
<hr>

**Optimization - To Scale Up**
* Tweaking computing resources based on some custom benchmarks
* Make balance between CPU cores and allocated Memory
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

**Run functional tests**

**Generate code coverage report**