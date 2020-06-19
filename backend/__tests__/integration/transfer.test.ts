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

const user2 = {
  name: faker.name.firstName(),
  email: faker.internet.email(),
  password: faker.internet.password(),
}

let cardIndentifier: string

describe('Transfer', () => {
  beforeAll(async () => {
    await request.post('/users').send(user)
    const { body } = await request.post('/users').send(user2)
    cardIndentifier = body.cardIndentifier
  })
  it('should transfer U$10 in user account', async () => {
    const { status } = await request.post('/transfer').send({
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
    await request
      .delete('/users')
      .send({ email: user2.email, password: user2.password })
  })
})
