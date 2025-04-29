export class ContractUI {
    constructor(options) {
        this.onAddContract = options.onAddContract;
        this.contractListEl = document.getElementById('contract-list');
        this.contractFormEl = document.getElementById('contract-form');
        this.searchInputEl = document.getElementById('search');
        this.loadingSpinnerEl = document.getElementById('loading-spinner');
        this.noContractsEl = document.getElementById('no-contracts');
        this.modalEl = document.getElementById('contract-modal');
        this.createContractBtn = document.getElementById('create-contract-btn');
        this.closeModalBtn = document.getElementById('close-modal');

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
            const options = { year: 'numeric', month: 'long', day: 'numeric' }; // Ejemplo: 23 de abril de 2025
            return new Date(dateString).toLocaleDateString('es-ES', options);
        };
    
        const item = document.createElement('div');
        item.className = 'contract-item';
        item.innerHTML = `
            <div class="contract-details">
                <div class="contract-name">${contract.name}</div>
                <div class="contract-premium">$${contract.premiumAmount}</div>
                <div class="contract-dates">${formatDate(contract.startDate)} - ${formatDate(contract.endDate)}</div>
            </div>
        `;
        this.contractListEl.appendChild(item);
    }
    async handleAddContract(event) {
        event.preventDefault();
        const name = document.getElementById('contract-name').value.trim();
        const premiumAmount = parseFloat(document.getElementById('premium-amount').value);
        const startDate = document.getElementById('start-date').value;
        const endDate = document.getElementById('end-date').value;

        if (name && !isNaN(premiumAmount) && startDate && endDate) {
            await this.onAddContract({
                name,
                premiumAmount,
                startDate,
                endDate
            });
            this.contractFormEl.reset();
            this.closeModal();
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
}