const express = require('express');
const path = require('path');
const compression = require('compression')

const app = express();
app.use(express.static(__dirname + '/dist/tree-grid-sync-fusion'));
app.use(compression())
app.get('/*', function(req,res) {
  res.sendFile(path.join(__dirname+'/dist/tree-grid-sync-fusion/index.html'));
});

app.listen(process.env.PORT || 8080);