"use strict";

class Reset {
  get rules() {
    return {
      email: "email|required",
      password: "required|confirmed"
      //password_confirmation: 'required'
    };
  }
}

module.exports = Reset;
