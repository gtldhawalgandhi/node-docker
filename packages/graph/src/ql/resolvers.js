export default  {
  register: async function({ userInput }, req) {

  },
  login: async function({ email, password }) {

    return {
      token: 'dummyToken123',
      userId: 'userId1234',
    };

  }
};
