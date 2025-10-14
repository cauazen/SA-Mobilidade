import express from 'express';
import { listarCartoes, adicionarCartao } from '../controllers/cartoesController.js';
import { usarCartao, verExtrato } from '../controllers/usoCartaoController.js';

const router = express.Router();
router.get('/', listarCartoes);
router.post('/', adicionarCartao);
router.post('/usar', usarCartao);
router.get('/:id_cartao/extrato', verExtrato);
export default router;