FROM node:16.13.2
WORKDIR /app
COPY . .

EXPOSE 19210

RUN npm install
RUN npm install dotenv
CMD ["npm", "run", "start"] 
