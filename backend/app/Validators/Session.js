const Antl = use('Antl');

class Session {
  get validateAll() {
    return true;
  }

  get rules() {
    return {
      email: 'email|required',
      password: 'required',
    };
  }

  get Messages() {
    return Antl.list('validation');
  }
}

module.exports = Session;
