const req = require('express/lib/request');
const res = require('express/lib/response');
const nedb = require('nedb');

class Restaurant {
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
            price: '£11.00',
            contains: 'gluten, wheat, meat',
            menu: 'Lunch',
            availability: 'Available'
        });
        this.db.insert({
            dish: 'Pizza Margherita',
            description: 'Pizza margherita, as the Italians call it, is a simple pizza hailing from Naples. When done right, margherita pizza features a bubbly crust, crushed San Marzano tomato sauce, fresh mozzarella and basil, a drizzle of olive oil, and a sprinkle of salt.',
            price: '£9.50',
            contains: 'gluten, wheat,',
            menu: 'Dinner',
            availability: 'Available'
        });
        this.db.insert({
            dish: 'Pizza something',
            description: 'Pizza Something is one of the favourites of any web-developer, with the toppings being a wide variety of Lorem Ipsum. ',
            price: '£15.50',
            contains: 'gluten, wheat, A large amount of imagination',
            menu: 'Lunch',
            availability: 'Available'

        });
        this.db.insert({
            dish: 'Taramasalata',
            description: 'Taramasalata (fish roe dip). A creamy blend of fish roe. Extra: potato or bread. Best with a drizzle of virgin olive oil or a squeeze of lemon.',
            price: '£5.00',
            contains: 'fish, cream, lemon or oil',
            menu: 'Dinner',
            availability: 'Available'
        });
        this.db.insert({
            dish: 'Moussaka',
            description: 'Iconic Greek oven-bake. Based on layers of sautéed aubergine, minced lamb, fried puréed tomato, onion, garlic and spices like cinnamon and allspice, potato, then a final fluffy topping of béchamel sauce and cheese.',
            price: '£17.99',
            contains: 'starch, meat, vegetables, dairies',
            menu: 'Lunch',
            availability: 'Available'

        });
        this.db.insert({
            dish: 'Fresh fish',
            description: 'Grilled whole and drizzled with ladholemono (a lemon and oil dressing). Flavoursome smaller fish such as barbouni (red mullet) and marida (whitebait) are ideal lightly fried.',
            price: '£12.50',
            contains: 'Fish, oil, lemon',
            menu: 'Dinner',
            availability: 'Available'

        });

        this.db.insert({
            dish: 'Fresh fish 2',
            description: 'Grilled whole and drizzled with ladholemono (a lemon and oil dressing). Flavoursome smaller fish such as barbouni (red mullet) and marida (whitebait) are ideal lightly fried.',
            price: '£12.50',
            contains: 'Fish, oil, lemon',
            menu: 'Dinner',
            availability: 'Unavailable'

        });
    }
    //a function to return all entries from the database
    getAllEntries(something) {
        return new Promise((resolve, reject) => {
            //use the find() function of the database to get the data,
            //error first callback function, err for error, entries for data
            this.db.find({menu: something}, function (err, entries) {
                if (err) {
                    reject(err);
                } else {
                    resolve(entries);
                }
            })
        })
    }

    getAvailableEntries(something) {
        return new Promise((resolve, reject) => {
            //use the find() function of the database to get the data,
            //error first callback function, err for error, entries for data
            this.db.find({menu: something, availability: "Available"}, function (err, entries) {
                if (err) {
                    reject(err);
                } else {
                    resolve(entries);
                }
            })
        })
    }

    updateData(dish, description, price, contains, _id, menu, availability, callback) {

        //console.log(_id);

        this.db.update(
            { _id: _id },
            {
                $set:
                {
                    dish: dish,
                    description: description,
                    price: price,
                    contains: contains,
                    menu: menu,
                    availability: availability
                }
            },
            {},
            function (err, numReplaced) {
                console.log("replaced: " + numReplaced);
            }
        );


        this.db.find({}).exec(function (err, docs) { console.log(docs); });
        //console.log(this.db.find({dish: "Pizza"})) //testing
    }

    addEntry(dish, description, price, contains, menu, availability) {
        var entry = {
            dish: dish,
            description: description,
            price: price,
            contains: contains,
            menu: menu,
            availability: availability

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

/*     getEntriesByUser(authorName) {
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
    } */
    deleteEntry(_id) {
        //console.log(_id); //this is for testing
        this.db.remove({ _id: _id }, {}, function (err, numRemoved) {
            if (err) {
                console.log(err);
            }
            else {
                console.log("removed: " + numRemoved);
            }
        })
    }

};

//make the module visible outside
module.exports = Restaurant;