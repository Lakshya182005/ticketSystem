const express = require('express');
const app = express();

app.use(express.json());

app.use('/auth', require('./routes/auth.routes'));
app.use('/categories', require('./routes/category.routes'));
app.use('/tickets', require('./routes/ticket.routes'));
app.use('/', require('./routes/comment.routes'));
app.use('/users', require('./routes/user.routes'));

module.exports = app;
