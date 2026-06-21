-- JForm - Schema de base de datos
-- Ejecutar en el SQL Editor de Neon

CREATE TABLE IF NOT EXISTS jform_tokens (
    token          TEXT PRIMARY KEY,
    email          TEXT NOT NULL UNIQUE,
    github         TEXT,
    pgp_public_key TEXT,
    created_at     TIMESTAMPTZ DEFAULT NOW()
);
