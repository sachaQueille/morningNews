export default function (article = [], action) {
  if (action.type === "add-article") {
    let articleAdd = [...article];
    console.log([...article]);

    let articleExist = false;

    for (let i = 0; i < articleAdd.length; i++) {
      articleExist = articleAdd[i]["title"].includes(action.articleLiked.title);
    }

    if (!articleExist) {
      articleAdd.push(action.articleLiked);
    }

    console.log(articleAdd);
    return articleAdd;
  } else if (action.type === "delete-article") {
    // console.log(action);
    let myArticles = [...article];
    let index = myArticles.findIndex(function (e) {
      return e.title === action.articleDeleted;
    });
    if (index !== -1) {
      myArticles.splice(index, 1);
    }
    // console.log(myArticles);
    return myArticles;
  } else {
    return article;
  }
}
