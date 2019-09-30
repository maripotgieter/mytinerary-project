const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const keys = require('./keys');
const User = require('../Schemas/UserSchema');

passport.use(
    new GoogleStrategy({
        
        callbackURL:'http://localhost:3000/web/redirect',
        clientID: keys.google.clientID,
        clientSecret: keys.google.clientSecret,
       

    }, (accessToken, refreshToken, profile, done) => {
        console.log("passport callback function fired")

        const user = new User({
            username: profile.displayName,
            email: profile.emails[0].value,
            id: profile.id,
            provider: 'Google',
            photo: profile.photos[0].value,

        })
        return done(user)
    }
))
