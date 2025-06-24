# Deploy para Glitch.com - Guia Completo

## Opção 1: Versão Simplificada (Recomendada para Glitch)

### Arquivos criados para Glitch:
- `glitch-package.json` - dependências simplificadas
- `glitch-server.js` - servidor básico compatível
- `watch.json` - configuração de restart

### Passos:
1. **Criar projeto no Glitch:**
   - Vá para https://glitch.com
   - "New Project" → "hello-express"

2. **Substituir arquivos:**
   - Substitua `package.json` pelo conteúdo de `glitch-package.json`
   - Substitua `server.js` pelo conteúdo de `glitch-server.js`
   - Adicione `watch.json` na raiz

3. **Copiar pasta public:**
   - Copie todo conteúdo da pasta `dist/public` (após build) para pasta `public` no Glitch

4. **Configurar banco (opcional):**
   ```
   DATABASE_URL=sua_connection_string
   ```

## Opção 2: Projeto Completo

### 1. Preparar repositório
- GitHub: https://github.com/kldevsy/Chaossite
- Arquivos adaptados para Glitch

### 2. Importar no Glitch
1. "New Project" → "Import from GitHub"
2. URL: `https://github.com/kldevsy/Chaossite`

### 3. Banco PostgreSQL gratuito

**Neon.tech:**
1. https://neon.tech → nova conta
2. Criar projeto → copiar connection string

**Supabase:**
1. https://supabase.com → nova conta
2. Novo projeto → Settings → Database

### 4. Variáveis no Glitch (.env)
```
DATABASE_URL=sua_connection_string
NODE_ENV=production
```

### 5. Build e migração
```bash
npm install
npm run build
npm run db:push
npm start
```

## Problemas comuns:

**Erro "Cannot find module":**
- Use a versão simplificada (Opção 1)
- Arquivos de build são muito grandes para Glitch

**Timeout de build:**
- Glitch tem limites de tempo
- Versão simplificada resolve isso

**Banco não conecta:**
- Verifique string de conexão no .env
- Use Neon.tech para melhor compatibilidade

## Resultado esperado:
- Servidor rodando na porta 3000
- Interface básica funcionando
- APIs de exemplo respondendo
- WebSocket para chat configurado