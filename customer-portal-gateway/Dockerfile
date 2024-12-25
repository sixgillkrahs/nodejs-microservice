FROM public.ecr.aws/docker/library/node:20-alpine3.20 AS builder
ARG service_name
ENV service_name=$service_name
LABEL stage=${service_name}
WORKDIR /code
COPY . .
COPY package.json ./
RUN npm install --force
# COPY all the files from Current Directory into the Container
RUN npm run build

FROM public.ecr.aws/docker/library/alpine:latest
ARG service_name
ENV service_name=$service_name
COPY --from=builder /code/dist /app/admin-portal-gateway
#COPY --from=builder /code/revision.txt /app/${service_name}
COPY --from=builder /code/node_modules /app/admin-portal-gateway/node_modules

WORKDIR /app
RUN ls /app/admin-portal-gateway > server.log && echo "Container is successfully started!" >> server.log
CMD ["tail","-f","server.log"]