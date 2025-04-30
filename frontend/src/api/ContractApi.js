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
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: contract.name,
                premium_amount: contract.premiumAmount,
                start_date: contract.startDate,
                end_date: contract.endDate
            })
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error('Server response:', errorText);
            throw new Error('Error al crear contrato');
        }

        return await response.json();
    }

    async deleteContract(id) {
        const response = await fetch(`${this.baseUrl}/contracts/${id}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' }
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error('Server response:', errorText);
            throw new Error('Error al eliminar contrato');
        }

        return await response.json();
    }
}