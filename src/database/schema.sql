DROP TABLE users CASCADE;
-- cascade = delete all dependents as well (foreign keys, indexes)

CREATE TABLE users (
  id BIGSERIAL NOT NULL PRIMARY KEY,
  -- product_id bigint NOT NULL,
  kroger_id varchar(100),
  username varchar(100),
  tenant varchar(100),
  email varchar(100),
  -- instant timestamp NOT NULL,
  allergies json DEFAULT '{}',
  preferences json DEFAULT '{}'
);

CREATE INDEX idx_kroger_id ON users(kroger_id);

-- INSERT INTO users (
--   kroger_id,
--   username,
--   tenant,
--   email,
--   allergies,
--   preferences
-- )

-- VALUES (
--   'abc123',
--   'buttercup',
--   'whatsatenant??',
--   'hello@asdf.com',
--   '{}',
--   '{}'
-- )

-- ON CONFLICT (kroger_id) DO UPDATE SET (
--   kroger_id,
--   username,
--   tenant,
--   email,
--   allergies,
--   preferences
-- ) = (
--   'abc123',
--   'buttercup',
--   'whatsatenant???',
--   'hello@asdf.com',
--   '{}',
--   '{}'
-- )

-- WHERE users.kroger_id = 'abc123';


DROP TABLE recipes CASCADE;

CREATE TABLE recipes (
  id BIGSERIAL NOT NULL PRIMARY KEY,
  "name" varchar(100) NOT NULL,
  recipe_id bigint NOT NULL,
  ingredients jsonb[],
  instructions jsonb[],
  restrictions json,
  photos json,
  calorie_count int
);

-- Userrecipes contains:
--   - all recipes returned by edamam API while user is logged in
--   - edits to base recipes
--      edits behavior:
--         1. add new recipe ID to recipes table
--         2. update row in userrecipes table
DROP TABLE userrecipes CASCADE;

CREATE TABLE userrecipes (
  id BIGSERIAL NOT NULL PRIMARY KEY,
  user_id bigint NOT NULL,
  recipe_id bigint NOT NULL,
  favorite boolean,

  FOREIGN KEY (user_id) REFERENCES users,
  FOREIGN KEY (recipe_id) REFERENCES recipes
);