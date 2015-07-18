import { Router } from 'express';
import db from '../core/Database';

const router = new Router();

router.get('/', async (req, res, next) => {
  try {
    const path = req.query.path;

    if (!path) {
      res.status(400).send({ error: `The 'path' query parameter cannot be empty.` });
    }

    const page = await db.getPage(path);

    if (page) {
      res.status(200).send(page);
    } else {
      res.status(404).send({ error: `The page '${path}' is not found.` });
    }
  } catch (err) {
    next(err);
  }
});

export default router;
