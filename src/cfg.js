const configMap = {
  dev: {
    apiUrl: 'http://localhost:3000',
    uploadApiUrl: 'http://localhost:3009',
    shouldDelay: false,
    defaultInput: 'https://financialpanda.pl/',
  },
  prod: {
    apiUrl: 'https://apipromo.idontknowhatimdoing.com',
    uploadApiUrl: 'https://upload-api.idontknowhatimdoing.com',
    shouldDelay: true,
    defaultInput: '',
  },
  onlyfe: {
    apiUrl: 'http://localhost:3000',
    uploadApiUrl: 'https://upload-api.idontknowhatimdoing.com',
    shouldDelay: true,
    defaultInput: 'https://financialpanda.pl',
  }
};

// Wybór konfiguracji na podstawie zmiennej środowiskowej
const currentEnv = process.env.NODE_ENV || 'prod'; // domyślnie prod
const config = configMap[currentEnv];
if(!config) {
  throw new Error(`unk env: ${currentEnv}`);
}
export const apiUrl = config.apiUrl;
export const uploadApiUrl = config.uploadApiUrl;
export const shouldDelay = config.shouldDelay;
export const defaultInput = config.defaultInput;
