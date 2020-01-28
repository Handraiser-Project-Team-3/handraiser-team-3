/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
  pgm.createTable("messages", {
    id: {
      type: "serial",
      primaryKey: true
    },
    user_id: {
      type: "integer",
      notNull: true,
      references: '"users"'
    },
    chat_room_id: {
      type: "integer",
      notNull: true,
      references: '"chat_room"'
    },
    content: {
      type: "text",
      notNull: true
    },
    message_created: {
      type: "timestamp",
      notNull: true,
      default: pgm.func("current_timestamp")
    }
  });
};

exports.down = pgm => {
  pgm.dropTable("messages");
};
