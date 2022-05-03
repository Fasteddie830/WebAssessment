const req = require('express/lib/request');
const res = require('express/lib/response');
const nedb = require('nedb');

class GuestBook {
    constructor(dbFilePath) {
        if (dbFilePath) {
            this.db = new nedb({ filename: dbFilePath, autoload: true });
            console.log('DB connected to ' + dbFilePath);
        } else {
            this.db = new nedb();
            console.log('new DB created');
        }
    }
    init() {
        console.log("initialising data");
        this.db.insert({
            dish: 'Pizza Pepperoni',
            description: 'Pepperoni is an American variety of spicy salami made from cured pork and beef seasoned with paprika or other chili pepper. Prior to cooking, pepperoni is characteristically soft, slightly smoky, and bright red. Thinly sliced pepperoni is one of the most popular pizza toppings in American pizzerias.',
            price: '£5.00',
            contains: 'gluten, wheat, meat',
            /* published: '2020-02-16',
            author: 'Peter' */
        });
        //for later debugging
        //console.log('db entry Peter inserted');
        this.db.insert({
            dish: 'Pizza Margherita',
            description: 'Pizza margherita, as the Italians call it, is a simple pizza hailing from Naples. When done right, margherita pizza features a bubbly crust, crushed San Marzano tomato sauce, fresh mozzarella and basil, a drizzle of olive oil, and a sprinkle of salt.',
            price: '£5.50',
            contains: 'gluten, wheat,'
            /* published: '2020-02-18',
            author: 'Ann' */
        });
        this.db.insert({
            dish: 'Pizza something',
            description: 'Pizza Something is one of the favourites of any web-developer, with the toppings being a wide variety of Lorem Ipsum. ',
            price: '£15.50',
            contains: 'gluten, wheat, A large amount of imagination'
            /* published: '2020-02-18',
            author: 'Ann' */
        });
        //for later debugging
        //console.log('db entry Ann inserted');
    }
    //a function to return all entries from the database
    getAllEntries() {
        //return a Promise object, which can be resolved or rejected
        return new Promise((resolve, reject) => {
            //use the find() function of the database to get the data,
            //error first callback function, err for error, entries for data
            this.db.find({}, function (err, entries) {
                //if error occurs reject Promise
                if (err) {
                    reject(err);
                    //if no error resolve the promise & return the data
                } else {
                    resolve(entries);
                    //to see what the returned data looks like
                    //console.log('function all() returns: ', entries);
                }
            })
        })
    }
    updateData(dish, description, price, contains, _id, callback) {
        var entry = {
            dish: dish,
            description: description,
            price: price,
            contains: contains
        }
        
        //console.log(_id);

        this.db.update(
            {_id: _id},
            {$set: 
                {dish: dish,
                description: description,
                price: price,
                contains: contains}
            },
            {},
            function (err, numReplaced) {
                console.log("replaced: " + numReplaced);
            }
        );


        this.db.find({}).exec(function (err, docs) {console.log(docs);});
        //console.log(this.db.find({dish: "Pizza"}))
    }

    /*     updateData(dish, description, price, contains, id) {
            db.serialize(()=>{
                this.db.run('UPDATE ' + this.db + 'SET dish = ?, description = ?, price = ?, contains = ? WHERE id = ?', [dish, description, price, contains, id],
                function(err){
                    if(err){
                        res.send("error while updating");
                        return console.error(err.message);
                    }
                    res.send("entry updated sucessfully");
                    console.log("entry updated successfully");
                });
            });
        } */
    /* getPetersEntries() {
        //return a Promise object, which can be resolved or rejected
        return new Promise((resolve, reject) => {
            //find(author:'Peter) retrieves the data,
            //with error first callback function, err=error, entries=data
            this.db.find({ author: 'Peter' }, function (err, entries) {
                //if error occurs reject Promise
                if (err) {
                    reject(err);
                    //if no error resolve the promise and return the data
                } else {
                    resolve(entries);
                    //to see what the returned data looks like
                    console.log('getPetersEntries() returns: ', entries);
                }
            })
        })
    } */
    addEntry(author, subject, contents) {
        var entry = {
            //author: author,
            //subject: subject,
            //contents: contents,
            //published: new Date().toISOString().split('T')[0],
        }
        console.log('entry created', entry);
        this.db.insert(entry, function (err, doc) {
            if (err) {
                console.log('Error inserting document', subject);
            } else {
                console.log('document inserted into the database', doc);
            }
        })
    }
    getEntriesByUser(authorName) {
        return new Promise((resolve, reject) => {
            this.db.find({ 'author': authorName }, function (err, entries) {
                if (err) {
                    reject(err);
                } else {
                    resolve(entries);
                    console.log('getEntriesByUser returns: ', entries);
                }
            })
        })
    }
    deleteEntry(_id){
        console.log(_id);
        this.db.remove({_id : _id}, {}, function(err, numRemoved){
            if(err){
                console.log(err);
            }
            else{
                console.log("removed: " + numRemoved);
            }
        })
    }

};

//make the module visible outside
module.exports = GuestBook;