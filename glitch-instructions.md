# Instruções para Deploy no Glitch.com

## Passo a Passo Completo:

### 1. Criar projeto no Glitch
- Vá para https://glitch.com
- Clique em "New Project"
- Escolha "hello-express" (template básico)

### 2. Substituir arquivos principais
Substitua os arquivos principais no seu projeto Glitch pelos seguintes:

**package.json** (substitua pelo conteúdo de `glitch-package.json`):
```json
{
  "name": "chaossite",
  "version": "1.0.0",
  "description": "GeeKTunes - Plataforma de música geek",
  "main": "server.js",
  "scripts": {
    "start": "node server.js",
    "build": "echo 'Build completed'",
    "dev": "node server.js"
  },
  "engines": {
    "node": "18.x"
  },
  "dependencies": {
    "@neondatabase/serverless": "^0.10.4",
    "express": "^4.21.2",
    "ws": "^8.18.0"
  }
}
```

**server.js** (substitua pelo conteúdo corrigido de `glitch-server.js`):
```javascript
const express = require("express");
const { createServer } = require("http");
const { WebSocketServer } = require("ws");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.static("public"));

// Basic routes for Glitch demo
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "Server is running on Glitch!" });
});

app.get("/api/artists", (req, res) => {
  res.json([]);
});

app.get("/api/notifications", (req, res) => {
  res.json([]);
});

app.get("/api/auth/user", (req, res) => {
  res.status(401).json({ message: "Configure database first" });
});

// Serve React app for all other routes
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Create HTTP server
const server = createServer(app);

// WebSocket setup
const wss = new WebSocketServer({ server });

wss.on("connection", (ws) => {
  console.log("Client connected");
  
  ws.on("message", (message) => {
    console.log("Received:", message.toString());
  });
  
  ws.on("close", () => {
    console.log("Client disconnected");
  });
});

server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`Visit: https://your-project.glitch.me`);
});
```

### 3. Criar pasta public
- No Glitch, crie uma pasta chamada `public`
- Faça o build do seu projeto local: `npm run build`
- Copie todo o conteúdo da pasta `dist/public` para a pasta `public` do Glitch

### 4. Configurar variáveis de ambiente (.env)
No Glitch, clique no botão ".env" e adicione:
```
DATABASE_URL=sua_connection_string_postgresql
NODE_ENV=production
```

### 5. Para obter um banco PostgreSQL gratuito:

**Opção 1 - Neon.tech (Recomendado):**
1. Vá para https://neon.tech
2. Crie uma conta gratuita
3. Crie um novo projeto
4. Copie a connection string
5. Cole no .env do Glitch

**Opção 2 - Supabase:**
1. Vá para https://supabase.com
2. Crie uma conta gratuita
3. Crie um novo projeto
4. Vá em Settings > Database
5. Copie a connection string
6. Cole no .env do Glitch

### 6. Testar
- O projeto deve iniciar automaticamente no Glitch
- Acesse a URL do seu projeto (algo como https://seu-projeto.glitch.me)
- Teste as rotas básicas:
  - `/api/health` - deve retornar status OK
  - `/` - deve servir a interface React

## Problemas Comuns e Soluções:

**Erro "Cannot find module":**
- Certifique-se de que removeu `"type": "module"` do package.json
- Use `require()` em vez de `import` no server.js

**Erro "null: command not found":**
- Certifique-se de que todos os scripts no package.json têm valores válidos
- Evite campos vazios ou null

**Interface não carrega:**
- Verifique se a pasta `public` contém o arquivo `index.html`
- Certifique-se de que fez o build do projeto antes de copiar os arquivos

**Banco de dados não conecta:**
- Verifique se a DATABASE_URL está correta no .env
- Teste a conexão com um cliente PostgreSQL primeiro

## Resultado Esperado:
- Servidor Express rodando na porta 3000
- Interface React básica funcionando
- APIs básicas respondendo
- WebSocket configurado para futuras funcionalidades

Esse setup é uma versão simplificada que deve funcionar no Glitch.com sem problemas de import ou configuração complexa.