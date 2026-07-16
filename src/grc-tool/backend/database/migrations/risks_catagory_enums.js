import { BaseSchema } from '@adonisjs/lucid/schema';
export default class extends BaseSchema {
    async up() {
        await this.db.rawQuery(`ALTER TABLE risks MODIFY COLUMN category ENUM(
        'strategic','operational','financial','compliance','reputational',
        'technical','physical','other','people','process','technology','ai_risk'
      ) NOT NULL DEFAULT 'other'`);
    }
    async down() {
        await this.db.rawQuery(`ALTER TABLE risks MODIFY COLUMN category ENUM(
        'strategic','operational','financial','compliance','reputational',
        'technical','physical','other'
      ) NOT NULL DEFAULT 'other'`);
    }
}
//# sourceMappingURL=risks_catagory_enums.js.map