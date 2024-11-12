# Utilize uma imagem base oficial do Node.js
FROM node:20-alpine

# Defina o diretório de trabalho
WORKDIR /app

# Copie os arquivos de dependências
COPY package*.json ./

# Instale as dependências
RUN yarn install

# Copie o restante do código da aplicação
COPY . .

# Gere o cliente Prisma
RUN npx prisma generate

# Compile a aplicação NestJS
RUN yarn build

# Exponha a porta que a aplicação utiliza
EXPOSE 4000

# Inicie a aplicação
CMD ["yarn", "start:prod"]
