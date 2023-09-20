const Article = require("../models/article.model.js");
// show articles - index page
const getAllArticles = (req, res) => {
  Article.getAll((err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message || "Some error occurred retrieving articles data",
      });
    } else {
      res.render("index", {
        articles: data,
      });
    }
  });
};

// show article by slug
const getArticleBySlug = (req, res) => {
  Article.getBySlug(req.params.slug, (err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message || "Some error occured retrieving article data",
      });
    } else {
      res.render("article", {
        article: data,
      });
    }
  });
};

// create new article
const createNewArticle = (req, res) => {
  console.log("new article");

  const newArticle = new Article({
    name: req.body.name,
    slug: req.body.slug,
    image: req.body.image,
    body: req.body.body,
    published: new Date().toISOString().slice(0, 19).replace("T", " "),
    author_id: req.body.author_id,
  });

  Article.createNew(newArticle, (err, data) => {
    if(err){
      res.status(500).send({
        message: err.message || "Some error occurred sending article data"
      })
    }
    else{
      console.log(data)
      res.redirect('/')
    }
  })
};

// display article form
const showNewArticleForm = (req, res) => {
  res.render("create_article")
}

// edit article
const updateArticle = (req, res) => {
  if (req.method === "GET") {
    // Kui GET päring, lae andmed andmebaasist ja näita redigeerimisvormi
    Article.getById(req.params.id, (err, data) => {
      if (err) {
        res.status(500).send({
          message: err.message || "Some error occurred retrieving article data",
        });
      } else {
        res.render("edit_article", {
          article: data,
        });
      }
    });
  } else if (req.method === "POST") {
    // Kui POST päring, uuenda artiklit andmebaasis
    const updatedArticle = new Article({
      name: req.body.name,
      slug: req.body.slug,
      image: req.body.image,
      body: req.body.body,
      published: new Date().toISOString().slice(0, 19).replace("T", " "),
      author_id: req.body.author_id,
    });

    Article.updateById(req.params.id, updatedArticle, (err, data) => {
      if (err) {
        res.status(500).send({
          message: err.message || "Some error occurred updating article data",
        });
      } else {
        res.redirect('/');  // Uuendatud artikli näitamiseks või edasisuunamine kuhu iganes soovid
      }
    });
  }
};

const deleteArticle = (req, res) => {
  Article.deleteById(req.params.id, (err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message || "Some error occurred deleting the article.",
      });
    } else {
      res.redirect('/');  // Edasisuunamine pealehele pärast kustutamist
    }
  });
};

// export controller functions
module.exports = {
  getAllArticles,
  getArticleBySlug,
  createNewArticle,
  showNewArticleForm,
  updateArticle,
  deleteArticle,
};
