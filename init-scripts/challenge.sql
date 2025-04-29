--- first query:

SELECT 
    rc.id AS contract_id,
    rc.name AS contract_name,
    SUM(c.claim_amount) AS total_claims
FROM 
    reinsurance_contracts rc
LEFT JOIN 
    claims c ON rc.id = c.contract_id
GROUP BY 
    rc.id, rc.name
ORDER BY 
    rc.id;


--- optimized query:
SELECT 
    rc.id AS contract_id,
    rc.name AS contract_name,
    c.total_claims
FROM 
    reinsurance_contracts rc
LEFT JOIN (
    SELECT 
        contract_id,
        SUM(claim_amount) AS total_claims
    FROM 
        claims
    GROUP BY 
        contract_id
) c ON rc.id = c.contract_id
ORDER BY 
    rc.id;
-- 
Para optimizar la consulta, aplicaría una subconsulta previa que agrupe (SUM) las reclamaciones por contract_id antes de hacer el JOIN con reinsurance_contracts. Esto reduce la cantidad de datos manejados en el JOIN y mejora significativamente el rendimiento.

Además, aseguraría que contract_id tenga un índice para acelerar el acceso, pero la optimización principal es reestructurar la consulta para trabajar con menos datos en memoria.
--