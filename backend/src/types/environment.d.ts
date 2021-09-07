declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PG_USER: string;
      PG_PASSWORD: string;
      PG_DATABASE: string;
      PG_HOST: string;
      PG_PORT: number;
      NODE_ENV: "production" | "development" | "testing";
      PORT: string;
      SESSION_LIFETIME: string;
      SESSION_SECRET: string;
      UPLOAD_DEST: string;
    }
  }
}

export {};
