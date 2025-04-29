CREATE TABLE reinsurance_contracts_test_diegopalacio (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  premium_amount DECIMAL(10,2) NOT NULL
);

CREATE TABLE claims_test_diegopalacio (
  id INT AUTO_INCREMENT PRIMARY KEY,
  contract_id INT,
  claim_amount DECIMAL(10,2) NOT NULL,
  claim_date DATE NOT NULL,
  FOREIGN KEY (contract_id) REFERENCES reinsurance_contracts_test_diegopalacio(id)
);
