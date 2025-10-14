import pool from '../config/db.js';

// Lista os cartões
export const listarCartoes = async (req, res) => {
  try {  
    const result = await pool.query(`
      SELECT c.id_cartao, c.numero_cartao, c.saldo, u.nome AS usuario
      FROM cartoes c
      JOIN usuarios u ON c.id_usuario = u.id_usuario
    `);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao listar cartões' });
  }
};

// Adiciona os cartões
export const adicionarCartao = async (req, res) => { 
  const { id_usuario, numero_cartao } = req.body; 
  try {
    await pool.query(
      'INSERT INTO cartoes (id_usuario, numero_cartao) VALUES ($1, $2)',
      [id_usuario, numero_cartao]
    );
    res.status(201).json({ mensagem: 'Cartão criado com sucesso' });
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao criar cartão' });
  }
};