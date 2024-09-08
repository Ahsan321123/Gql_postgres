/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
    await knex.schema.createTable('authors',(table)=>{
      table.string('id').primary()
      table.string('name').notNullable()
      table.boolean('verified') 
    })
  
  
  };
  
  /**
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
  exports.down = function(knex) {
    knex.schema.dropTable('authors')
  };
  