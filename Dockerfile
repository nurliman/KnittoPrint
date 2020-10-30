FROM node:14.15-slim
ENV NODE_ENV=production

RUN apt-get update && apt-get -y upgrade
RUN apt-get install -y build-essential libcairo2-dev libpango1.0-dev libjpeg-dev libgif-dev librsvg2-dev

WORKDIR /usr/src/app
COPY ["package.json", "yarn.lock", "./"]
RUN yarn install --prod --pure-lockfile
COPY . .
EXPOSE 3053
CMD ["yarn", "start"]
