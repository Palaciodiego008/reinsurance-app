import { ContractApi } from '../api/ContractApi.js';
import { ContractService } from '../application/ContractService.js';

const baseUrl = 'http://localhost:3000/api';
const contractApi = new ContractApi(baseUrl);
const contractService = new ContractService(contractApi);

export class ContractUI {
    constructor() {
        this.contractListEl = document.getElementById('contract-list');
        this.contractFormEl = document.getElementById('contract-form');
        this.searchInputEl = document.getElementById('search');
        this.loadingSpinnerEl = document.getElementById('loading-spinner');
        this.noContractsEl = document.getElementById('no-contracts');
        this.modalEl = document.getElementById('contract-modal');
        this.createContractBtn = document.getElementById('create-contract-btn');
        this.closeModalBtn = document.getElementById('close-modal');

        this.handleAddContract = this.handleAddContract.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.deleteContract = this.deleteContract.bind(this);

        // Listeners
        this.contractFormEl.addEventListener('submit', (e) => this.handleAddContract(e));
        this.searchInputEl.addEventListener('input', (e) => this.handleSearch(e));
        this.createContractBtn.addEventListener('click', () => this.openModal());
        this.closeModalBtn.addEventListener('click', () => this.closeModal());
    }

    openModal() {
        this.modalEl.classList.add('show');
    }

    closeModal() {
        this.modalEl.classList.remove('show');
    }

    showLoading() {
        this.loadingSpinnerEl.classList.add('show');
    }

    hideLoading() {
        this.loadingSpinnerEl.classList.remove('show');
    }

    clearContracts() {
        this.contractListEl.innerHTML = '';
    }

    displayContracts(contracts) {
        this.clearContracts();
        if (contracts.length === 0) {
            this.noContractsEl.style.display = 'block';
        } else {
            this.noContractsEl.style.display = 'none';
            contracts.forEach(contract => this.addContractToList(contract));
        }
    }

    addContractToList(contract) {
        const formatDate = (dateString) => {
            const options = { year: 'numeric', month: 'long', day: 'numeric' };
            return new Date(dateString).toLocaleDateString('es-ES', options);
        };

        const item = document.createElement('div');
        item.className = 'contract-item';
        item.dataset.id = contract.id;
        item.innerHTML = `
            <div class="contract-details">
                <div class="contract-name">${contract.name}</div>
                <div class="contract-premium">$${contract.premiumAmount}</div>
                <div class="contract-dates">${formatDate(contract.startDate)} - ${formatDate(contract.endDate)}</div>
            </div>
            <div class="contract-actions">
                <button class="delete-contract-btn" data-id="${contract.id}">Eliminar</button>
            </div>
        `;

        const deleteBtn = item.querySelector('.delete-contract-btn');
        deleteBtn.onclick = () => this.deleteContract(contract.id, item);

        this.contractListEl.appendChild(item);
    }

    async handleAddContract(event) {
        event.preventDefault();

        const name = document.getElementById('contract-name').value.trim();
        const premiumAmount = parseFloat(document.getElementById('premium-amount').value);
        const startDate = document.getElementById('start-date').value;
        const endDate = document.getElementById('end-date').value;

        if (name && !isNaN(premiumAmount) && startDate && endDate) {
            try {
                this.showLoading();
                await contractService.addContract({
                    name,
                    premiumAmount,
                    startDate,
                    endDate
                });
                const contracts = await contractService.fetchContracts();
                this.displayContracts(contracts);
                this.contractFormEl.reset();
                this.closeModal();
            } catch (error) {
                console.error('Error al agregar contrato:', error);
                alert('Error al agregar contrato');
            } finally {
                this.hideLoading();
            }
        }
    }

    handleSearch(event) {
        const query = event.target.value.toLowerCase();
        const contractItems = document.querySelectorAll('.contract-item');

        contractItems.forEach(item => {
            const name = item.querySelector('.contract-name').textContent.toLowerCase();
            item.style.display = name.includes(query) ? 'flex' : 'none';
        });
    }

    async deleteContract(id, contractElement) {
        const confirmation = confirm(`¿Estás seguro de que deseas eliminar el contrato?`);
        if (confirmation) {
            try {
                await contractService.deleteContract(id);
                console.log(`Contrato con ID ${id} eliminado`);
                contractElement.remove();
                alert('Contrato eliminado con éxito');
            } catch (error) {
                console.error('Error al eliminar el contrato:', error);
                alert('Error al eliminar el contrato');
            } finally {
                this.hideLoading();
            }
        }
    }
}