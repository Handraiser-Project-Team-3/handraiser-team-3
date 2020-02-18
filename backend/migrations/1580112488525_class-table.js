/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
  pgm.createTable("class", {
    id: {
      type: "serial",
      primaryKey: true
    },
    class_name: {
      type: "text",
      notNull: true
    },
    class_created: {
      type: "timestamp",
      notNull: true,
      default: pgm.func("current_timestamp")
    },
    class_description: {
      type: "text"
    },
    class_code: {
      type: "text",
      notNull: true
    },
    class_status: {
      type: "boolean",
      notNull: true
    },
    user_id: {
      type: "integer",
      notNull: true,
      references: '"users"'
    }
  });
};

exports.down = pgm => {
  pgm.dropTable("class", { cascade: true });
};
