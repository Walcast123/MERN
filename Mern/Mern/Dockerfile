# Usa imagen oficial de Node.js
FROM node:18

# Directorio de trabajo en el contenedor
WORKDIR /app

# Copia package.json y package-lock.json a /app
COPY package*.json ./

# Instala las dependencias (no se copian node_modules)
RUN npm install

# Copia el resto del código (incluyendo src/)
COPY . .

# Expone el puerto (según app, asumo 4000)
EXPOSE 4000

# Comando para iniciar el servidor (usa el main del package.json)
CMD ["node", "src/index.js"]
