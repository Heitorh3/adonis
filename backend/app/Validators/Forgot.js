class Forgot {
  get rules() {
    return {
      email: 'required|email|unique:users',
    };
  }
}

module.exports = Forgot;
