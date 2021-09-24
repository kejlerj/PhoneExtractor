process.env.NODE_ENV = "test";

const app = require("../index");
const chai = require("chai");
const chaiHttp = require("chai-http");
const data = require("../assets/datas");
chai.should();
chai.use(chaiHttp);

describe("\n\nCheck companies phone number from name", () => {
  data.forEach((company) => {
    it(`${company.name}`, (done) => {
      chai
        .request(app)
        .get(`/`)
        .query({ company: company.name })
        .end((_err, res) => {
          res.should.have.status(200);
          res.body.should.have.property("phone").eql(company.phone);
          done();
        });
    });
  });
});

describe("\n\nCheck companies phone number from name & address", () => {
  data.forEach((company) => {
    it(`${company.name}`, (done) => {
      chai
        .request(app)
        .get(`/`)
        .query({ company: company.name, address: company.address })
        .end((_err, res) => {
          res.should.have.status(200);
          res.body.should.have.property("phone").eql(company.phone);
          done();
        });
    });
  });
});

describe("\n\nCheck companies phone number from name & address & siren", () => {
  data.forEach((company) => {
    it(`${company.name}`, (done) => {
      chai
        .request(app)
        .get(`/`)
        .query({
          company: company.name,
          address: company.address,
          siren: company.siren,
        })
        .end((_err, res) => {
          res.should.have.status(200);
          res.body.should.have.property("phone").eql(company.phone);
          done();
        });
    });
  });
});
