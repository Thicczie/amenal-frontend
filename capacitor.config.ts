import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'amenal-frontend',
  webDir: 'dist',
  server: {
   url : "http://192.168.1.3:8100",
  }
};

export default config;
