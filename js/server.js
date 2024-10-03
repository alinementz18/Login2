const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const cors = require('cors');
const app = express();
app.use(bodyParser.json());



app.use(cors());


// Conexão com o banco de dados
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'login_users'
});




app.post('/login', (req, res) => {
    const { email, password } = req.body;
    db.query('SELECT * FROM users WHERE email = ? AND password = ?', [email, password], (err, results) => {
        if (err) throw err;
        if (results.length > 0) {
            res.sendStatus(200); // Login bem-sucedido
        } else {
            res.status(401).send('Credenciais inválidas');
        }
    });
});

app.post('/register', (req, res) => {
    const { email, password } = req.body;
    db.query('INSERT INTO users (email, password) VALUES (?, ?)', [email, password], (err, result) => {
        if (err) throw err;
        res.sendStatus(201); // Usuário registrado com sucesso
    });
});

app.put('/login/:id', (req, res) => {
    const { id } = req.params;
    const {email, password } = req.body;
    const sql = 'UPDATE usuarios SET email = ?, password = ? WHERE id = ?';
    connection.query(sql, [email, password, id], (error, results) => {
      if (error) {
        res.status(500).send('Erro ao atualizar usuário.');
        return;
      }
      res.send('Usuário atualizado com sucesso.');
    });
  });

  // Endpoint para deletar um usuário (DELETE)
app.delete('/login/:id', (req, res) => {
    const { id } = req.params;
    connection.query('DELETE FROM usuarios WHERE id = ?', [id], (error, results) => {
      if (error) {
        res.status(500).send('Erro ao deletar usuário.');
        return;
      }
      res.send('Usuário deletado com sucesso.');
    });
  });

app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});