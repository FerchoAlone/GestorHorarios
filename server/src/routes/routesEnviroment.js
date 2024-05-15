app.get('/environments', async (req, res) => {
    try {
      const environments = await getAllEnvironments();
      res.json(environments);
    } catch (error) {
      res.status(500).json({ message: 'Error retrieving environments', error });
    }
  });