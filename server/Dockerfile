# Etapa 1: Construir a aplicação
FROM node:18 AS build

# Definindo o diretório de trabalho no contêiner
WORKDIR /app

# Copiando os arquivos de package.json e package-lock.json
COPY package*.json ./

# Instalando as dependências
RUN npm install --legacy-peer-deps

# Copiando o restante dos arquivos da aplicação
COPY . .

# Construindo a aplicação
RUN npm run build

# Etapa 2: Executar a aplicação
FROM node:18

# Definindo o diretório de trabalho no contêiner
WORKDIR /app

# Copiando apenas os arquivos necessários da etapa de build
COPY --from=build /app/dist /app/dist
COPY --from=build /app/package*.json /app/

# Copiando o arquivo .env para o contêiner
COPY .env .env

# Instalando apenas as dependências de produção
RUN npm install --production --legacy-peer-deps

# Instalando o pacote dotenv para garantir carregamento das variáveis
RUN npm install dotenv

# Expondo a porta usada pela aplicação (agora usando a variável de ambiente)
EXPOSE ${PORT:-3333}

# Definindo o comando para rodar a aplicação com dotenv para carregar o arquivo .env
CMD ["node", "-r", "dotenv/config", "dist/server.mjs"]