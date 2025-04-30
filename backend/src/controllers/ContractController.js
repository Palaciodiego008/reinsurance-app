import { ContractModel } from '../models/ContractModel.js';

export class ContractController {
  static async getContracts(req, res) {
    try {
      const contracts = await ContractModel.getAllContracts();
      console.log('Contracts fetched:', contracts);
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
        return res.status(400).json({ message: 'All fields are required' });
      }

      const newContract = await ContractModel.createContract({
        name,
        premium_amount,
        start_date,
        end_date,
      });

      res.status(201).json(newContract);
    } catch (error) {
      console.error('Error creating contract:', error);
      res.status(500).json({ message: 'Error creating contract' });
    }
  }

  static async deleteContract(req, res) {
    try {
      const {id} = req.params;
      if (!id) {
        return res.status(400).json({ message: 'Contract ID is required' });
      }

      const deletedContract = await ContractModel.deleteContract(id);
      if (!deletedContract) {
        return res.status(404).json({ message: 'Contract not found' });
      }
      res.status(200).json({ message: 'Contract deleted successfully' });

    } catch (error) {
      console.error('Error deleting contract:', error);
      res.status(500).json({ message: 'Error deleting contract' });
      
    }
  }
}
