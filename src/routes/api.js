const express = require('express');
const request = require('request');
const where = require("lodash.where");

const servicesUtil = require('./../services/util');
const configSystem = require('./../config/system');

const router = express.Router();

const url = 'https://private-7cf60-4youseesocialtest.apiary-mock.com/timeline';

router.get('/', function(req, res) {
    request(
        url,
        {json: true},
        (error, response, body) => {
            if (error) {
                return console.log(error);
            }

            var selectionOptions = servicesUtil.removeDuplicate(body, 'category');

            res.render('layout', {
                title: configSystem.NAME_APP,
                copyright: configSystem.COPYRIGHT_APP,
                author: configSystem.AUTHOR_APP,
                categories: selectionOptions,
                filtered: body,
                selectpicker: 'All'
            });
        }
    );
});

router.post('/', function(req, res) {
    request(
        url,
        {json: true},
        (error, response, body) => {
            if (error) {
                return console.log(error);
            }

            var selectionOptions = servicesUtil.removeDuplicate(body, 'category');

            var category = req.body.selectpicker;
            var filtered = category!=='All' ? where(body, {'category': category}) : body;

            res.render('layout', {
                title: configSystem.NAME_APP,
                copyright: configSystem.COPYRIGHT_APP,
                author: configSystem.AUTHOR_APP,
                categories: selectionOptions,
                filtered: filtered,
                selectpicker: category
            });
        }
    );
});

router.get('/error', function(req, res) {
    res.render('index', {
        message: 'Error'
    });
});

module.exports = router;
