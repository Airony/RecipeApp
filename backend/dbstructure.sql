CREATE TYPE difficulty AS ENUM ('Easy','Intermediate','Hard');
CREATE TYPE category AS ENUM ('Appeteizer','Main Course','Dessert','Drink');


CREATE TABLE "user"(
    user_id SERIAL PRIMARY KEY NOT NULL,
    full_name VARCHAR(50) NOT NULL,
    profile_picture TEXT,
    email VARCHAR(255) NOT NULL UNIQUE,
    password TEXT NOT NULL UNIQUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE "recipe"(
    recipe_id SERIAL PRIMARY KEY NOT NULL,
    user_id INT NOT NULL references "user"(user_id) ON DELETE CASCADE,
    title VARCHAR(25) NOT NULL,
    avg_rating SMALLINT DEFAULT 0,
    description VARCHAR(500) NOT NULL,
    recipe_difficulty difficulty NOT NULL,
    recipe_category category NOT NULL,
    prep_time SMALLINT NOT NULL,
    cook_time SMALLINT NOT NULL,
    ingredients VARCHAR(100)[] NOT NULL,
    steps VARCHAR(300)[] NOT NULL,
    notes TEXT NOT NULL,
    image TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE "comment"(
    comment_id SERIAL PRIMARY KEY NOT NULL,
    user_id INT NOT NULL references "user"(user_id) ON DELETE CASCADE,
    recipe_id INT NOT NULL references "recipe"(recipe_id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    points INT NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE "admin"(
    user_id INT NOT NULL references "user"(user_id) ON DELETE CASCADE
);

CREATE TABLE "author"(
    user_id INT NOT NULL references "user"(user_id) ON DELETE CASCADE
);


CREATE TABLE "session" (
  "sid" varchar NOT NULL COLLATE "default",
	"sess" json NOT NULL,
	"expire" timestamp(6) NOT NULL
)
WITH (OIDS=FALSE);

ALTER TABLE "session" ADD CONSTRAINT "session_pkey" PRIMARY KEY ("sid") NOT DEFERRABLE INITIALLY IMMEDIATE;

CREATE INDEX "IDX_session_expire" ON "session" ("expire");






