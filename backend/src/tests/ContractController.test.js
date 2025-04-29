// ContractController.test.js
import { jest } from '@jest/globals';

jest.unstable_mockModule('../models/ContractModel.js', () => ({
    ContractModel: {
        getAllContracts: jest.fn(),
        createContract: jest.fn(),
    }
}));

// Importaciones dinámicas para que el mock funcione
const { ContractController } = await import('../controllers/ContractController.js');
const { ContractModel } = await import('../models/ContractModel.js');

describe('ContractController', () => {
    let req, res;
    let consoleSpy;

    beforeEach(() => {
        req = { body: {} };
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
        // Setup the console spy before each test
        consoleSpy = jest.spyOn(console, 'error').mockImplementation();
        jest.spyOn(console, 'log').mockImplementation();
    });

    afterEach(() => {
        // Restore the console spies after each test
        consoleSpy.mockRestore();
        jest.restoreAllMocks();
    });

    describe('getContracts', () => {
        it('should be able to fetch all contracts', async () => {
            const fakeContracts = [{ id: 1, name: 'Contrato A' }];
            ContractModel.getAllContracts.mockResolvedValue(fakeContracts);

            await ContractController.getContracts(req, res);

            expect(res.json).toHaveBeenCalledWith(fakeContracts);
        });

        it('should return 500 if there is an error fetching contracts', async () => {
            const error = new Error('DB Error');
            ContractModel.getAllContracts.mockRejectedValue(error);

            await ContractController.getContracts(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ message: 'Error fetching contracts' });
            expect(consoleSpy).toHaveBeenCalledWith('Error fetching contracts:', error);
        });
    });

    describe('createContract', () => {
        it('should create a new contract', async () => {
            req.body = {
                name: 'Nuevo Contrato',
                premium_amount: 1000,
                start_date: '2025-01-01',
                end_date: '2025-12-31',
            };

            const newContract = { id: 2, ...req.body };
            ContractModel.createContract.mockResolvedValue(newContract);

            await ContractController.createContract(req, res);

            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith(newContract);
        });

        it('should return 400 if required fields are missing', async () => {
            req.body = { name: '', premium_amount: null };

            await ContractController.createContract(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ message: 'All fields are required' });
        });

        it('should return 500 if there is an error creating a contract', async () => {
            req.body = {
                name: 'Contrato con error',
                premium_amount: 1500,
                start_date: '2025-01-01',
                end_date: '2025-12-31',
            };

            const error = new Error('Error de BD');
            ContractModel.createContract.mockRejectedValue(error);

            await ContractController.createContract(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ message: 'Error creating contract' });
            expect(consoleSpy).toHaveBeenCalledWith('Error creating contract:', error);
        });
    });
});