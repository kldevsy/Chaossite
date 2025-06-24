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