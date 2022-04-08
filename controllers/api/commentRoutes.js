const router = require('express').Router();
const { Comment } = require('../../models');

//testing route for seeing data base **********************

router.get('/', async (req,res) =>{
    try{
        const commentData = await Comment.findAll();
        const comments = commentData.map((comment) => comment.get({ plain:true}));

        res.status(200).json(comments);

    } catch (err) {
        res.status(400).json(err);

}});
//************************* 

//create a comment 
router.post('/', async (req, res) => {
    try {
      const newComment = await Comment.create({
        ...req.body,
        user_id: req.session.user_id,
        blog_id: req.session.blog_id,
      });
      console.log(newComment);
      res.status(200).json(newComment);
    } catch (err) {
      res.status(400).json(err);
    }
  });

  //delete a comment 
router.delete('/:id',  async (req, res) => {
    try {
      const commentData = await Comment.destroy({
        where: {
          id: req.params.id,
          //user_id: req.session.user_id,
        },
      });
  
      if (!commentData) {
        res.status(404).json({ message: 'No project found with this id!' });
        return;
      }
  
      res.status(200).json(commentData);
    } catch (err) {
      res.status(500).json(err);
      console.log(err);
    }
  });


module.exports = router;