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
    articleLength:"SELECT COUNT(*) as total FROM articles",
    articleById:"SELECT * FROM `articles` left JOIN  category on articles.art_category_id = category.id where articles.id= ?",
    courseById:"SELECT * FROM `course`  where userId= ? limit 10",
    articles:`SELECT * FROM articles left JOIN articles_category_relationship ON articles.id = articles_category_relationship.article_id
        left JOIN category ON articles_category_relationship.category_id = category.id limit ? , ?`,
    articlesByCategoryId:`SELECT * FROM articles left JOIN articles_category_relationship ON articles.id = articles_category_relationship.article_id
        left JOIN category ON articles_category_relationship.category_id = category.id where category.id= ? limit ? , ?`,
    articlesByCategoryIdLength:"SELECT COUNT( *)  as total FROM articles_category_relationship where category_id =? ",
    categories:`SELECT * FROM category`
};

module.exports = user;