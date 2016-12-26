DROP TABLE IF EXISTS Comments CASCADE;

-- SCHEMA
CREATE TABLE Comments (

    -- General
    comment_id SERIAL PRIMARY KEY,
    created TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),

    -- Attributes
    document_id CHARACTER VARYING(255) NOT NULL REFERENCES Documents(document_id) ON UPDATE CASCADE ON DELETE CASCADE,
    question SMALLINT NOT NULL CHECK (question >= 0),
    user_id INTEGER NOT NULL REFERENCES Users(user_id) ON UPDATE CASCADE ON DELETE SET NULL,
    comment CHARACTER VARYING(255) NOT NULL

);