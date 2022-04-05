/*This file is responsible for both the user database, creation of the users and logging in users*/

const Datastore = require('nedb');
const bcrypt = require('bcrypt');
const saltRounds = 10;

class UserDAO {
    constructor(dbFilePath){
        if (dbFilePath){
            //embedded
            this.db = new Datastore({finemane : dbFilePath, autoload: true});
        }
        else{
            //in memory
            this.db = new Datastore();
        }
    }
    init(){
        this.db.insert({
            user: 'Peter',
            password: '$2b$10$I82WRFuGghOMjtu3LLZW9OAMrmYOlMZjEEkh.vx.K2MM05iu5hY2C'
        });
        this.db.insert({
            user: 'Ann',
            password: '$2b$10$bnEYkqZM.MhEF/LycycymOeVwkQONq8kuAUGx6G5tF9UtUcaYDs3S'
        });
        return this;
    }
    create(username, password) {
        const that = this;
        bcrypt.hash(password, saltRounds).then(function(hash){
            var entry = {
                user: username,
                password: hash
            };
            that.db.insert(entry, function (err){
                if (err){
                    console.log("can't insert user: ", username);
                }
            });
        });
    }
    //this function is checking for user login
    lookup(user, cb){
        this.db.find({'user': user}, function (err, entries) {
            if (err) {
                //if there is an error, return null
                return cb(null, null);
            }
            else {
                if (entries.lenght == 0) {
                    //if user not found, return null
                    return cb(null, null);
                }
                //if user is found in a list of entries, the user will be the first, so return entries[0]
                return cb(null, entries[0]);
            }
        });
    }
}

const dao = new UserDAO();
dao.init();

module.exports = dao; 