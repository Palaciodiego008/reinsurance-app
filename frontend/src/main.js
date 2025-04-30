import { ContractUI } from './ui/ContractUI.js';

const ui = new ContractUI();

async function init() {
    try {
        ui.showLoading();
        const contracts = await contractService.fetchContracts();
        ui.displayContracts(contracts);
    } catch (error) {
        console.error('Error al cargar contratos:', error);
        alert('Error al cargar contratos');
    } finally {
        ui.hideLoading();
    }
}

init();