/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
    await knex.schema.createTable('reviews',(table)=>{
      table.string('id').primary()
      table.integer('rating').notNullable()
      table.string('content').notNullable()
      table.string('author_id').notNullable()
      table.string('game_id').notNullable() 
    })
  
  
  };
  
  /**
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
  exports.down = function(knex) {
    knex.schema.dropTable('reviews')
  };
  