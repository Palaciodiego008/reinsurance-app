import pool from '../db.js';

export class ContractModel {  
  static async getAllContracts() {
    const [rows] = await pool.query('SELECT * FROM reinsurance_contracts_test_diegopalacio ORDER BY id DESC');
    return rows;
  }

  static async createContract({ name, premium_amount, start_date, end_date }) {
    // Validación de datos
    if (typeof name !== 'string' || name.trim() === '') {
      throw new Error('Invalid name: Name must be a non-empty string.');
    }
    if (typeof premium_amount !== 'number' || premium_amount <= 0) {
      throw new Error('Invalid premium amount: Must be a positive number.');
    }
    if (!this.isValidDate(start_date) || !this.isValidDate(end_date)) {
      throw new Error('Invalid dates: Start date and end date must be valid ISO 8601 dates.');
    }
    if (new Date(start_date) >= new Date(end_date)) {
      throw new Error('Invalid date range: Start date must be earlier than end date.');
    }

    const query = `
      INSERT INTO reinsurance_contracts_test_diegopalacio (name, premium_amount, start_date, end_date)
      VALUES (?, ?, ?, ?)
    `;
    const values = [name.trim(), premium_amount, start_date, end_date];
    const [result] = await pool.query(query, values);

    const [newContract] = await pool.query('SELECT * FROM reinsurance_contracts_test_diegopalacio WHERE id = ?', [result.insertId]);
    return newContract[0];
  }

  static isValidDate(date) {
    return !isNaN(Date.parse(date)) && new Date(date).toISOString() === date;
  }
}