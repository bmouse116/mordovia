/// <reference types="vite/client" />

interface AppConfig {
  API_BASE_URL: string;
  TERMINAL_ID: number;
}

interface Window {
  MY_APP_CONFIG?: AppConfig;
}