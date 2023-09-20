const Author = require("../models/author.model.js");
const getArticleByAuthor = (req, res) => {
  Author.getByAuthor((req.params.idx), (err, data) => {
    if(err){
      res.status(500).send({
        message: err.message || "Some error occured retrieving author data"
      })
    }
    else{
      console.log(`Author.js data: ${data}`)
      res.render("author", {
        articles: data,
        authors: data[0],
      })
    }
  })
};

// export controller functions
module.exports = {
  getArticleByAuthor
};
