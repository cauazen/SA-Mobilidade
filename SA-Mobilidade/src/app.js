import express from 'express';
import dotenv from 'dotenv';
import usuariosRoutes from './routes/usuariosRoutes.js';
import authRoutes from './routes/authRoutes.js';
import cartoesRoutes from './routes/cartoesRoutes.js';
import empresasRoutes from './routes/empresasRoutes.js';
import recargasRoutes from './routes/recargasRoutes.js';

dotenv.config();

const app = express();
app.use(express.json());

app.get('/', (req, res) => res.send('API is very Spinning'));

app.use('/usuarios', usuariosRoutes);
app.use('/auth', authRoutes);
app.use('/cartoes', cartoesRoutes);
app.use('/empresas', empresasRoutes);
app.use('/recargas', recargasRoutes);

app.listen(process.env.PORT || 3000, () =>
  console.log(`Servidor rodando na porta ${process.env.PORT}`)
);