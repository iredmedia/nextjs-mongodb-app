import nextConnect from 'next-connect';
import middleware from '../../middlewares/middleware';

const handler = nextConnect();

handler.use(middleware);

handler.get(async (req, res) => {
  try {
    let messages = await req.db
      .collection('messages')
      .find({ channelId: 1 })
      .sort({ _id: -1 })
      .limit(5)
      .toArray();

    messages = messages
      .reverse()
      .map(item => ({
        created_at: new Date(parseInt(item._id.toString().substring(0, 8), 16) * 1000), ...item,
      }));

    return res.json({
      status: 'ok',
      messages,
    });
  } catch (error) {
    return res.send({
      status: 'error',
      message: error.toString(),
    });
  }
});

handler.post((req, res) => {
  const { body } = req.body;
  const channelId = 1;

  if (!req.user) {
    res.send({
      status: 'error',
      message: 'No user found',
    });
  }

  if (!body) {
    return res.send({
      status: 'error',
      message: 'The body you entered is invalid.',
    });
  }

  return req.db.collection('messages')
    .insertOne({
      userId: req.user._id.toString(),
      channelId,
      body,
    })
    .then(async (data) => {
      const messages = await req.db
        .collection('messages')
        .find({ channelId })
        .toArray();

      res.status(201).json({
        status: 'ok',
        message: `Message with: ${body} was sent`,
        messages,
      });
    })
    .catch(error => res.send({
      status: 'error',
      message: error.toString(),
    }));
});

export default handler;
