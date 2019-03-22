const generateConfirmationCode = () => {
  let code = '';

  for (let i = 0; i < 12; i++) {
    let random = Math.floor(Math.random() * 100);
    code += random.toString();
  }

  return code;
};

module.exports = generateConfirmationCode;
