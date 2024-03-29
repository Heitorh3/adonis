const Antl = use('Antl');
const { rule } = use('Validator');

class Workshop {
  get validateAll() {
    return true;
  }

  get rules() {
    return {
      title: [rule('required')],
      description: [rule('required')],
      section: [rule('required'), rule('in', [1, 2, 3])],
      user_id: [rule('exists', ['users', 'id'])],
    };
  }

  get Messages() {
    return Antl.list('validation');
  }
}

module.exports = Workshop;
