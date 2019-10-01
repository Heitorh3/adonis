/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class AddGithubLinkedinTitleFieldUsersSchema extends Schema {
  up() {
    this.table('users', table => {
      table.string('github');
      table.string('linkedin');
      table.string('title');
    });
  }

  down() {
    this.table('users', table => {
      // reverse alternations
    });
  }
}

module.exports = AddGithubLinkedinTitleFieldUsersSchema;
