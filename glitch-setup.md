# Configuração para Glitch.com

## Passos para configurar no Glitch:

1. **Criar novo projeto no Glitch**
   - Vá para glitch.com
   - Clique em "New Project" > "Import from GitHub"
   - Cole o URL: https://github.com/kldevsy/Chaossite

2. **Configurar variáveis de ambiente no Glitch**
   - Clique no botão ".env" no editor
   - Adicione suas variáveis de ambiente do PostgreSQL:
   ```
   DATABASE_URL=sua_string_de_conexao_postgresql
   PGHOST=seu_host
   PGPORT=5432
   PGDATABASE=seu_banco
   PGUSER=seu_usuario
   PGPASSWORD=sua_senha
   ```

3. **O projeto já foi adaptado com:**
   - Script de build para produção
   - Servidor Express configurado para servir arquivos estáticos
   - Build process que compila tudo para a pasta dist/
   - Package.json atualizado com scripts do Glitch

4. **Comandos que o Glitch executará automaticamente:**
   - `npm install` - instala dependências
   - `npm run build` - compila o projeto
   - `npm start` - inicia o servidor em produção

5. **Banco de dados:**
   - Use um serviço PostgreSQL externo como:
     - Neon.tech (gratuito)
     - ElephantSQL (gratuito)
     - Supabase (gratuito)
   - Configure a URL no arquivo .env do Glitch