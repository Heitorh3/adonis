/** @type {typeof import ('@adonisjs/lucid/src/Lucid/Model')} */
const User = use('App/Models/User');

class UserController {
  async store({ request, response }) {
    const data = request.only(['email', 'password', 'name']);

    const user = await User.ccreate(data);

    return response.created(user);
  }

  async show({ response, params }) {
    const user = await User.findOrFail(params.id);

    return response.ok(user);
  }
}

module.exports = UserController;
