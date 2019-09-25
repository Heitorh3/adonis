/** @type {typeof import ('@adonisjs/lucid/src/Lucid/Model')} */
const User = use('App/Models/User');

const Helpers = use('Helpers');

class ProfileController {
  async update({ request, response, auth }) {
    const user = await auth.getUser();

    try {
      if (!request.file('avatar')) return;

      const avatar = request.file('avatar', { size: '2mb' });
      const fileName = `${new Date().getTime()}.${avatar.subtype}`;

      await avatar.move(Helpers.tmpPath('uploads'), {
        name: fileName,
      });

      if (!avatar.moved()) {
        throw avatar.error();
      }

      user.avatar = fileName;

      return user;
    } catch (err) {
      return response
        .status(err.status)
        .send({ error: { message: 'Error from upload avatar' } });
    }
  }
}

module.exports = ProfileController;
