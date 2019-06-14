import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../app';

const { expect } = chai;
const signupUrl = '/api/v1/auth/signup';
const loginUrl = '/api/v1/auth/signin';
const available = '/api/v1/car?status=available';

chai.use(chaiHttp);

const regData = {
  email: 'jonathanaurugai12@gmail.com',
  first_name: 'Jonathan',
  last_name: 'Aurugai',
  password: 'Root1234',
  address: 'Kampala',
  is_admin: true,

};

const carData = {
  state: 'used',
  status: 'unsold',
  price: '200',
  manufacturer: 'toyota',
  model: 'premio',
  body_type: 'car',
};

const userData = {
  email: 'jonathanaurugai12@gmail.com',
  password: 'Root1234',
};

describe('User', () => {
  describe('User create', () => {
    it('should return a new user with the supplied properties', (done) => {
      chai.request(server).post(signupUrl).send(regData).end((_err, res) => {
        console.log(res.body.message);
        expect(res.status).to.eq(201);
        done();
      });
    });
    it('should return error if all required fields are not supplied', (done) => {
      const data = {
        email: 'janedoe@gmail.com',
        first_name: 'jane',
        password: 'Root1234',
        address: 'kampala',
        phone: '0753688218',
      };
      chai.request(server).post(signupUrl).send(data).end((err, res) => {
        expect(res.status).to.eq(400);
        expect(res.body.data.name).to.eq('ValidationError');
        done();
      });
    });
  });
  describe('logging in the user', () => {
    it('should return a token and user details', () => {
      chai.request(server).post(loginUrl).send(userData).then((res) => {
        expect(res.status).to.eq(200);
      })
        .catch((error) => {
          throw error;
        });
    });
  });
});

describe('cars', () => {
  it('should return all cars that are available', (done) => {
    chai.request(server).get(available).end((_err, res) => {
      expect(res.status).to.eq(200);
      expect(res.body.data[0]).to.have.property('id');
      done();
    });
  });

  it('should return an error when wrong parameter is used', (done) => {
    chai.request(server).get('/api/v1/car?status=available2').end((_err, res) => {
      expect(res.status).to.eq(400);
      done();
    });
  });

  describe('manage cars', () => {
    it('should return car within a specific price range', (done) => {
      chai.request(server).get('/api/v1/car?min_price=200&max_price=300').end((_err, res) => {
        expect(res.status).to.eq(200);
        done();
      });
    });
    it('should return car within a specific price range', (done) => {
      chai.request(server).get('/api/v1/car/1').end((_err, res) => {
        expect(res.status).to.eq(200);
        done();
      });
    });
    it('should 401 for unauthorised access', (done) => {
      chai.request(server).post('/api/v1/car').send(carData).end((_err, res) => {
        expect(res.status).to.eq(401);
        done();
      });
    });
    it('should return 400 for invalid input', (done) => {
      const token = chai.request(server).post(loginUrl).send(userData).then(res => res.status.data);
      chai.request(server).post('/api/v1/car').set('x-auth', token).send({})
        .end((_err, res) => {
          expect(res.status).to.eq(400);
          done();
        });
    });
    it('should return 400 for invalid input', (done) => {
      const token = chai.request(server).post(loginUrl).send(userData).then(res => res.status.data);
      chai.request(server).post('/api/v1/car').set('x-auth', token).send(carData)
        .end((_err, res) => {
          expect(res.status).to.eq(201);
          done();
        });
    });
  });
});
