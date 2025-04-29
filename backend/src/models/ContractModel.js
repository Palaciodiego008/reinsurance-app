import { pool } from '../db.js';

export class ContractModel {
  static async getAllContracts() {
    const { rows } = await pool.query('SELECT * FROM reinsurance_contracts ORDER BY id DESC');
    return rows;
  }

  static async createContract({ name, premium_amount, start_date, end_date }) {
    const query = `
      INSERT INTO reinsurance_contracts (name, premium_amount, start_date, end_date)
      VALUES ($1, $2, $3, $4)
      RETURNING *;
    `;
    const values = [name, premium_amount, start_date, end_date];
    const { rows } = await pool.query(query, values);
    return rows[0];
  }
}
