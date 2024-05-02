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

## Build image and start compose
```shell
docker compose up --build -d
```

## Remove compose and volumes
```shell
docker compose down --volumes
```

## Access database
```shell
docker compose exec -it db \
psql -h db -U postgres
```

## Testing API
```shell
docker compose exec api \
npx sequelize-cli db:migrate --env test
```
or test with filter
```shell
docker compose exec api \
npm run test:integration \
-- api/__test__/integration/routes/authRoute.test.js
```

<!-- 
```shell

``` -->