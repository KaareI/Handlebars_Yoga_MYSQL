// db connection
const con = require("../utils/db")
const Author = (author) => {
  this.id = author.id;
  this.author_name = author.author_name;
}

Author.getByAuthor = (author_id, result) => {
  let query = `SELECT * from article as a, author as b WHERE a.author_id=${author_id} and a.author_id=b.id;`;
  let query2 = `SELECT * from author where id=${author_id};`;

  con.query(query, (err, articles) => {
    if(err){
      console.log("error: ", err)
      result(err, null)
      return;
    }
    result(null, articles);
    con.query(query2, (err, authors) => {
      if(err){
        console.log("error: ", err)
        result(err, null)
        return;
      }
      result(null, authors)
    })
  })

}

module.exports = Author;