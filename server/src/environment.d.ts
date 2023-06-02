export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT: string;
      SESSION_SECRET: string;
      MONGODB_URI: string;
      MONGODB_URI_LOCAL: string;
    }
  }
}