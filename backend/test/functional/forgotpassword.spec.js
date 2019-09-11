'use strict';

const { test, trait } = use('Test/Suite')('Reset password');

const { subHours, format } = require('date-fns');

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory');

/** @type {typeof import ('@adonisjs/lucid/src/Lucid/Model')}*/
const User = use('App/Models/User');
const Hash = use('Hash');
const Mail = use('Mail');
const Database = use('Database');

trait('Test/ApiClient');
trait('DatabaseTransactions');

test('It should send an email with forgot password instructions', async ({
  assert,
  client,
}) => {
  Mail.fake();

  const email = 'maria@gmail.com';
  const user = await Factory.model('App/Models/User').create({ email });

  await client
    .post('/forgot')
    .send({ email })
    .end();

  const token = await user.tokens().first();

  const recentEmail = Mail.pullRecent();
  assert.equal(recentEmail.message.to[0].address, email);

  assert.include(token.toJSON(), {
    type: 'forgotpassword',
  });

  Mail.restore();
});

test('it should be able reset password', async ({ assert, client }) => {
  Mail.fake();

  const email = 'maria@gmail.com';

  const user = await Factory.model('App/Models/User').create({ email });
  const userToken = await Factory.model('App/Models/Token').make();

  await user.tokens().save(userToken);

  const response = await client
    .post('/reset')
    .send({
      token: userToken.token,
      password: '123456',
      password_confirmation: '123456',
    })
    .end();

  response.assertStatus(204);

  await user.reload();
  const checkPassword = await Hash.verify('123456', user.password);

  assert.isTrue(checkPassword);

  Mail.restore();
});

test('it cannot reset password after 2h of forgot password request', async ({
  client,
}) => {
  const email = 'maria@gmail.com';

  const user = await Factory.model('App/Models/User').create({ email });
  const userToken = await Factory.model('App/Models/Token').make();

  await user.tokens().save(userToken);
  const dataWithSub = format(subHours(new Date(), 2), 'yyyy-MM-dd HH:ii:ss');

  await Database.table('tokens')
    .where('token', userToken.token)
    .update('created_at', dataWithSub);

  await userToken.reload();

  const response = await client
    .post('/reset')
    .send({
      token: userToken.token,
      password: '123456',
      password_confirmation: '123456',
    })
    .end();

  response.assertStatus(400);
});
