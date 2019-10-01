/** @type {typeof import ('@adonisjs/lucid/src/Lucid/Model')} */
const User = use('App/Models/User');

const Helpers = use('Helpers');
const Hash = use('Hash');

class ProfileController {
  async update({ request, response, auth }) {
    const user = await auth.getUser();
    const data = request.only(['name', 'bio', 'title', 'github', 'linkedin']);

    const password = request.input('password');

    try {
      if (!request.file('avatar')) return;

      const avatar = request.file('avatar');
      const fileName = `${new Date().getTime()}.${avatar.subtype}`;

      await avatar.move(Helpers.tmpPath('uploads'), {
        name: fileName,
      });

      if (!avatar.moved()) {
        throw avatar.error();
      }

      user.avatar = fileName;
      user.merge(data);

      if (password) {
        user.password = password;
      }

      await user.save();

      return user;
    } catch (err) {
      return response
        .status(err.status)
        .send({ error: { message: 'Error from upload avatar' } });
    }
  }
}

module.exports = ProfileController;
