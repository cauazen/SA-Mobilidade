import pool from '../config/db.js';

// Lista as recargas feitas
export const listarRecargas = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT r.id_recarga, c.numero_cartao, r.valor, r.data_recarga
      FROM recargas r
      JOIN cartoes c ON r.id_cartao = c.id_cartao
      ORDER BY r.data_recarga DESC
    `);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao listar recargas' });
  }
};

export const adicionarRecarga = async (req, res) => {
  const { id_cartao, valor } = req.body;
  try {
    // Apenas adiciona ao saldo geral do cartão
    await pool.query('UPDATE cartoes SET saldo = saldo + $1 WHERE id_cartao = $2', [valor, id_cartao]);
    
    // Registra a recarga
    await pool.query('INSERT INTO recargas (id_cartao, valor) VALUES ($1, $2)', [id_cartao, valor]);
    
    res.status(201).json({ mensagem: 'Recarga realizada com sucesso' });
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao adicionar recarga' });
  }
};