FROM node:20-bullseye

WORKDIR /app

ENV EXPO_NO_TELEMETRY=1
ENV EXPO_NO_INTERACTIVE=1
ENV CHOKIDAR_USEPOLLING=1
ENV WATCHPACK_POLLING=true

RUN npm install -g @expo/ngrok@^4.1.0

COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

COPY . .

EXPOSE 8081 19000 19001 19002 19006

CMD ["yarn", "start", "--tunnel"] 