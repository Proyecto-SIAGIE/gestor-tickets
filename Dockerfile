FROM node:18-alpine

WORKDIR /user/src/app
 
COPY . .

RUN npm install -g @nestjs/cli

RUN npm ci --omit=dev

RUN npm run build
 
USER node

EXPOSE 4201
 
CMD ["npm", "run", "start:prod"]