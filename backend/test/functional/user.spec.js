"use strict";

const { test, trait } = use("Test/Suite")("User");

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use("Factory");

/** @type {typeof import ('@adonisjs/lucid/src/Lucid/Model')}*/
const User = use("App/Models/User");

trait("Test/ApiClient");
trait("DatabaseTransactions");

test("It should return a new user created", async ({ assert, client }) => {
  const userPayload = {
    name: "Maria Neto",
    email: "maria@gmail.com",
    password: "123456"
  };
  //const user = await Factory.model("App/Models/User").create(userPayload);

  const response = await client
    .post("/users")
    .send(userPayload)
    .end();
  //console.log("error:", response.error);
  response.assertStatus(201);
  response.assertJSONSubset({
    name: userPayload.name,
    email: userPayload.email
  });
});

test("It should return list users", async ({ client }) => {
  const response = await client.get("/users").end();

  //console.log("error", response.error);
  response.assertStatus(200);
});

test("Can get a user by id", async ({ assert, client }) => {
  const users = await Factory.model("App/Models/User").createMany(3);
  const user = users[0];
  const response = await client.get(`/users/${user.id}`).end();

  response.assertStatus(200);
  response.assertJSONSubset({ name: user.name, email: user.email });
});

test("Status 404 if id do not exist", async ({ assert, client }) => {
  const response = await client.get("/users/999").end();

  response.assertStatus(404);
});
