# The NetWork

Esse projeto visa criar uma rede social para compartilhamento de frases curtas de até 140 caracteres. A ideia é que os usuários possam se cadastrar, fazer login, postar frases, seguir outros usuários e ver o feed de frases dos usuários que seguem.

## Tecnologias

- NestJS
- PostgreSQL
- PrismaORM


## Event Storm

- Users
  - **CAN**
    - CREATE A POST
    - UPDATE YOUR OWN POST
    - DELETE YOUR OWN POST
    - FOLLOW ANOTHER USER
    - BE FOLLOWED BY ANOTHER USER
  - **HAS**
    - A POST FEED WITH FOLLOWED USER POSTS
  - **CANNOT**
    - DELETE A POST THAT IS NOT HIS
