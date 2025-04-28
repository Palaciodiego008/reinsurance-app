// src/api/ContractApi.js
export class ContractApi {
    constructor(baseUrl) {
        this.baseUrl = baseUrl;
    }

    async getContracts() {
        const response = await fetch(`${this.baseUrl}/contracts`);
        if (!response.ok) throw new Error('Error al obtener contratos');
        return await response.json();
    }

    async createContract(contract) {
        const response = await fetch(`${this.baseUrl}/contracts`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(contract)
        });
        if (!response.ok) throw new Error('Error al crear contrato');
        return await response.json();
    }
}
