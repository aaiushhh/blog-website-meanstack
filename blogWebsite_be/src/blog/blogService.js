var blogModel = require("./blogModel");

module.exports.createBlogDBService = async (blogDetails) => {
    try {

        var blogModelData = new blogModel();
        blogModelData.username = blogDetails.username;
        blogModelData.title = blogDetails.title;
        blogModelData.blog= blogDetails.blog;

        
        const savedData = await blogModelData.save();
        return savedData; 
    } catch (err) {
        throw err; 
    }
};

module.exports.getAllBlogData = async () => {
    try {
        const blogData = await blogModel.find({}, { username: 1, title: 1, blog: 1 }); 
        return blogData;
    } catch (err) {
        throw err;
    }
};

module.exports.getBlogsByTitle = async (title) => {
    try {
      const blogs = await blogModel.find({ title });
      if (blogs.length > 0) {
        return blogs;
      } else {
        throw new Error("No blogs found for this title");
      }
    } catch (err) {
      throw err;
    }
};
