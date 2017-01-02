FROM node:alpine
RUN mkdir -p /app
COPY . /app
WORKDIR /app
ENV NODE_ENV=production
CMD ["node", "srv/"]
