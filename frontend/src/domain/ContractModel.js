// src/domain/ContractModel.js
export class Contract {
    constructor({ id = null, name, premiumAmount, startDate, endDate }) {
        this.id = id;
        this.name = name;
        this.premiumAmount = premiumAmount;
        this.startDate = startDate;
        this.endDate = endDate;
    }
}
