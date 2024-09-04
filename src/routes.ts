import { Router } from 'express';
import mysql from 'mysql';

const router = Router();

const connection = mysql.createConnection({
  host: 'localhost',
  port: 3307,
  user: 'root',
  password: '',
  database: 'ts_crud'
});

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