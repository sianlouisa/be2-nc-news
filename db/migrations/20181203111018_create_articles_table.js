exports.up = function (knex, Promise) {
  return knex.schema.createTable('articles', (articlesTable) => {
    articlesTable.increments('article_id').primary();
    articlesTable.string('title');
    articlesTable.string('body', 5000);
    articlesTable
      .integer('votes')
      .defaultTo(0)
      .unsigned();
    articlesTable.string('topic').references('topics.slug');
    articlesTable.integer('created_by').references('users.user_id');
    articlesTable.timestamp('created_at').defaultTo(knex.fn.now());
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('articles');
};
