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

    //新增文章
    articleInsert:'INSERT INTO `articles`( art_title,art_content, art_des,art_create_time,art_category_id) VALUES(?,?,?,now(),?)',
    //更新文章和栏目关联表
    relationshipInsert:'INSERT INTO `articles_category_relationship`(article_id,category_id) VALUES(?,?)',

    //文章总数
    articleLength:"SELECT COUNT(*) as total FROM articles",
    //根据id查询文章内容
    // articleById:"SELECT * FROM `articles` as art left JOIN  articles_category_relationship as acr " +
    // "on acr.article_id = art.id left JOIN category on acr.category_id = category.id " +
    // "where art.id= ?",
    articleById:"SELECT * FROM `articles` as art  left JOIN category on art.art_category_id = category.category_id where art.art_id= ?",
    courseById:"SELECT * FROM `course`  where userId= ? limit 10",
    //带分页数据的文章总数
    // articles:`SELECT * FROM articles left JOIN articles_category_relationship ON articles.id = articles_category_relationship.article_id
    //     left JOIN category ON articles_category_relationship.category_id = category.id limit ? , ?`,
    articles:`SELECT * FROM articles  left JOIN category ON category.category_id= articles.art_id limit ? , ?`,
    //根据栏目id查询文章列表
    // articlesByCategoryId:`SELECT * FROM articles left JOIN articles_category_relationship ON articles.id = articles_category_relationship.article_id
    //     left JOIN category ON articles_category_relationship.category_id = category.id where category.id= ? limit ? , ?`,
    articlesByCategoryId:`SELECT * FROM articles 
left JOIN category ON articles.art_category_id = category.category_id where category.category_id=  ? limit ? , ?`,

    //栏目中文章数量
    // articlesByCategoryIdLength:"SELECT COUNT( *)  as total FROM articles_category_relationship where category_id =? ",
    articlesByCategoryIdLength:"SELECT count(*) as total FROM articles WHERE art_category_id = ? ",
    categories:`SELECT * FROM category`
};

module.exports = user;