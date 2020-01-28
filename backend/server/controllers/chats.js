module.exports = {
  createChat: (req, res) => {
    const db = req.app.get("db");
    const { room_name } = req.body;

    db.chat_room
      .findOne({ room_name })
      .then(data => {
        if (data) {
          throw new Error("Room name already taken");
        }
        return db.chat_room
          .insert({
            room_name
          })
          .then(room => res.status(200).json(room))
          .catch(() => res.status(500).end());
      })
      .catch(err => {
        if ("Room name already taken".includes(err.message)) {
          res.status(400).json({ error: err.message });
        } else {
          console.error(err);
          res.status(500).end();
        }
      });
  },
  chatList: (req, res) => {
    const db = req.app.get("db");
    db.chat_room
      .find()
      .then(room => res.status(200).json(room))
      .catch(() => res.status(500).end());
  },
  createMessage: (req, res) => {
    const db = req.app.get("db");
    const { user_id, chat_room_id, content } = req.body;

    db.users.findOne({ user_id }).then(data => {
      db.messages.insert({
        user_id = data.id,
        chat_room_id,
        content
      }).then(message => res.status(200).json(message)).catch(()=> res.status(500).end())
    }).catch(()=> res.status(500).end())
  }
  // ,
  // particpantList: (req, res) => {
  //     const db = req.app.get("db")
  //     const {user_id, chat_room_id} = req.params

  //     db.participants.find({user_id, chat_room_id}).then(data => )
  // }
};
