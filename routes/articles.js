const articlesRouter = require('express').Router();
const {
  getArticles,
  getArticlesByArticleId,
  updateArticleVotes,
  deleteArticleByArticleId,
} = require('../controllers/articles');
const {
  getCommentsByArticleId,
  postCommentOnArticle,
  updateCommentVotes,
  deleteCommentByCommentId,
} = require('../controllers/comments');
const { handle405 } = require('../errors/index');

articlesRouter.param('article_id', (req, res, next, article_id) => {
  const regex = /^\d+$/g;
  if (regex.test(article_id)) next();
  else next({ status: 400, message: 'incorrect form for article id' });
});

articlesRouter
  .route('/')
  .get(getArticles)
  .all(handle405);

articlesRouter
  .route('/:article_id')
  .get(getArticlesByArticleId)
  .patch(updateArticleVotes)
  .delete(deleteArticleByArticleId)
  .all(handle405);

articlesRouter
  .route('/:article_id/comments')
  .get(getCommentsByArticleId)
  .post(postCommentOnArticle)
  .all(handle405);

articlesRouter
  .route('/:article_id/comments/:comment_id')
  .patch(updateCommentVotes)
  .delete(deleteCommentByCommentId)
  .all(handle405);

module.exports = articlesRouter;
