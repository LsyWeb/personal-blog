const sequelize = require('./db')
const Blog = require('./Blog')
const Comment = require('./Comment');
const Category = require('./Category');
const Message = require('./Message');
const Setting = require('./Setting');
const Banner = require('./Banner');
const Project = require('./Project');


Blog.hasMany(Comment);
Comment.belongsTo(Blog);

Category.hasMany(Blog);
Blog.belongsTo(Category);

sequelize.sync({alter:true}).then(()=>{console.log('所有模型同步完成')}).catch(err=>console.log(err)); 

