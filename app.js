const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');

const routesApi = require('./src/routes/api');
const configSystem = require('./src/config/system');

app.set('port', (process.env.PORT || 3000));

app.set('views', './src/views');
app.set('view engine', 'pug');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(routesApi);

app.use('/public', express.static(path.join(__dirname, 'src/public')));

app.get('*', function(req, res) {
    res.status(404)
       .render('error', {
            title: configSystem.NAME_APP,
            copyright: configSystem.COPYRIGHT_APP,
            author: configSystem.AUTHOR_APP,
            status: '404 Not Found',
            message: 'Sorry, an error has occured, Requested page not found!'
        });
});

app.use(function(err, req, res, next) {
    res.status(500)
       .render('error', {
            title: configSystem.NAME_APP,
            copyright: configSystem.COPYRIGHT_APP,
            author: configSystem.AUTHOR_APP,
            status: '500 Internal Server Error',
            message: 'Something wrong happens!'
        });
});

app.listen(app.get('port'), function() {
    console.log('Application started');
});
