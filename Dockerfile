FROM node:14-alpine
WORKDIR /carRental
COPY  ./dist/apps/ .
RUN cd ./api && npm install 
CMD node ./api/main.js