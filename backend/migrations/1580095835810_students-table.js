/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
  pgm.createTable("students", {
    id: {
      type: "serial",
      primaryKey: true
    },
    user_id: {
      type: "serial",
      notNull: true,
      references: '"user"'
    },
    class_id: {
      type: "integer",
      notNull: true,
      references: '"class"'
    },
    date_joined: {
      type: "date",
      notNull: true,
      default: pgm.func("current_date")
    }
  });
};

exports.down = pgm => {
  pgm.dropTable("students");
};
