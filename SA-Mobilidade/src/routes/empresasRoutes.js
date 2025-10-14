import express from 'express';
import { listarEmpresas, adicionarEmpresa } from '../controllers/empresasController.js';

const router = express.Router();
router.get('/', listarEmpresas);
router.post('/', adicionarEmpresa);
export default router;