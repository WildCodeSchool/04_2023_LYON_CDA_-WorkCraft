### How to run the project environment in docker ?
To run the project in docker container you have to make these commands :
> docker-compose up -d --build

After this, you'll only have to use
> docker-compose up -d

> docker-compose exec php-workcarft composer install

**Don't forget to check if port 80 443 9000 and 5434 are closed, if they are open you'll get an error.**

The api documentation is readable at https://localhost/api/docs you'll find all routes and what you need to make your api calls

If you want to run commands at the root of the project you'll have to run
> **docker-compose exec php** yourcommand
>
For example, if you want to run fixtures you have to run
>docker-compose exec php-workcarft php bin/console hautelook:fixtures:load

**Don't forget to run composer install to get started**
