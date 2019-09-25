const { test, trait } = use('Test/Suite')('User');

const Helpers = use('Helpers');

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory');

/** @type {typeof import ('@adonisjs/lucid/src/Lucid/Model')} */
const User = use('App/Models/User');

trait('Test/ApiClient');
trait('DatabaseTransactions');
trait('Auth/Client');

test('It should return a new user created', async ({ client }) => {
  const userPayload = {
    name: 'Maria Neto',
    email: 'maria@gmail.com',
    password: '123456',
  };

  const response = await client
    .post('/users')
    .send(userPayload)
    .end();
  response.assertStatus(201);
  response.assertJSONSubset({
    name: userPayload.name,
    email: userPayload.email,
  });
});

test('Can get a user by id', async ({ client }) => {
  const users = await Factory.model('App/Models/User').createMany(3);
  const user = users[0];
  const response = await client.get(`/users/${user.id}`).end();

  response.assertStatus(200);
  response.assertJSONSubset({ name: user.name, email: user.email });
});

test('Status 404 if id do not exist', async ({ client }) => {
  const response = await client.get('/users/999').end();

  response.assertStatus(404);
});

test('It should be able to creat avatar', async ({ client, assert }) => {
  const userPayload = {
    name: 'Maria Neto',
    email: 'maria@gmail.com',
    password: '123456',
  };

  const user = await Factory.model('App/Models/User').create(userPayload);

  const response = await client
    .put('/profile')
    .loginVia(user, 'jwt')
    .attach('avatar', Helpers.tmpPath('test/avatar.jpg'))
    .end();
  response.assertStatus(200);
  assert.exists(response.body.avatar);
});
