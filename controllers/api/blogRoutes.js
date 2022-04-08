const router = require('express').Router();
const { Blog } = require('../../models');

//testing route for seeing data base **********************
// api/task
router.get('/', async (req,res) =>{
    try{
        const blogData = await Blog.findAll();
        const blogs = blogData.map((blog) => blog.get({ plain:true}));

        res.status(200).json(blogs);

    } catch (err) {
        res.status(400).json(err);

}});
//************************* 

//create a blog post
router.post('/', async (req, res) => {
    try {
      const newBlog = await Blog.create({
        ...req.body,
        user_id: req.session.user_id,
      });
  
      res.status(200).json(newBlog);
    } catch (err) {
      res.status(400).json(err);
    }
  });

  //delete a blog post 
router.delete('/',  async (req, res) => {
    try {
      const blogData = await Blog.destroy({
        where: {
          id: req.session.blog_id,
          //user_id: req.session.user_id,
        },
      });
  
      if (!blogData) {
        res.status(404).json({ message: 'No project found with this id!' });
        return;
      }
  
      res.status(200).json(blogData);
    } catch (err) {
      res.status(500).json(err);
      console.log(err);
    }
  });

//updates a blog post
router.put("/", async (req, res) => {
  try {
    const updateBlog = await Blog.update(
      {
        title: req.body.title,
        description: req.body.description,
        date_created: req.body.date,
      },
      {
        where: {
          id: req.session.blog_id,
        },
      }
    );
    //res.redirect("/dashboard");
    res.status(200).json(updateBlog);
  } catch (err) {
    res.status(500).json(err);
  }
});


module.exports = router;