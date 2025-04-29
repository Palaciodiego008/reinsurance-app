import { ContractModel } from '../models/ContractModel.js';

export class ContractController {
  static async getContracts(req, res) {
    try {
      const contracts = await ContractModel.getAllContracts();
      res.json(contracts);
    } catch (error) {
      console.error('Error fetching contracts:', error);
      res.status(500).json({ message: 'Error fetching contracts' });
    }
  }

  static async createContract(req, res) {
    try {
      const { name, premium_amount, start_date, end_date } = req.body;

      if (!name || !premium_amount || !start_date || !end_date) {
        return res.status(400).json({ message: 'Todos los campos son obligatorios' });
      }

      const newContract = await ContractModel.createContract({ name, premium_amount, start_date, end_date });
      res.status(201).json(newContract);
    } catch (error) {
      console.error('Error creating contract:', error);
      res.status(500).json({ message: 'Error creating contract' });
    }
  }
}
