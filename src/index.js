const express = require('express');
const app = express();
const port = 3030;

const activityRouter = require('./routes/activity-routes');
const todoRouter = require('./routes/todo-routes');

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.get('/', (req, res) => {
  res.json({ message: 'ok' });
});

app.use('/activities', activityRouter);
app.use('/todos', todoRouter);

app.use((err, req, res, next) => {
  return res.status(err.statusCode || 500).json({
    status: 'fail',
    message: err.message,
  })
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
