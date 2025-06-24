# GeeKTunes no Glitch.com - Guia Definitivo 

## 🚀 Solução para Erros de Import e "null: command not found"

### ❌ Problemas Identificados:
1. **Erro `/opt/watcher/app-types/custom/start.sh: line 9: null: command not found`**
   - Causado por `"type": "module"` no package.json
   - Glitch.com não suporta ES6 modules adequadamente

2. **Problemas de Import**
   - `import` não funciona bem no Glitch
   - Precisa usar `require()` CommonJS

### ✅ Solução Completa:

## Passo 1: Criar Projeto no Glitch
1. Vá para https://glitch.com
2. "New Project" → "hello-express"
3. Aguarde o projeto carregar

## Passo 2: Substituir Arquivos

### A) Substitua `package.json` por:
```json
{
  "name": "geektunes-glitch",
  "version": "1.0.0", 
  "description": "GeeKTunes - Plataforma de música geek no Glitch",
  "main": "server.js",
  "scripts": {
    "start": "node server.js",
    "dev": "node server.js"
  },
  "engines": {
    "node": "18.x"
  },
  "dependencies": {
    "express": "^4.21.2"
  }
}
```

### B) Substitua `server.js` por:
```javascript
const express = require("express");
const { createServer } = require("http");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware básico
app.use(express.json());
app.use(express.static("public"));

// Rotas da API
app.get("/api/health", (req, res) => {
  res.json({ 
    status: "ok", 
    message: "GeeKTunes rodando no Glitch!",
    timestamp: new Date().toISOString()
  });
});

app.get("/api/artists", (req, res) => {
  // Mock data para demonstração
  const artists = [
    {
      id: 1,
      name: "ChipTune Master",
      role: "Chiptune Producer",
      avatar: "https://via.placeholder.com/150",
      description: "Especialista em música 8-bit e chiptune"
    },
    {
      id: 2,
      name: "Geek Beats", 
      role: "Electronic Music",
      avatar: "https://via.placeholder.com/150",
      description: "Música eletrônica inspirada em games"
    }
  ];
  res.json(artists);
});

app.get("/api/projects", (req, res) => {
  const projects = [
    {
      id: 1,
      title: "Retro Gaming Soundtrack",
      description: "Trilha sonora inspirada em jogos clássicos",
      coverImage: "https://via.placeholder.com/300x200",
      status: "completed"
    }
  ];
  res.json(projects);
});

app.get("/api/notifications", (req, res) => {
  res.json([]);
});

app.get("/api/auth/user", (req, res) => {
  res.status(401).json({ 
    message: "Autenticação não configurada. Configure o banco de dados primeiro." 
  });
});

// Servir arquivos React para todas as outras rotas
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Criar servidor HTTP
const server = createServer(app);

// Iniciar servidor
server.listen(PORT, () => {
  console.log(`🚀 GeeKTunes rodando na porta ${PORT}`);
  console.log(`🌐 Acesse: https://seu-projeto.glitch.me`);
  console.log(`📊 Health check: https://seu-projeto.glitch.me/api/health`);
});

// Tratamento de erros
process.on('uncaughtException', (err) => {
  console.error('Erro não capturado:', err);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Promise rejeitada:', reason);
});
```

## Passo 3: Criar Pasta Public
1. No Glitch, crie uma pasta `public`
2. Faça o build local: `npm run build`
3. Copie tudo de `dist/public/` para `public/` no Glitch

Se não conseguir fazer o build, use este `index.html` básico na pasta `public`:

```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>GeeKTunes - Música Geek</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            text-align: center;
            padding: 50px;
            margin: 0;
        }
        .container {
            max-width: 800px;
            margin: 0 auto;
            background: rgba(255,255,255,0.1);
            padding: 30px;
            border-radius: 15px;
            backdrop-filter: blur(10px);
        }
        .logo {
            font-size: 3em;
            margin-bottom: 20px;
            text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
        }
        .subtitle {
            font-size: 1.2em;
            margin-bottom: 30px;
            opacity: 0.9;
        }
        .api-links {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 15px;
            margin-top: 30px;
        }
        .api-link {
            background: rgba(255,255,255,0.2);
            padding: 15px;
            border-radius: 10px;
            text-decoration: none;
            color: white;
            transition: all 0.3s ease;
        }
        .api-link:hover {
            background: rgba(255,255,255,0.3);
            transform: translateY(-5px);
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="logo">🎵 GeeKTunes</div>
        <div class="subtitle">Plataforma de Música Geek</div>
        <p>Bem-vindo ao GeeKTunes! Sua plataforma de música inspirada em cultura geek e gaming.</p>
        
        <div class="api-links">
            <a href="/api/health" class="api-link">
                ✅ Status do Servidor
            </a>
            <a href="/api/artists" class="api-link">
                🎤 Lista de Artistas
            </a>  
            <a href="/api/projects" class="api-link">
                🎬 Projetos Musicais
            </a>
            <a href="/api/notifications" class="api-link">
                🔔 Notificações
            </a>
        </div>
        
        <p style="margin-top: 30px; font-size: 0.9em; opacity: 0.7;">
            Versão simplificada rodando no Glitch.com
        </p>
    </div>
</body>
</html>
```

## Passo 4: Testar
1. O servidor deve iniciar automaticamente
2. Verifique os logs no Glitch
3. Teste as URLs:
   - `/` - Interface principal
   - `/api/health` - Status do servidor
   - `/api/artists` - Lista de artistas mock

## 🔧 Para Adicionar Banco de Dados (Opcional)

### Use Neon.tech (Gratuito):
1. https://neon.tech → Criar conta
2. Novo projeto → Copiar connection string
3. No Glitch: botão ".env" → Adicionar:
   ```
   DATABASE_URL=sua_connection_string
   ```

## ✅ Resultado Esperado:
- ✅ Servidor rodando sem erros "null command"
- ✅ APIs funcionando com dados mock
- ✅ Interface básica carregando
- ✅ Logs limpos no console do Glitch

Esta versão resolve todos os problemas de import e configuração do Glitch.com!