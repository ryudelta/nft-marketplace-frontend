interface ImportMetaEnv {
    VITE_PINATA_BASE_URL: string;
    VITE_PINATA_API_KEY: string;
    VITE_PINATA_SECRET_KEY: string;
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }
  