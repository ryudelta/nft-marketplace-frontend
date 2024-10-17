import * as BrowserFS from 'browserfs';

const initBrowserFS = () => {
    return new Promise<void>((resolve, reject) => {
      BrowserFS.configure({
          fs: 'LocalStorage',
          options: undefined
      }, (err) => {
        if (err) {
          reject(err);
        } else {
          console.log('BrowserFS is configured');
          resolve();
        }
      });
    });
};

const generateJson = async (path: string, data: any): Promise<boolean> => {
    console.log(path);
    
    try {
        const fs = BrowserFS.BFSRequire('fs');

        const jsonData = JSON.stringify(data, null, 2);

        const dir = path.substring(0, path.lastIndexOf('/'));
        await new Promise<void>((resolve, reject) => {
          fs.mkdir(dir, { recursive: true }, (err) => {
            if (err) {
              console.error('Error creating directory:', err);
              reject(false);
            } else {
              resolve();
            }
          });
        });

        await new Promise<void>((resolve, reject) => {
          fs.writeFile(path, jsonData, { encoding: 'utf8' }, (err) => {
            if (err) {
              console.error('Error writing JSON to file:', err);
              reject(false);
            } else {
              console.log('JSON data written successfully to', path);
              resolve();
            }
          });
        });
    
        return true;
      } catch (error) {
        console.error('Failed to generate JSON:', error);
        return false;
      }
};

export { generateJson, initBrowserFS };