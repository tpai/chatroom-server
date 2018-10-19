const path = require('path');
const uniqid = require('uniqid');

const routes = {
  setHeaders: (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
  },
  handleFileUpload: async (req, res) => {
    if (!req.files) {
      return res.status(400).send('No files were uploaded.');
    }
    const files = [].concat(req.files['files[]']);
    const uploads = Array.prototype.map.call(files, (file) => {
      const ext = file.name.split('.').slice(-1);
      const filename = `${uniqid()}.${ext}`;
      return { filename, promise: file.mv(path.resolve(__dirname, '../uploaded', filename)) };
    });
    Promise.all(uploads.map(({ promise }) => promise)).then((errs) => {
      res.setHeader('Content-Type', 'application/json');

      if (errs.some(err => err)) {
        return res.status(500).send(JSON.stringify(errs));
      }
      res.send(
        JSON.stringify(
          uploads.map(({ filename }) => `http://localhost:3333/uploaded/${filename}`)
        )
      );
    });
  },
};

module.exports = routes;
