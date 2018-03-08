// dao/userSqlMapping.js
// CRUD SQL语句
var user = {
    insert:'INSERT INTO user(id, name, age) VALUES(0,?,?)',
    update:'update user set name=?, age=? where id=?',
    delete: 'delete from user where id=?',
    queryById: 'select * from user where id=?',
    // queryAll: 'select * from user',
    addUser:'INSERT INTO user( name, sex,intro) VALUES(?,?,?)',
    courses:"SELECT * FROM `course`",
    courseById:"SELECT * FROM `course`  where userId= ? limit 10",
    queryAll:`SELECT * FROM articles left JOIN articles_category_relationship ON articles.id = articles_category_relationship.article_id
        left JOIN category ON articles_category_relationship.category_id = category.id`,
    categories:`SELECT * FROM category`
};

module.exports = user;