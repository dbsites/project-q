// import the api for testing
const api = require('./api');
// import request to hit the api end point
const request = require('supertest');


// afterEach(() => {
//   api.stop();
// });

describe('/auth route:', () => {


  // no cookies test for /auth
  test('no cookies return 401: isAuth: false', async(done: any) => {
    const response: any  = await request(api).get('/auth');
    expect(response.status).toEqual(401);
    expect(response.type).toEqual('application/json');
    expect(response.body).toEqual({isAuth: false})
    done();
  });

  // invalid /login attempt
  test('bad login credentials return 401: INVALID CREDENTIALS', async(done: any) => {
    const login = {
      loginEmail: "bad@bad.worse",
      loginPassword: "passw0rd",
      rememberMe: false
    }
    const response: any = await request(api).post('/login').send(login);
    expect(response.status).toEqual(401);
    expect(response.type).toEqual('text/html');
    expect(response.text).toEqual('INVALID CREDENTIALS');
    done();

  })

  // invalid /register attempt...duplicate email
  test('registering with an existing email address returns 401 Registration Failure', async(done: any) => {
    const register = {
      registerEmail: "meka1111@meka.com",
      confirmPassword: "jeeves2k18",
      firstName: "Joel",
      lastName: "Perkins",
      agreeTerms: true,
    }
    const response: any = await request(api).post('/register').send(register);
    expect(response.status).toEqual(401);
    expect(response.type).toEqual('text/html');
    expect(response.text).toEqual('REGISTRATION FAILURE');
    done();
  })

});