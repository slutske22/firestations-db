'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _cors = require('cors');

var _cors2 = _interopRequireDefault(_cors);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _routes = require('./routes');

var _routes2 = _interopRequireDefault(_routes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();
var PORT = process.env.PORT || 3000;

app.use(_express2.default.static(_path2.default.resolve(__dirname, '../../client/dist')));
console.log(__dirname);

// mongo connection:
var uri = "mongodb+srv://slutske22:FSCluster@fscluster-tmsah.mongodb.net/FireStarter?retryWrites=true&w=majority";

_mongoose2.default.connect(uri, {
   useNewUrlParser: true,
   useUnifiedTopology: true
});

var db = _mongoose2.default.connection;

db.once('open', function () {
   console.log('Connected to FireStarter DB Successfully');
});

// body parser setup:
app.use(_bodyParser2.default.urlencoded({ extended: true }));
app.use(_bodyParser2.default.json());

// CORS setup
app.use((0, _cors2.default)());

// routes setup
(0, _routes2.default)(app);

app.get("*", function (req, res) {
   res.sendFile(_path2.default.resolve(__dirname, '../client', 'dist', 'index.html'));
});

app.listen(PORT, function () {
   console.log('Listening on port ' + PORT);
});