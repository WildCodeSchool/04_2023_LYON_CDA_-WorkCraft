### How to run the project environment in docker ?

To run the project in docker container you have to make these commands :

> docker compose up -d

If you have apache service, make this command before

> sudo systemctl stop apache2.service

After this, you'll only have to use

> docker compose exec php-workcraft composer install

**Don't forget to check if port 80 443 9000 and 5434 are closed, if they are open you'll get an error.**

The api documentation is readable at https://localhost/api you'll find all routes and what you need to make your api calls

If you want to run commands at the root of the project you'll have to run

> **docker-compose exec php-workcraft** yourcommand

Create db schema :

> docker compose exec php-workcraft php bin/console make:migration

> docker compose exec php-workcraft php bin/console d:m:m

For run fixtures you have to make this command :

> docker compose exec php-workcraft php bin/console doctrine:fixtures:load

**Don't forget to run composer install to get started**
