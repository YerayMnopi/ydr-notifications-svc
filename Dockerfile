FROM node:14.15-alpine3.10 As development
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}
ENV WORKING_DIR=/usr/src/app
RUN mkdir -p ${WORKING_DIR}
COPY ./dist ${WORKING_DIR}/dist/
COPY ./node_modules ${WORKING_DIR}/node_modules/
COPY ./package.json ${WORKING_DIR}/package.json
COPY ./tsconfig.json ${WORKING_DIR}/tsconfig.json

WORKDIR /usr/src/app

RUN npm uninstall dev-dependencies

CMD ["npm", "run", "start:prod"]
