# The Network: Uma Rede Social Completa

## Introdução

O The Network é um projeto de rede social inspirado no Twitter, mas com funcionalidades mais abrangentes. Usuários podem se cadastrar, publicar mensagens curtas (até 140 caracteres), interagir com outros usuários e muito mais.

## Casos de Uso do Backend

### Cadastro de Usuário

- Permite o registro de novos usuários com nome, email, senha, data de nascimento, biografia e foto de perfil.
- Gera um ID único para cada usuário e armazena as informações de forma segura.
- Envia um email de confirmação para o novo usuário.

### Autenticação de Usuário

- Permite que usuários cadastrados façam login com email e senha.
- Valida as credenciais e, em caso de sucesso, direciona o usuário para a página inicial.
- Exibe mensagem de erro em caso de login falho.

### Criação de Postagem

- Permite a publicação de mensagens de texto com até 140 caracteres.
- Associa cada postagem ao usuário que a criou e registra a data e hora da publicação.
- Armazena as curtidas, comentários e compartilhamentos da postagem.

### Visualização de Postagens

- Exibe as postagens em ordem cronológica inversa (as mais recentes primeiro).
- Mostra o perfil do autor de cada postagem.
- Permite curtir, comentar e compartilhar as postagens.

### Seguimento de Usuários

- Permite que um usuário siga outro usuário para ver suas postagens no feed.
- Envia uma notificação ao usuário seguido sobre o novo seguidor.

### Curtidas em Postagens

- Registra as curtidas em cada postagem e notifica o autor da postagem.

### Comentários em Postagens

- Permite que usuários comentem em postagens de outros usuários.
- Notifica o autor da postagem sobre novos comentários.

### Compartilhamento de Postagens

- Permite que usuários compartilhem postagens de outros usuários em seus próprios perfis.
- Notifica o autor da postagem original sobre o compartilhamento.

### Pesquisa de Usuários

- Permite a pesquisa por outros usuários por nome ou nome de usuário.
- Exibe uma lista de usuários que correspondem aos termos da pesquisa.

### Configurações de Perfil

- Permite que os usuários visualizem e editem suas informações de perfil (nome, email, biografia, foto de perfil).
- Permite alterar a senha do usuário.
- Oferece opções para configurar privacidade e notificações.
Modelos Entidade-Relacionamento (ER)

## Entidades

### Usuário

- ID_usuario (chave primária)
- Nome
- Email
- Senha
- Data_nascimento
- Biografia
- Foto_perfil
- Data_criacao
- Data_atualizacao

### Postagem

- ID_postagem (chave primária)
- ID_usuario (chave estrangeira)
- Conteúdo (texto da postagem)
- Data_hora_publicacao
- Localizacao (opcional)
- Visibilidade (público, seguidores, amigos)
- Curtidas
- Compartilhamentos
- Data_criacao
- Data_atualizacao

### Seguidor

- ID_seguidor (chave primária)
- ID_usuario_seguido (chave estrangeira)
- Data_inicio_seguimento
- Notificacoes_ativadas
- Bloqueado
- Data_criacao
- Data_atualizacao

### Curtida

- ID_curtida (chave primária)
- ID_postagem (chave estrangeira)
- ID_usuario (chave estrangeira)
- Reacao (curtida, gostei, etc.)
- Data_hora_curtida
- Data_criacao

### Comentario

- ID_comentario (chave primária)
- ID_postagem (chave estrangeira)
- ID_usuario (chave estrangeira)
- Conteúdo (texto do comentário)
- Nivel_resposta
- Mencoes (usuários mencionados)
- Data_hora_comentario
- Data_criacao
- Data_atualizacao

### Mensagem

- ID_mensagem (chave primária)
- ID_remetente (chave estrangeira)
- ID_destinatario (chave estrangeira)
- Conteúdo (texto da mensagem)
- Data_hora_envio
- Lida (flag)
- Data_criacao

### Notificacao

- ID_notificacao (chave primária)
- ID_usuario (chave estrangeira)
- Tipo (nova postagem, nova curtida, novo comentário, etc.)
- Conteúdo (descrição da notificação)
- Data_hora_notificacao
- Lida (flag)
- Data_criacao

## Relacionamentos

- Um usuário pode ter várias postagens.
- Uma postagem pertence a um único usuário.
- Um usuário pode seguir vários outros usuários.
- Um usuário pode ser seguido por vários outros usuários.
- Uma postagem pode ter várias curtidas.
- Uma curtida pertence a uma única postagem e a um único usuário.
- Uma postagem pode ter vários comentários.
- Um comentário pertence a uma única postagem e a um único usuário.
- Um usuário pode enviar várias mensagens.
- Uma mensagem é enviada por um único usuário e recebida por um único usuário.
- Um usuário pode receber várias notificações.
- Uma notificação é enviada para um único usuário.
