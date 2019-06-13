import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../app';

const available = '/api/v1/cars?status=available';
const { expect } = chai;
chai.use(chaiHttp);

describe('cars', () => {
  it('should return all in the database', (done) => {
    chai.request(server.get(available).end((_err, res) => {
      expect(res.status).to.eq(200);
      expect(res.body.data[0]).to.have.property('id');
      done();
    }));
  });
});
