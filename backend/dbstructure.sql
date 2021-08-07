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
    userId INT NOT NULL references "user"(userId),
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
    userId INT NOT NULL references "user"(userId),
    recipeId INT NOT NULL references "recipe"(recipeId),
    content TEXT NOT NULL,
    points INT NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
