import pool from '../db.js';

export class ContractModel {  
  static async getAllContracts() {
    const [rows] = await pool.query('SELECT * FROM reinsurance_contracts_test_diegopalacio ORDER BY id DESC');
    return rows;
  }

  static async createContract({ name, premium_amount, start_date, end_date }) {
    const query = `
      INSERT INTO reinsurance_contracts_test_diegopalacio (name, premium_amount, start_date, end_date)
      VALUES (?, ?, ?, ?)
    `;
    const values = [name, premium_amount, start_date, end_date];
    const [result] = await pool.query(query, values);

    const [newContract] = await pool.query('SELECT * FROM reinsurance_contracts_test_diegopalacio WHERE id = ?', [result.insertId]);
    return newContract[0];
  }

  static async deleteContract(id) {
    const query = 'DELETE FROM reinsurance_contracts_test_diegopalacio WHERE id = ?'
    const [result] = await pool.query(query, [id]);
    if (result.affectedRows === 0) {
      return null; // No contract found with the given ID
    }
    return { message: 'Contract deleted successfully' }; // Return a success message
  }
}
