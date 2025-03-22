FROM node:18-alpine

# Install curl for healthchecks
RUN apk add --no-cache curl

WORKDIR /app
COPY package*.json ./
RUN npm install --omit=dev
COPY . .
CMD ["node", "index.js"]
