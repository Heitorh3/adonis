/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class AlterFieldAvatarInUsersSchema extends Schema {
  up() {
    this.table('users', table => {
      table
        .integer('avatar_id')
        .unsigned()
        .references('id')
        .inTable('files')
        .onDelete('SET NULL')
        .onUpdate('CASCADE');
    });
  }

  down() {
    this.table('users', table => {
      table.string('avatar');
    });
  }
}

module.exports = AlterFieldAvatarInUsersSchema;
