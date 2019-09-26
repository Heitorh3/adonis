const Mail = use('Mail');

class ForgotPasswordEmail {
  static get concurrency() {
    return 1;
  }

  static get key() {
    return 'ForgotPasswordEmail-job';
  }

  async handle({ email, name, resetPasswordUrl }) {
    console.log(`Job: ${ForgotPasswordEmail.key} started`);

    await Mail.send(
      'emails.forgotpassword',
      { name, email, resetPasswordUrl },
      message => {
        message
          .to(email)
          .from('heitorh3@gmail.com')
          .subject('Recuperação de senha');
      }
    );
  }
}

module.exports = ForgotPasswordEmail;
