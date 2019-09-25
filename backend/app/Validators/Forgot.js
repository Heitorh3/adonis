const Antl = use('Antl');
class Forgot {
  get validateAll() {
    return true;
  }

  get rules() {
    return {
      email: 'email|required',
    };
  }

  get Messages() {
    return Antl.list('validation');
  }
}

module.exports = Forgot;
