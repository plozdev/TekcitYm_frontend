import fs from 'fs';
import https from 'https';

const screensData = JSON.parse(fs.readFileSync('screens.json', 'utf8').replace(/^\uFEFF/, ''));

const downloadFile = (url, path) => {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      const fileStream = fs.createWriteStream(path);
      res.pipe(fileStream);
      fileStream.on('finish', () => {
        fileStream.close();
        resolve();
      });
    }).on('error', (err) => {
      reject(err);
    });
  });
};

const main = async () => {
  if (!fs.existsSync('html_screens')) {
    fs.mkdirSync('html_screens');
  }
  for (const screen of screensData.screens) {
    if (screen.htmlCode && screen.htmlCode.downloadUrl) {
      const title = screen.title.replace(/[^a-zA-Z0-9]/g, '_');
      const id = screen.name.split('/').pop();
      const path = `html_screens/${title}_${id}.html`;
      console.log(`Downloading ${title}...`);
      await downloadFile(screen.htmlCode.downloadUrl, path);
    }
  }
  console.log('Done downloading HTML screens.');
};

main();
