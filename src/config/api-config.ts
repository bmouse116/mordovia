export const getApiBaseUrl = (): string => {
  if (!window.MY_APP_CONFIG || !window.MY_APP_CONFIG.API_BASE_URL) {
    throw new Error('API_BASE_URL is not defined in the configuration');
  }
  return window.MY_APP_CONFIG.API_BASE_URL;
};

export const getTerminalId = (): number => {
  if (!window.MY_APP_CONFIG || typeof window.MY_APP_CONFIG.TERMINAL_ID !== 'number') {
    throw new Error('TERMINAL_ID is not defined or invalid in the configuration');
  }
  return window.MY_APP_CONFIG.TERMINAL_ID;
};