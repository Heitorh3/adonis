const { randomBytes } = require('crypto');
const { promisify } = require('util');

const Mail = use('Mail');
const Env = use('Env');

const Kue = use('Kue');
const Job = use('App/Jobs/ForgotPasswordEmail');

/** @type {typeof import ('@adonisjs/lucid/src/Lucid/Model')} */
const User = use('App/Models/User');

class ForgotPasswordController {
  async store({ request }) {
    const email = request.input('email');
    const user = await User.findByOrFail('email', email);

    const random = await promisify(randomBytes)(24);
    const token = random.toString('hex');
    const { name } = user;

    await user.tokens().create({
      token,
      type: 'forgotpassword',
    });

    const resetPasswordUrl = `${Env.get('FRONT_URL')}/reset?token=${token}`;

    Kue.dispatch(Job.key, { email, name, resetPasswordUrl }, { attempts: 3 });
  }
}

module.exports = ForgotPasswordController;
