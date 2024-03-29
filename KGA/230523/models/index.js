const Sequelize = require("sequelize");
const config = require("../config");
const User = require("./users");
const Post = require("./posts");
const Cmt = require("./comment");

const sequelize = new Sequelize(
    config.dev.database,
    config.dev.username,
    config.dev.password,
    config.dev
) 

const db = {};

db.sequelize = sequelize;
db.User = User;
db.Post = Post;
db.Cmt = Cmt;

User.init(sequelize);
Post.init(sequelize);
Cmt.init(sequelize);

User.associate(db);
Post.associate(db);
Cmt.associate(db);

module.exports = db;