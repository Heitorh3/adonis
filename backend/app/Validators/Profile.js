const Antl = use('Antl');

class Profile {
  get validateAll() {
    return true;
  }

  get rules() {
    return {
      name: 'required',
      password: 'confirmed',
      avatar: 'file|file_ext:png,jpg,jpeg|file_types:image|file_size:2mb',
    };
  }

  get Messages() {
    return Antl.list('validation');
  }
}

module.exports = Profile;
