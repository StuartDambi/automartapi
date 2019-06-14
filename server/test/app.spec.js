import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../app';

const { expect } = chai;
const signupUrl = '/api/v1/users/signup';
// const loginUrl = '/api/v1/users/signin';

chai.use(chaiHttp);

const regData = {
  email: 'stuartdambi@gmail.com',
  first_name: 'Dambi',
  last_name: 'Stuart',
  password: 'Root1234',
  address: 'Kampala',
  is_admin: true,

};

// const userData = {
//   email: 'stuartdambi@gmail.com',
//   password: 'Root1234',
// };

describe('User', () => {
  it('should return a new user with the supplied properties', (done) => {
    chai.request(server).post(signupUrl).send(regData).end((_err, res) => {
      console.log(res.body.message);
      expect(res.status).to.eq(201);
      done();
    });
  });
});
