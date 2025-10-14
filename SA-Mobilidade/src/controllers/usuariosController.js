import pool from '../config/db.js';

// Lista os usuários
export const listarUsuarios = async (req, res) => {
  try {
    // Busca os usuários no banco
    const result = await pool.query('SELECT id_usuario, nome, email, saldo FROM usuarios');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao buscar usuários' });
  }
};

