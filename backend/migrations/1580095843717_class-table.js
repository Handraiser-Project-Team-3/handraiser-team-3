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
      type: "date",
      notNull: true,
      default: pgm.func("current_date")
    },
    class_end: {
      type: "date",
      default: pgm.func("current_date")
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
    }
  });
};

exports.down = pgm => {
  pgm.dropTable("class");
};
