const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const errorController = require('./controllers/error');
const sequelize = require('./util/database');
const Product = require('./models/product');
const User = require('./models/user');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use('/', errorController.getPageNotFound);

Product.belongsTo(User, {constraints: true, onDelete: 'CASCADE'});
User.hasMany(Product);

sequelize
//.sync({force: true})
.sync()
.then(result => {
     return User.findByPk(1);
    // console.log(result);
})
.then(user => {
    if (!user) {
        return User.create({
            name: 'Yurii',
            email: 'urasor004@gmail.com'
        });
    }
    return user;
})
.then(user => {
    console.log(user);
    app.listen(3000);
    })
.catch(err => {
    console.log(err);
});

