import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class SiteInfos extends BaseSchema {
  protected tableName = 'site_infos'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.boolean('online')
      table.string('port')

      table.integer('site_id').unsigned()
      table.foreign('site_id').references('id').inTable('sites')
      table.timestamps(true)
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
