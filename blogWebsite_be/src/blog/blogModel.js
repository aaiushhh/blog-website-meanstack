var mongoose=require('mongoose');
var Schema=mongoose.Schema;

var blogSchema=new Schema({
    username:{type:String},
    title:{type:String},
    blog:{type:String}
});

module.exports=mongoose.model('blogs',blogSchema,'BLOGS');

