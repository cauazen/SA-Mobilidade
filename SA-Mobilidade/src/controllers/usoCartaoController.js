import pool from '../config/db.js';

export const usarCartao = async (req, res) => {
  const { id_cartao, id_empresa, valor_passagem } = req.body;
  
  try {
    // Verifica saldo geral do cartão 
    const cartao = await pool.query('SELECT saldo FROM cartoes WHERE id_cartao = $1', [id_cartao]);
    
    // Impede o uso sem o saldo suficiente
    if (cartao.rows[0].saldo < valor_passagem) {
      return res.status(400).json({ erro: 'Saldo insuficiente' });
    }
    
    // Debita do saldo geral, no caso remove o valor da passagem no cartão
    await pool.query('UPDATE cartoes SET saldo = saldo - $1 WHERE id_cartao = $2', [valor_passagem, id_cartao]);
    
    // Regitra que a empresa X recebeu este valor
    await pool.query(
      'INSERT INTO usos_cartao (id_cartao, id_empresa, valor) VALUES ($1, $2, $3)',
      [id_cartao, id_empresa, valor_passagem]
    );
    
    // Confirma o uso do cartão e informa o saldo restante
    res.json({ 
      mensagem: `Cartão usado na empresa ${id_empresa}. Valor R$ ${valor_passagem} creditado para a empresa.`,
      saldo_restante: cartao.rows[0].saldo - valor_passagem
    });
    
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao usar cartão: ' + err.message });
  }
};

// Ver extrato, no caso, quais empresas receberam dinheiro
export const verExtrato = async (req, res) => {
  const { id_cartao } = req.params;
  
  try {
    const result = await pool.query(`
      SELECT e.nome as empresa, SUM(u.valor) as total_recebido
      FROM usos_cartao u
      JOIN empresas e ON u.id_empresa = e.id_empresa
      WHERE u.id_cartao = $1
      GROUP BY e.nome`, 
      [id_cartao]);
    
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao buscar extrato' });
  }
};