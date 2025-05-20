import { Router } from 'express';
import { create, destroy, index, show, update,  } from '../controllers/demo.controllers';

const router = Router();

router.route('/').get(index).post(create);
router.route('/:id').get(show).put(update).delete(destroy);

export default router;