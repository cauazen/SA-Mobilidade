import express from 'express';
import { listarRecargas, adicionarRecarga } from '../controllers/recargasController.js';

const router = express.Router();
router.get('/', listarRecargas);
router.post('/', adicionarRecarga);
export default router;