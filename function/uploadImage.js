const fetch = require('node-fetch');
const FormData = require('form-data');
const { fromBuffer } = require('file-type');

/**
 * Upload image to Telegra.ph
 * @param {Buffer} buffer Image buffer
 * @param {String} [filename] File name
 */
module.exports = async (buffer, filename = 'image') => {
  const { ext } = await fromBuffer(buffer);
  let form = new FormData();
  form.append('file', buffer, { filename: filename + '.' + ext });
  let res = await fetch('https://telegra.ph/upload', {
    method: 'POST',
    body: form
  });
  let img = await res.json();
  if (img.error) throw img.error;
  return 'https://telegra.ph' + img[0].src;
};