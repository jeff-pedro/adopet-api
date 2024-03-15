# Run Local Docker

```shell
docker run \
--mount source=adopet-data,destination=/var/lib/mysql
-p 3306:3306
-e MYSQL_ALLOW_EMPTY_PASSWORD=true
--restart on-failure
--name adopet-db
-d mysql:latest
```
