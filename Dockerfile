FROM node:latest
WORKDIR /usr/src/app
# RUN npm install --ignore-scripts=false --verbose

COPY . .
# CMD ["npm","start"]
