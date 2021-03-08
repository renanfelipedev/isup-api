import { schema, rules } from '@ioc:Adonis/Core/Validator'

const registerSchema = schema.create({
  email: schema.string({}, [
    rules.email(),
    rules.required(),
    rules.unique({ table: 'users', column: 'email' }),
    rules.exists({ table: 'users', column: 'email' }),
  ]),

  name: schema.string({}, [rules.required()]),

  password: schema.string({}, [rules.required(), rules.minLength(6)]),
})

const loginSchema = schema.create({
  email: schema.string({}, [rules.email(), rules.exists({ table: 'users', column: 'email' })]),
  password: schema.string({}, [rules.required()]),
})

export { registerSchema, loginSchema }
