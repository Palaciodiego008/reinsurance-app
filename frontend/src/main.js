import { ContractApi } from './api/ContractApi.js';
import { ContractService } from './application/ContractService.js';
import { ContractUI } from './ui/ContractUI.js';

const contractApi = new ContractApi('http://localhost:3000/api');
const contractService = new ContractService(contractApi);

const ui = new ContractUI({
    onAddContract: async (contractData) => {
        try {
            ui.showLoading();
            await contractService.addContract(contractData);
            const contracts = await contractService.fetchContracts();
            ui.displayContracts(contracts);
        } catch (error) {
            console.error(error);
            alert('Error al agregar contrato');
        } finally {
            ui.hideLoading();
        }
    }
});

async function init() {
    try {
        ui.showLoading();
        const contracts = await contractService.fetchContracts();
        ui.displayContracts(contracts);
    } catch (error) {
        console.error(error);
        alert('Error al cargar contratos');
    } finally {
        ui.hideLoading();
    }
}

init();
