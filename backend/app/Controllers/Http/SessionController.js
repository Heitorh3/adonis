

class SessionController {
  async store({ request, auth }) {
    const { email, password } = request.only(["email", "password"]);

    const { token } = await auth.attempt(email, password);
    return { token };
  }

  async show({ auth, params }) {
    if (auth.user.id !== Number(params.id)) {
      return "You cannot see someone else's profile";
    }
    return auth.user;
  }
}

module.exports = SessionController;
