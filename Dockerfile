# ==========================================================
# Imagem para testar o Café da Vila no seu PC, igual no Azure
# Ela já vem com Node.js 20 + Azure Functions Core Tools
# ==========================================================
FROM mcr.microsoft.com/azure-functions/node:4-node20-core-tools

WORKDIR /projeto

# Instala o "simulador" do Azure Static Web Apps (SWA CLI)
RUN npm install -g @azure/static-web-apps-cli

# Instala as dependências da API
COPY api/package*.json ./api/
RUN cd api && npm install

# Copia o resto do projeto
COPY . .

# Porta onde o site vai abrir: http://localhost:4280
EXPOSE 4280

CMD ["swa", "start", "app", "--api-location", "api", "--host", "0.0.0.0", "--port", "4280"]
