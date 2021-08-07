CREATE TABLE "user"(
    userId SERIAL PRIMARY KEY NOT NULL,
    full_name VARCHAR(50) NOT NULL,
    profile_picture TEXT,
    email VARCHAR(255) NOT NULL UNIQUE,
    password TEXT NOT NULL UNIQUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE "recipe"(
    recipeId SERIAL PRIMARY KEY NOT NULL,
    userId INT NOT NULL references "user"(userId) ON DELETE CASCADE,
    title VARCHAR(25) NOT NULL,
    avg_rating SMALLINT NOT NULL,
    description VARCHAR(500) NOT NULL,
    difficulty VARCHAR(30) NOT NULL,
    category VARCHAR(30) NOT NULL,
    ingredients VARCHAR(100)[] NOT NULL,
    steps VARCHAR(300)[] NOT NULL,
    notes TEXT NOT NULL,
    image TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE "comment"(
    commentId SERIAL PRIMARY KEY NOT NULL,
    userId INT NOT NULL references "user"(userId) ON DELETE CASCADE,
    recipeId INT NOT NULL references "recipe"(recipeId) ON DELETE CASCADE,
    content TEXT NOT NULL,
    points INT NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE "admin"(
    userId INT NOT NULL references "user"(userId) ON DELETE CASCADE
);

CREATE TABLE "author"(
    userId INT NOT NULL references "user"(userId) ON DELETE CASCADE
);


CREATE TABLE "session" (
  "sid" varchar NOT NULL COLLATE "default",
	"sess" json NOT NULL,
	"expire" timestamp(6) NOT NULL
)
WITH (OIDS=FALSE);

ALTER TABLE "session" ADD CONSTRAINT "session_pkey" PRIMARY KEY ("sid") NOT DEFERRABLE INITIALLY IMMEDIATE;

CREATE INDEX "IDX_session_expire" ON "session" ("expire");






