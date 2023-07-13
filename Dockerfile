# CAUTION: Turbo remote caching wiros only with alpine version. Related issue: https://github.com/ducktors/turborepo-remote-cache/issues/34#issuecomment-1308479171
FROM node:16 AS builder

WORKDIR /app

COPY . .

RUN npm install

RUN npm run build

ENV PORT 3000

EXPOSE ${PORT}

CMD [ "node", "dist/main.js" ]
