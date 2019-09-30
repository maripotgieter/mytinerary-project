const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const router = express.Router();
const passport = require('passport');
const MongoClient = require('mongodb').MongoClient;
const passportSetup = require('../config/passport-setup');
const User = require('../Schemas/UserSchema');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

MongoClient.connect('mongodb://Mari:1234@mern-shard-00-00-jw9pb.gcp.mongodb.net:27017,mern-shard-00-01-jw9pb.gcp.mongodb.net:27017,mern-shard-00-02-jw9pb.gcp.mongodb.net:27017/test?ssl=true&replicaSet=MERN-shard-0&authSource=admin&retryWrites=true', { useNewUrlParser: true }, (err, database) => {

    const dbase = database.db("my_itinerary")
    if (err) console.log(err)


    router.get('/google', passport.authenticate('google', {
        scope: ['profile', 'email']
    }));
    router.get('/google/redirect', (req, res, next) => {
        return passport.authenticate('google', (req) => {

            console.log("the google auth is working!")
            console.log(req)
            const username = req.username;
            const email = req.email;

            if (!username)
                return res.send({
                    success: false,
                    message: 'Error. Username is empty'
                })

            if (!email)
                return res.send({
                    success: false,
                    message: 'Error. Email is empty'
                })

            dbase.collection("user").find({ "email": email, "provider": 'Google' }).toArray((err, result) => {
                let previousUsers = result.filter(user => user.email === email);
                console.log(previousUsers.length)
                if (err)
                    return res.send({
                        success: false,
                        message: 'Error. Server error'
                    })

                if (previousUsers.length == 0) {
                    dbase.collection("user").save(req, (err, result) => {
                        if (err) {
                            return res.send({
                                success: false,
                                message: 'Error. Server error'
                            })
                        }

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
                    })
                }
                else {
                    dbase.collection("user").findOne({
                        id: req.id,
                        provider: 'Google'
                    }, (req, user) => {

                    })
                }
            });
        })(req, res, next)
    })
});














// router.post("/user/login", (req, res) => {
//     const {
//         email,
//         password,
//     } = req.body;

//     if (!email) {
//         return res.send({
//             success: false,
//             message: "Error. Email is empty"
//         })
//     };
//     if (!password) {
//         return res.send({
//             success: false,
//             message: "Error. Password is empty"
//         })
//     };
//     dbase.collection("user").find().toArray((err, result) => {
//         let selectedUser = result.filter(user => user.email === email);

//         if (err) {
//             return res.send({
//                 success: false,
//                 message: 'Error: Server Error'
//             });
//         }

//         if (!selectedUser[0]) {
//             return res.send({
//                 success: false,
//                 message: "Error: No user found with this email or password"
//             })
//         }
//         const samePassword = bcrypt.compareSync(password, selectedUser[0].password);

//         if (!samePassword) {
//             return res.send({
//                 success: false,
//                 message: 'Error: Password Invalid'
//             });
//         } else {

//             const userSession = new UserSession();
//             userSession.userId = selectedUser[0]._id;
//             dbase.collection("userSession").save(userSession, (err, doc) => {
//                 if (err) {
//                     return res.send({
//                         success: false,
//                         message: 'Error: server error'
//                     });
//                 }
//                 dbase.collection("userSession").findOneAndUpdate({ "userId": userSession.userId }, {

//                     $set: {
//                         isLogged: true,
//                     }

//                 },
//                     null,
//                     (err, response) => {
//                         if (err) {
//                             return res.send({
//                                 success: false,
//                                 message: "Server error"
//                             })
//                         } else {
//                             return res.send({
//                                 success: true,
//                                 message: "User is updated!",
//                                 token: userSession.userId,
//                             })
//                         }
//                     })
//             });
//         }
//     }
//     )
// })






module.exports = router;