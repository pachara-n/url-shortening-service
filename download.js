const https = require('https');
const fs = require('fs');

const url = 'https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ7Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpaCiVodG1sXzNmNGU0NTQzNDhhNzRmZmJhMjY3ZTFjY2NjZGM2Y2FjEgsSBxDV-IKJmwUYAZIBIwoKcHJvamVjdF9pZBIVQhM4NTM0ODQwMjU4MTAyNjUwMjk1&filename=&opi=89354086';

https.get(url, (res) => {
  let body = '';
  res.on('data', (chunk) => body += chunk);
  res.on('end', () => {
    fs.writeFileSync('stitch_ui.html', body);
    console.log('done downloading');
  });
}).on('error', (e) => {
  console.error(e);
});
