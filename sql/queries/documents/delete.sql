DELETE FROM Documents
WHERE
    document_id=$1::TEXT;
