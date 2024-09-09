FROM node:20.17.0
WORKDIR /app

RUN apt-get update && apt-get install -y \
  xvfb \
  libgtk2.0-0 \
  libgtk-3-0 \
  libgbm-dev \
  libnotify-dev \
  libgconf-2-4 \
  libnss3 \
  libxss1 \
  libasound2 \
  libxtst6 \
  libxrandr2 \
  libxcomposite1 \
  libxcursor1 \
  libxdamage1 \
  libxext6 \
  libxfixes3 \
  libxi6 \
  libxinerama1 \
  libxmu6 \
  libxrender1 \
  libx11-xcb1 \
  libxcb1 \
  && rm -rf /var/lib/apt/lists/*


COPY package.json package-lock.json ./
RUN npm install

COPY cypress.config.js .
COPY cypress/ ./cypress/

COPY server.js .

EXPOSE 3002

CMD ["node", "server.js"]
