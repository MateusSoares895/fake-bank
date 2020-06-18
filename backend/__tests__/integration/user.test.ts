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
describe('User', () => {
  it('should create a user on bank', async () => {
    const { body, status } = await request.post('/users').send(user)

    cardIndentifier = body.cardIndentifier

    expect(body.name).toBe(user.email)
    expect(body.cardIndentifier).toBeDefined()
    expect(typeof body.cardIndentifier).toBe('string')
    expect(status).toBe(201)
  })

  it('should list users', async () => {
    const { status } = await request.get('/users')

    expect(status).toBe(200)
  })

  it('should show user by your card indentifier', async () => {
    const { status } = await request.get(`/user/${cardIndentifier}`)

    expect(status).toBe(200)
  })

  it('should update name on bank', async () => {
    const new_name = faker.name.firstName()
    const { body, status } = await request
      .put('/users')
      .send({ cardIndentifier, name: new_name, password: user.password })

    expect(body.name).toBe(new_name)
    expect(body.cardIndentifier).toBeDefined()
    expect(typeof body.cardIndentifier).toBe('string')
    expect(status).toBe(200)
  })
  it('should update password on bank', async () => {
    const new_pasword = faker.name.firstName()
    const { body, status } = await request.put('/users').send({
      cardIndentifier,
      password: user.password,
      new_password: new_pasword,
    })

    user.password = new_pasword

    expect(body.name).toBe(user.email)
    expect(body.cardIndentifier).toBeDefined()
    expect(typeof body.cardIndentifier).toBe('string')
    expect(status).toBe(200)
  })
  it('should unsuccessfully update user', async () => {
    const new_pasword = faker.name.firstName()
    const { status } = await request.put('/users').send({
      cardIndentifier,
      password: 'Invalid Password',
      new_password: new_pasword,
    })

    expect(status).toBe(401)
  })
  it('should unsuccessfully delete user', async () => {
    const { status } = await request.delete('/users').send({
      email: user.email,
      password: 'Invalid Password',
    })

    expect(status).toBe(401)
  })
  it('should delete user', async () => {
    const { status } = await request.delete('/users').send({
      email: user.email,
      password: user.password,
    })

    expect(status).toBe(200)
  })
})
