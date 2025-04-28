import { Contract } from '../domain/ContractModel.js'; 

export class ContractService {
    constructor(contractApi) {
        this.contractApi = contractApi;
    }

    async fetchContracts() {
        const contractsData = await this.contractApi.getContracts();
        return contractsData.map(data => new Contract({
            id: data.id,
            name: data.name,
            premiumAmount: data.premium_amount,
            startDate: data.start_date,
            endDate: data.end_date
        }));
    }

    async addContract(contractData) {
        const newContract = new Contract(contractData);
        return await this.contractApi.createContract(newContract);
    }
}
