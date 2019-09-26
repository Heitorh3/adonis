const { test, trait } = use('Test/Suite')('Workshop');

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory');

/** @type {typeof import ('@adonisjs/lucid/src/Lucid/Model')} */
const User = use('App/Models/User');

/** @type {typeof import ('@adonisjs/lucid/src/Lucid/Model')} */
const Workshop = use('App/Models/Workshop');

trait('Test/ApiClient');
trait('DatabaseTransactions');
trait('Auth/Client');

test('It should be able to create workshops', async ({ assert, client }) => {
  const user = await Factory.model('App/Models/User').create();

  const response = await client
    .post('/workshops')
    .loginVia(user, 'jwt')
    .send({
      title: 'React-native',
      description: 'React-native e adonis',
      user_id: user.id,
      section: 1,
    })
    .end();
  response.assertStatus(201);
  assert.exists(response.body.id);
});

test('It should be able to list workshops', async ({ assert, client }) => {
  const user = await Factory.model('App/Models/User').create();
  const workshop = await Factory.model('App/Models/Workshop').make();

  await user.workshops().save(workshop);

  const response = await client
    .get('/workshops')
    .loginVia(user, 'jwt')
    .end();

  response.assertStatus(200);
  assert.equal(response.body[0].title, workshop.title);
  assert.equal(response.body[0].description, workshop.description);
  assert.equal(response.body[0].user.id, workshop.user_id);
});

test('It should be able to show single workshop', async ({
  assert,
  client,
}) => {
  const user = await Factory.model('App/Models/User').create();
  const workshop = await Factory.model('App/Models/Workshop').create();

  await user.workshops().save(workshop);

  const response = await client
    .get(`/workshops/${workshop.id}`)
    .loginVia(user, 'jwt')
    .end();

  response.assertStatus(200);
  assert.equal(response.body.title, workshop.title);
  assert.equal(response.body.user.id, user.id);
});

test('It should be able to update a workshop', async ({ assert, client }) => {
  const user = await Factory.model('App/Models/User').create();
  const workshop = await Factory.model('App/Models/Workshop').create({
    title: 'Old workshop',
  });

  await user.workshops().save(workshop);

  const response = await client
    .put(`/workshops/${workshop.id}`)
    .loginVia(user, 'jwt')
    .send({
      ...workshop.toJSON(),
      title: 'New Workshop',
    })
    .end();

  response.assertStatus(200);
  assert.equal(response.body.title, 'New Workshop');
});

test('It should be able to delete a workshop', async ({ assert, client }) => {
  const user = await Factory.model('App/Models/User').create();
  const workshop = await Factory.model('App/Models/Workshop').create();

  // await user.workshops().save(workshop);

  const response = await client
    .delete(`/workshops/${workshop.id}`)
    .loginVia(user, 'jwt')
    .end();

  response.assertStatus(204);

  const workshopSaved = await Workshop.find(workshop.id);
  assert.isNull(workshopSaved);
});
