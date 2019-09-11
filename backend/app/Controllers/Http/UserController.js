/** @type {typeof import ('@adonisjs/lucid/src/Lucid/Model')} */
const User = use('App/Models/User');

class UserController {
  async store({ request, response }) {
    const user = request.only(['email', 'password', 'name']);

    const newUser = await User.create(user);

    return response.created(newUser);
  }

  async list({ response }) {
    const users = await User.all();
    return response.ok(users);
  }

  async show({ response, params }) {
    const user = await User.findOrFail(params.id);

    return response.ok(user);
  }
}

module.exports = UserController;
