var async = require('async');
var colors = require('colors');
var pg = require('pg');
var types = require('pg').types;
types.setTypeParser(1700, 'text', parseFloat);
var _ = require('underscore');
var jwt = require('jsonwebtoken');
var pool = require('../../server.js').pool;
var server_url = require('../../server.js').server_url;
var jwtSecret = require('../../server.js').jwtSecret;

var fs = require("fs");
var dir_1 = "/../../sql/queries/members/";
var dir_2 = "/../../sql/queries/courses/";
var query_get_member = fs.readFileSync(__dirname + dir_1 + 'get.sql', 'utf8').toString();
var query_list_courses = fs.readFileSync(__dirname + dir_2 + 'list.sql', 'utf8').toString();
var query_list_public_courses = fs.readFileSync(__dirname + dir_2 + 'list_public.sql', 'utf8').toString();


// LIST BY INSTITUTE
exports.request = function(req, res) {

    async.waterfall([
        function(callback){
            // Connect to database
            pool.connect(function(err, client, done) {
                if(err) {
                    callback(err, 500);
                } else {
                    callback(null, client, done);
                }
            });
        },
        function(client, done, callback) {
            // Authorization
            if(req.headers.authorization) {
                var token = req.headers.authorization.substring(7);

                // Verify token
                jwt.verify(token, jwtSecret, function(err, decoded) {
                    if(err){
                        res.status(401).send("Authorization failed!");
                    } else {
                        if(decoded.member){
                            // Database query
                            client.query(query_get_member, [
                                decoded.member_id
                            ], function(err, result) {
                                done();
                                if (err) {
                                    callback(err, 500);
                                } else {
                                    // Check if Member exists
                                    if (result.rows.length === 0) {
                                        callback(new Error("Member not found"), 404);
                                    } else {
                                        callback(null, client, done, result.rows[0], query_list_courses);
                                    }
                                }
                            });
                        } else {
                            callback(null, client, done, undefined, query_list_public_courses);
                        }
                    }
                });
            } else {
                callback(null, client, done, undefined, query_list_public_courses);
            }
        },
        function(client, done, member, query, callback) {

            // Preparing parameters
            var params = [];

            // Pagination parameters
            if(member){
                params.push(Number(req.query.offset));
                params.push(Number(req.query.limit));
            }

            // Filter by institute
            if(member){
                params.push(member.institute_id);
            }

            callback(null, client, done, query, params);
        },
        function(client, done, query, params, callback) {
            // Database query
            client.query(query, params, function(err, result) {
                done();
                if (err) {
                    callback(err, 500);
                } else {
                    callback(null, 200, result.rows);
                }
            });
        }
    ], function(err, code, result) {
        if(err){
            console.error(colors.red(err));
            res.status(code).send(err.message);
        } else {
            res.status(code).send(result);
        }
    });
};