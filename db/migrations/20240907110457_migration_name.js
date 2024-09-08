/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
    await knex.schema.createTable('games',(table)=>{
      table.string('id').primary()
      table.string('title').notNullable()
      table.specificType('platform','text[]') // if want to set the objects in platform we can do
      //  table.specificType('platform', 'jsonb[]'); 
    })
  
  
  };
  
  /**
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
  exports.down = function(knex) {
    knex.schema.dropTable('games')
  };
  