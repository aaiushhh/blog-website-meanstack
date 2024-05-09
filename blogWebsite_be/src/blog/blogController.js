var blogService=require("./blogService");

var createBlogControllerFn = async (req, res) => {
    try {
        const result = await blogService.createBlogDBService(req.body);
        res.send({ status: true, message: result.message });
    } catch (err) {
        console.error(err);
        res.send({ status: false, message: "Error creating user" });
    }
};

var getAllBlogDataControllerFn = async (req, res) => {
    try {
        const blogData = await blogService.getAllBlogData();
        res.send({ status: true, data: blogData });
    } catch (err) {
        console.error(err);
        res.status(500).send({ status: false, message: "Error fetching blog data" });
    }
};

var getBlogsByTitleControllerFn = async (req, res) => {
    try {
        const { title } = req.params;
        const blogs = await blogService.getBlogsByTitle(title);
        res.send({ status: true, data: blogs });
    } catch (err) {
        console.error(err);
        res.status(500).send({ status: false, message: "Error fetching blogs by title" });
    }
};

module.exports={createBlogControllerFn,getAllBlogDataControllerFn,getBlogsByTitleControllerFn}