# FROM node:16.20.1-alpine3.17
FROM timbru31/node-alpine-git as client
RUN apk add --no-cache python3 py3-pip make g++
# COPY . /charts
# WORKDIR /charts
# RUN npm install -g npm@9.8.1
# RUN npm install
# RUN npm run build
WORKDIR /
RUN git clone https://github.com/rcpch/digital-growth-charts-react-client.git
ENV NODE_OPTIONS=--openssl-legacy-provider
WORKDIR /digital-growth-charts-react-client
RUN npm install
CMD ["npm", "start"]

# FROM nginx:1.19.0
# WORKDIR /usr/share/nginx/html
# RUN rm -rf ./*
# COPY --from=client /digital-growth-charts-react-client/build .
# ENTRYPOINT [ "nginx","-g","daemon off;" ]


# RUN npm install

# CMD ["npm", "run", "build"]