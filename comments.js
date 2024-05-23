// Create web server
// 1. Create a web server that listens on port 3000
// 2. When you visit http://localhost:3000/comments, it should display the comments
// 3. When you visit http://localhost:3000/comments/new, it should display a form for you to add a new comment
// 4. When you submit the form, you should add the comment to the list of comments
 
const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
 
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
 
app.get('/comments', (req, res) => {
  fs.readFile('comments.json', (err, data) => {
    if (err) {
      res.status(500).send('Error reading comments.json');
      return;
    }
    const comments = JSON.parse(data);
    res.send(
      comments.map(comment => `<li>${comment}</li>`).join('')
    );
  });
});
 
app.get('/comments/new', (req, res) => {
  res.send(`
<form method="POST" action="/comments">
<input type="text" name="comment">
<button>Submit</button>
</form>
  `);
});
 
app.post('/comments', (req, res) => {
  fs.readFile('comments.json', (err, data) => {
    if (err) {
      res.status(500).send('Error reading comments.json');
      return;
    }
    const comments = JSON.parse(data);
    comments.push(req.body.comment);
    fs.writeFile('comments.json', JSON.stringify(comments), (err) => {
      if (err) {
        res.status(500).send('Error writing comments.json');
        return;
      }
      res.redirect('/comments');
    });
  });
});
 
app.listen(3000, () => {
  console.log('Server listening on port 3000');
});