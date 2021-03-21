import { DateTime } from 'luxon'
import { BaseModel, column, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm'

import Status from './Status'

export default class Site extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public address: string

  @column()
  public description: string

  @column()
  public time: number

  @column()
  public userId: number

  @hasMany(() => Status)
  public status: HasMany<typeof Status>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
