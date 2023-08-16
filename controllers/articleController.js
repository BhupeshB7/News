// controllers/articleController.js
const Article = require('../models/Article');

// Controller functions
const getArticles = async (req, res) => {
  try {
    const articles = await Article.find();
    res.json(articles);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

const createArticle = async (req, res) => {
  try {
    

    const { title, description, content, category } = req.body;
    const { image } = req.files;
    if (!req.files || !req.files.image) {
        return res.status(400).json({ error: 'Image file is required' });
      }
    if (image.size > 1024 * 1024) {
      return res.status(400).json({ error: 'Image file size should be less than 1MB' });
    }

    const newArticle = new Article({
      title,
      description,
      content,
      category,
      imageUrl: `/uploads/${image.name}`,
    });

    image.mv(`public/uploads/${image.name}`, async (err) => {
      if (err) {
        return res.status(500).json({ error: 'Failed to upload image' });
      }
      await newArticle.save();
      res.json(newArticle);
    });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
    console.log(error)
  }
};

module.exports = {
  getArticles,
  createArticle,
};
