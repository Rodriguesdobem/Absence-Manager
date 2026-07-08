# Teste da Funcionalidade: Mudar Foto de Perfil

## ✅ Implementação Concluída

Adicionada a funcionalidade de "Mudar Foto de Perfil" na página `/perfil` seguindo o mesmo layout das demais configurações (tema, notificação, alterar senha).

## 📝 Alterações Realizadas

### 1. Arquivo: `src/pages/Perfil.jsx`

**Novos Estados Adicionados:**
- `uploadingPhoto`: Controla o estado de upload
- `photoUrl`: Armazena a URL da foto (salva em localStorage)
- `fileInputRef`: Referência para o input de arquivo

**Novas Funções:**
- `handlePhotoUpload()`: Processa o upload do arquivo com validações
  - Valida se é imagem
  - Valida tamanho máximo (5MB)
  - Converte para Data URL e salva em localStorage
  
- `triggerPhotoInput()`: Abre o seletor de arquivo

**Novo Componente Adicionado:**
- Painel `pf-photo-panel` na seção de Configurações com:
  - Preview da foto atual ou avatar padrão
  - Botão "Escolher Foto"
  - Input file escondido para upload

### 2. Arquivo: `src/style.css`

**Novos Estilos Adicionados:**
- `.pf-photo-panel`: Container principal do painel
- `.pf-photo-panel-title`: Título com ícone
- `.pf-photo-preview`: Área de exibição da foto (140x140px)
- `.pf-photo-image`: Imagem da foto com object-fit cover
- `.pf-photo-placeholder`: Avatar padrão (círculo com letra inicial)
- `.pf-photo-upload-btn`: Botão de upload

## 🧪 Como Testar

### Pré-requisitos:
1. Backend rodando em `http://localhost:8080`
2. Frontend rodando em `http://localhost:5173`
3. Usuário autenticado

### Passo a Passo:

1. **Acesse a página de perfil:**
   ```
   http://localhost:5173/perfil
   ```

2. **Localize a nova seção:**
   - Role até a seção "Configurações"
   - Procure por "Foto de Perfil" com ícone de câmera
   - Deve estar entre o painel de "Tema" e o botão "Preferências"

3. **Teste o upload:**
   - Clique no botão "Escolher Foto"
   - Selecione uma imagem do seu computador
   - A foto deve aparecer no preview (140x140px)
   - Mensagem de sucesso deve ser exibida
   - A foto é salva em localStorage

4. **Validações testadas:**
   - ✅ Aceita apenas imagens
   - ✅ Rejeita arquivos > 5MB
   - ✅ Persiste após recarregar a página (localStorage)
   - ✅ Mantém o mesmo estilo visual das outras configurações
   - ✅ Tema escuro, claro e verde funcionam corretamente

5. **Verificação visual:**
   - O layout deve seguir o padrão das outras configurações
   - Cores devem se adaptar ao tema selecionado
   - Preview da foto com bordas arredondadas
   - Botão com ícone de upload

## 🎨 Layout

A nova seção segue o mesmo padrão do aplicativo:
- **Ícone de câmera**: Identifica a seção
- **Preview**: Mostra a foto atual ou avatar padrão (primeira letra do nome)
- **Botão**: "Escolher Foto" com ícone de upload
- **Posicionamento**: Entre o painel de Tema e o botão Preferências

## 💾 Persistência

- A foto é salva em `localStorage` com a chave `user-photo-url`
- Persiste entre sessões do navegador
- Formato: Data URL (base64)

## ⚠️ Notas Importantes

1. **Tamanho máximo**: 5MB por arquivo
2. **Formatos suportados**: Todos os tipos de imagem (JPEG, PNG, GIF, etc.)
3. **Armazenamento**: localStorage (pode atingir limite de 5-10MB dependendo do navegador)
4. **Backend**: Atualmente salva apenas em localStorage cliente
   - Para persistência no servidor, adicione endpoint `/api/usuario/foto` no backend

## 🔄 Próximos Passos (Opcionais)

Para integração completa com o backend:
1. Criar endpoint POST `/api/usuario/foto` no backend
2. Modificar `handlePhotoUpload()` para fazer upload via FormData
3. Salvar foto em servidor ou cloud storage
4. Carregar foto do servidor ao inicializar a página

---

**Status**: ✅ **Pronto para teste**
