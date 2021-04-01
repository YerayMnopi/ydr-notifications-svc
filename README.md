# YDR notifications service

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

### Docker
Build de the docker image
`docker build -t belce/ydr-notifications-service .`

Push it to docker hub
`docker push belce/ydr-notifications-service:latest`

Create a pod in kubenetes
`helm upgrade --install ydr-notifications-service helm/.`

Watch pod logs
`kubectl logs --follow {podName}`

Delete all pods of this chart
`helm uninstall ydr-notifications-service`


## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Resources

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.
[Nest Node Mailer](https://github.com/nest-modules/mailer)
[Nest Node Mailer docs](https://nest-modules.github.io/mailer/docs/mailer.html)
[Node Mailer](https://nodemailer.com/usage/bulk-mail/)
[Sending blue](https://app-smtp.sendinblue.com/real-time)
[Handlebars](https://www.npmjs.com/package/handlebars)
[Hadlebars docs](https://handlebarsjs.com/installation/precompilation.html#getting-started)
