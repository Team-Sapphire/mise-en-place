DROP TABLE users CASCADE;
-- cascade = delete all dependents as well (foreign keys, indexes)

CREATE TABLE users (
  id BIGSERIAL NOT NULL PRIMARY KEY,
  -- product_id bigint NOT NULL,
  username varchar(100) NOT NULL,
  first_name varchar(100) NOT NULL,
  last_name varchar(100) NOT NULL,
  email varchar(100) NOT NULL,
  -- instant timestamp NOT NULL,
  allergies json NOT NULL,
  preferences json NOT NULL
);


-- INSERT INTO users (
--   username,
--   first_name,
--   last_name,
--   email,
--   allergies,
--   preferences
-- )

-- VALUES (
--   'buttercup',
--   'greg',
--   'thomas',
--   'hello@asdf.com',
--   '{}',
--   '{}'
-- );


DROP TABLE recipes CASCADE;

CREATE TABLE recipes (
  id BIGSERIAL NOT NULL PRIMARY KEY,
  "name" bigint NOT NULL,
  recipe_id bigint NOT NULL,
  ingredients jsonb[],
  instructions jsonb[],
  restrictions json,
  photos json,
  calorie_count int
);


DROP TABLE userrecipes CASCADE;

CREATE TABLE userrecipes (
  id BIGSERIAL NOT NULL PRIMARY KEY,
  user_id bigint NOT NULL,
  recipe_id bigint NOT NULL,
  favorite boolean,

  FOREIGN KEY (user_id) REFERENCES users,
  FOREIGN KEY (recipe_id) REFERENCES recipes
);
