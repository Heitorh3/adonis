/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class FileSchema extends Schema {
  up() {
    this.create('files', table => {
      table.increments();
      table.string('name').notNullable();
      table.string('path').notNullable();
      table.timestamps();
    });
  }

  down() {
    this.drop('files');
  }
}

module.exports = FileSchema;
