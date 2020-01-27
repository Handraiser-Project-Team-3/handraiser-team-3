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
      references: '"user"'
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
      type: "interval",
      notNull: true
    }
  });
};

exports.down = pgm => {
  pgm.dropTable("messages");
};
