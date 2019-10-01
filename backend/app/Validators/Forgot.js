<<<<<<< HEAD
=======
const Antl = use('Antl');
>>>>>>> d47e81069dde6d4040c34b6352aa07a0677b4cd3
class Forgot {
  get validateAll() {
    return true;
  }

  get rules() {
    return {
<<<<<<< HEAD
      email: 'required|email|unique:users',
=======
      email: 'email|required',
>>>>>>> d47e81069dde6d4040c34b6352aa07a0677b4cd3
    };
  }

  get Messages() {
    return Antl.list('validation');
  }
}

module.exports = Forgot;
