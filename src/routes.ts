import { Router } from 'express';
import mysql from 'mysql';

const router = Router();

const connection = mysql.createConnection({
  host: 'localhost',
  port: 3307,
  user: 'root',
  password: '',
  database: 'ts_crud',
  insecureAuth: true
});

/*
*** Resposta do item 3 da tarefa ***

Pense Se você chegou aqui, considerando a arquitetura da sala de aula, responda
porque agora está definindo o port 3307 na conexão acima e antes não estava?

A resposta dessa pergunta está nos links que passei lá no item 3 da atividade:
https://mariadb.com/kb/en/connecting-to-mariadb/
https://mariadb.com/kb/en/node-js-connection-options/#essential-option

O parâmetro PORT é um parâmetro opcional cujo valor padrão é 3306. Como o banco
da sala de aula usa a porta 3307, devemos usar esse parâmetro  na  configuração
da conexão, para que a aplicação consiga falar com o banco de dados MariaDB.
*************************************

*** Resposta do  item 4 da tarefa ***

Adicionar o parâmetro --skip-grant-tables na seção [mysqld] do arquivo de
configuração my.ini e reiniciar o servidor MariaDB (baixa segurança).

Motivo:

Ao pesquisar os links na tarefa e procurar entender o arquivo  de  configuração
my.ini do MariaDB, a gente acaba encontrando o parâmetro --skip-grant-tables na
seção [mysqld].

O parâmetro  --skip-grant-tables deve ser adicionado no  my.ini  para  permitir
que o servidor Node.js faça o login no banco de dados apenas informando o  nome
do usuário, sem informar a senha, justamente porque o banco de  dados  não  usa
senha.

Esse parâmetro deve ser utilizado apenas para debug e situações de testes, dado
que um banco de dados deve sempre operar com usuário e senha. Muito  cuidado se
precisar utilizar esse parâmetro no banco de dados da produção.

Abaixo segue a descrição do comando.

Commandline: --skip-grant-tables
Description: Start without grant tables. This gives all users  FULL  ACCESS  to
all tables, which is useful in case of a lost root password. 
Use mariadb-admin flush-privileges, mariadb-admin reload or FLUSH PRIVILEGES to
resume using the grant tables.  From  MariaDB  10.10,  available  as  a  system
variable as well. 

Uma solução mais elegante, seria consultar a documentação do pacote  npm mysql.
https://www.npmjs.com/package/mysql#install
Esse pacote é o que permite a conexão do Node.js com o banco de dados MariaDB.
LENDO a documentação, nas opções de conexão, você  irá  encontrar  o  parâmetro
'insecureAuth' que permite conexões a uma instância do MySQL  que  solicite  um
método de autenticação antigo (inseguro), conforme o código acima.  

Maiores detalhes nos links:
https://mariadb.com/kb/en/mariadbd-options/#-skip-grant-tables
https://code.openark.org/blog/mysql/dangers-of-skip-grant-tables
https://www.npmjs.com/package/mysql#install


************************************

É muito comum um desenvolvedor ficar travado na resolução de um problema, em um
beco sem saída, por horas e até por dias seguidos. A saída para esses  casos  é
revisar o código, estudar a infraestrutura, consultar  os  parâmetros opcionais
da linguagem e pensar fora da caixa. 

Agora que você já sabe a resposta, que tal elaborar um prompt para a IA de  sua
preferência de tal forma que ela responda com a solução correta, ou seja,  diga
para verificar o parâmetro PORT da string de conexão e outro prompt  que  mande
usar o comando opcional --skip-grant-tables no arquivo de configuração my.ini?

*/


connection.connect();

// Rota de índice
router.get('/', (req, res) => {
  res.send('Welcome to the API');
});

/* // Example route for creating an item
router.post('/item', (req, res) => {
  const { name, description } = req.body;
  connection.query('INSERT INTO db_items (name, description) VALUES (?, ?)', [name, description], (err, result) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(result);
    }
  });
}); */

// Rota GET para inserir dados no banco de dados
// http://localhost:3000/insere?name=Renato&description=programador
router.get('/insere', (req, res) => {
  const { name, description } = req.query;
  
  if (!name || !description) {
    return res.status(400).send('Name and description are required');
  }
  
  connection.query('INSERT INTO db_items (name, description) VALUES (?, ?)', [name, description], (err, result) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(result);
    }
  });
});

//Falta montar:
//Rota GET para listar dados do banco de dados
//Rota GET para atualizar dados no banco de dados
//Rota GET para excluir dados do banco de dados

//Rota POST para inserir dados do banco de dados
//Rota POST para listar dados do banco de dados
//Rota POST para atualizar dados no banco de dados
//Rota POST para excluir dados do banco de dados



// More CRUD routes...

export default router;