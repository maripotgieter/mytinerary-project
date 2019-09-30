const async = require('async');
const express = require('express');
const MongoClient = require('mongodb').MongoClient
var ObjectID = require('mongodb').ObjectID;
const bodyParser = require('body-parser')
const app = express();
const router = express.Router();
const Comments = require('./Schemas/CommentsSchema');
const User = require('./Schemas/UserSchema');
const UserSession = require('./Schemas/UserSessionSchema');
const bcrypt = require('bcrypt');
const authRoutes = require('./routes/auth-routes');
const passportSetup = require('./config/passport-setup');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


MongoClient.connect('mongodb://Mari:1234@mern-shard-00-00-jw9pb.gcp.mongodb.net:27017,mern-shard-00-01-jw9pb.gcp.mongodb.net:27017,mern-shard-00-02-jw9pb.gcp.mongodb.net:27017/test?ssl=true&replicaSet=MERN-shard-0&authSource=admin&retryWrites=true' ,{ useNewUrlParser: true }, (err, database) => {
    
const dbase = database.db("my_itinerary")
    if (err) throw err

    app.listen(8080, () => {
        console.log("Magic happens on 8080")
    });
    router.get('/city', function (req, res) {
        dbase.collection("city").find().toArray((err, results) => {
            if (err)
                return res.send(err)
            return res.send(results)
        })
    })
    router.get('/itinerary/:city', function (req, res) {

        const { city } = req.params

        var itineraries = {};
        var tasks = [

            (callback) => {
                dbase.collection("Itinerary").find({ "ref": city }).toArray((err, results) => {
                    if (err)
                        return callback(err);
                    itineraries.itinerary = results;
                    callback();

                });
            },

            function (callback) {
                dbase.collection("city").find({ "ref": city }).toArray((err, resultsTwo) => {
                    if (err)
                        return callback(err);
                    itineraries.city = resultsTwo;
                    callback();

                })
            }
        ];

        async.parallel(tasks, function (err) {
            if (err)
                return err;
            return res.send(itineraries)
        })

    })
    router.post('/comments/add', (req, res) => {
        const { post, time, ref } = req.body;

        if (!post) {
            return res.send({
                success: false,
                message: 'Error. Post is empty'
            })
        }

        const comments = new Comments();
        comments.post = post;
        comments.time = time;
        comments.ref = ref;


        dbase.collection("comments").save(comments, (err, result) => {
            if (err) {
                console.log(err);
            }

            res.send('comment added successfully');
        });
    });
    router.get('/comments/get/:reference', function (req, res) {

        const { reference } = req.params;


        dbase.collection("comments").find({ "ref": reference }).toArray((err, results) => {
            if (err)
                return res.send(err)
            return res.send(results)
        })
    })
    router.post('/user/create', function (req, res) {
        const { username, email, password } = req.body;
        if (!username) {
            return res.send({
                success: false,
                message: 'Error. Username is empty'
            })
        }
        if (!email) {
            return res.send({
                success: false,
                message: 'Error. Email is empty'
            })
        }
        if (!password) {
            return res.send({
                success: false,
                message: 'Error. Password is empty'
            })
        }
        dbase.collection("user").find().toArray((err, result) => {
            let previousUsers = result.filter(user => user.username === username);
            if (err)
                return res.send({
                    success: false,
                    message: 'Error. Server error'
                })

            if (previousUsers.length > 0)
                return res.send({
                    success: false,
                    message: 'Error. Account already exists'
                })


            const user = new User();
            user.username = username;
            user.email = email;
            user.password = user.generateHash(password);

            dbase.collection("user").save(user, (err, result) => {
                if (err) {
                    return res.send({
                        success: false,
                        message: 'Error. Server error'
                    })
                }
                return res.send({
                    success: true,
                    message: 'User created succesfully'
                });
            });
        });

    });
    router.post("/user/login", (req, res) => {
        const {
            email,
            password,
        } = req.body;

        if (!email) {
            return res.send({
                success: false,
                message: "Error. Email is empty"
            })
        };
        if (!password) {
            return res.send({
                success: false,
                message: "Error. Password is empty"
            })
        };
        dbase.collection("user").find().toArray((err, result) => {
            let selectedUser = result.filter(user => user.email === email);

            if (err) {
                return res.send({
                    success: false,
                    message: 'Error: Server Error'
                });
            }

            if (!selectedUser[0]) {
                return res.send({
                    success: false,
                    message: "Error: No user found with this email or password"
                })
            }
            const samePassword = bcrypt.compareSync(password, selectedUser[0].password);

            if (!samePassword) {
                return res.send({
                    success: false,
                    message: 'Error: Password Invalid'
                });
            } else {

                const userSession = new UserSession();
                userSession.userId = selectedUser[0]._id;
                dbase.collection("userSession").save(userSession, (err, doc) => {
                    if (err) {
                        return res.send({
                            success: false,
                            message: 'Error: server error'
                        });
                    }
                    dbase.collection("userSession").findOneAndUpdate({ "userId": userSession.userId }, {

                        $set: {
                            isLogged: true,
                        }

                    },
                        null,
                        (err, response) => {
                            if (err) {
                                return res.send({
                                    success: false,
                                    message: "Server error"
                                })
                            } else {
                                return res.send({
                                    success: true,
                                    message: "User is updated!",
                                    token: userSession.userId,
                                })
                            }
                        })
                });
            }
        }
        )
    })
    router.get("/user/verify", (req, res) => {

        const { query } = req;

        const { token } = query;

        dbase.collection("userSession").findOne(({ "userId": token, "isLogged": true }), (err, sessions) => {
            if (err) {
                return res.send({
                    success: false,
                    message: 'Error: server error'
                })
            }
            if (sessions === null) {
                return res.send({
                    success: false,
                    message: 'Error: Invalid'
                })
            } else {
                return res.send({
                    success: true,
                    message: 'All good'
                })
            }
        });
    });
    router.get("/user/logout", (req, res) => {

        const { query } = req;

        const { token } = query;

        dbase.collection("userSession").findOneAndDelete(({ "userId": token, "isDeleted": false }), (err, sessions) => {
            if (err)
                return res.send({
                    success: false,
                    message: 'Error: server error'
                });

            if (!sessions)
                return res.send({
                    success: false,
                    message: 'Error: Invalid'
                });

            return res.send({
                success: true,
                message: 'Deleted'
            })

        });
    });
    app.use('/auth', authRoutes);
    app.use('/api', router);
})
