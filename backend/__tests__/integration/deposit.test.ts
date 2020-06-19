import faker from 'faker'
import supertest from 'supertest'

import App from '../../src/app'

const app = new App().express

const request = supertest(app)

const user = {
  name: faker.name.firstName(),
  email: faker.internet.email(),
  password: faker.internet.password(),
}

let cardIndentifier: string

describe('Deposit', () => {
  beforeAll(async () => {
    const { body } = await request.post('/users').send(user)

    cardIndentifier = body.cardIndentifier
  })
  it('should deposit U$10 in user account', async () => {
    const { status } = await request
      .post('/deposit')
      .send({
        email: user.email,
        password: user.password,
        cardIndentifier,
        value: 10,
      })

    expect(status).toBe(200)
  })
  afterAll(async () => {
    await request
      .delete('/users')
      .send({ email: user.email, password: user.password })
  })
})
