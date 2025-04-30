import express from 'express';
import { ContractController } from '../controllers/ContractController.js';

const router = express.Router();

// get all contracts
router.get('/contracts', ContractController.getContracts);

// create a new contract
router.post('/contracts', ContractController.createContract);

router.delete('/contracts/:id', ContractController.deleteContract);

export default router;
