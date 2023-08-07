/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string;
  readonly VITE_RPC_URL?: string;
  readonly VITE_CHAIN_ID?: string;
  readonly VITE_RPC_MODE?: string;
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
