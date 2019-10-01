/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class AddAvatarFieldUsersSchema extends Schema {
  up() {
    this.table('users', table => {
      table.string('avatar');
    });
  }

  down() {
    this.table('users', table => {
      // reverse alternations
    });
  }
}

module.exports = AddAvatarFieldUsersSchema;
