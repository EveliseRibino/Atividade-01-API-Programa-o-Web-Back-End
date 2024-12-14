const express = require('express'); // Importa o módulo Express
const app = express(); // Cria uma aplicação Express
const port = 3000; // Define a porta onde o servidor irá rodar

// Middleware para permitir o processamento de requisições no formato JSON
app.use(express.json());

// Array em memória para simular o banco de dados das tarefas
let tasks = [];

// Endpoint para listar todas as tarefas (GET /tasks)
app.get('/tasks', (req, res) => {
  res.json(tasks); // Retorna o array de tarefas em formato JSON
});

// Endpoint para criar uma nova tarefa (POST /tasks)
app.post('/tasks', (req, res) => {
  const { title, description } = req.body; // Obtém os dados do corpo da requisição

  // Valida se o título e a descrição foram fornecidos
  if (!title || !description) {
    return res.status(400).json({ error: 'O título e a descrição são obrigatórios.' });
  }

  // Cria uma nova tarefa com um ID único
  const newTask = {
    id: tasks.length + 1, // Gera um ID incremental
    title,
    description,
    completed: false, // Define o status inicial como "não concluído"
  };

  tasks.push(newTask); // Adiciona a nova tarefa ao array
  res.status(201).json(newTask); // Retorna a nova tarefa criada com o status 201
});

// Endpoint para atualizar uma tarefa existente (PUT /tasks/:id)
app.put('/tasks/:id', (req, res) => {
  const { id } = req.params; // Obtém o ID da tarefa a ser atualizada
  const { title, description, completed } = req.body; // Obtém os dados do corpo da requisição

  // Busca a tarefa correspondente no array
  const task = tasks.find((t) => t.id === parseInt(id));

  // Verifica se a tarefa existe
  if (!task) {
    return res.status(404).json({ error: 'Tarefa não encontrada.' });
  }

  // Atualiza os campos da tarefa, se fornecidos
  task.title = title || task.title;
  task.description = description || task.description;
  task.completed = completed !== undefined ? completed : task.completed;

  res.json(task); // Retorna a tarefa atualizada
});

// Endpoint para excluir uma tarefa existente (DELETE /tasks/:id)
app.delete('/tasks/:id', (req, res) => {
  const { id } = req.params; // Obtém o ID da tarefa a ser excluída

  // Encontra o índice da tarefa no array
  const index = tasks.findIndex((t) => t.id === parseInt(id));

  // Verifica se a tarefa foi encontrada
  if (index === -1) {
    return res.status(404).json({ error: 'Tarefa não encontrada.' });
  }

  tasks.splice(index, 1); // Remove a tarefa do array
  res.status(204).send(); // Retorna o status 204 (sem conteúdo)
});

// Inicia o servidor na porta definida
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
