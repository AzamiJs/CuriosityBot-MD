const fetch = require('node-fetch');
const crypto = require('crypto');
const FormData = require('form-data');
const { fromBuffer } = require('file-type');
const axios = require('axios');
const fakeUserAgent = require('fake-useragent');
const cheerio = require('cheerio');
const chalk = require('chalk');
const uloadUrlRegexStr = /url: "([^"]+)"/;
const randomBytes = crypto.randomBytes(5).toString("hex");

const createFormData = (content, fieldName, ext) => {
    const {
        mime
    } = fromBuffer(content) || {};
    const formData = new FormData();
    formData.append(fieldName, content ,`${randomBytes}.${ext}`);
    return formData;
};

const handleErrorResponse = (error, spinner) => {
    spinner.fail(chalk.red("Failed"));
    console.error(chalk.red("Error:"), error.message);
    throw error;
};


module.exports = {
    telegraPh: async(buffer) => {
        try {
            const {
                ext
            } = await fromBuffer(buffer);
            const form = await createFormData(buffer, "file", ext);
            const res = await fetch("https://telegra.ph/upload", {
                method: "POST",
                body: form
            });
            const img = await res.json();
            if (img.error) throw img.error;
            return `https://telegra.ph${img[0].src}`;
        } catch (error) {
            handleErrorResponse(error);
        }
    },
    uploadPomf2: async (buffer) => {
        try {
            const {
                ext
            } = await fromBuffer(buffer) || {};
            const form = await createFormData(buffer, "files[]", ext);
            const res = await fetch("https://pomf2.lain.la/upload.php", {
                method: "POST",
                body: form
            });
            const json = await res.json();
            if (!json.success) throw json;
            
            return json;
        } catch (error) {
            handleErrorResponse(error);
        }
    },
    ucarecdn: async(content) => {
        try {
            const {
                ext
            } = await fromBuffer(content) || {};
            const formData = await createFormData(content, "file", ext);
            formData.append("UPLOADCARE_PUB_KEY", "demopublickey");
            formData.append("UPLOADCARE_STORE", "1");
            const response = await fetch("https://upload.uploadcare.com/base/", {
                method: "POST",
                body: formData,
                headers: {
                    "User-Agent": fakeUserAgent()
                },
            });
            const {
                file
            } = await response.json();
            
            return `https://ucarecdn.com/${file}/${randomBytes}.${ext}`;
        } catch (error) {
            handleErrorResponse(error);
        }
    },
    tmpfiles: async (content) => {
        try {
            const {
                ext,
                mime
            } = await fromBuffer(content) || {};
            const formData = await createFormData(content, "file", ext);
            const response = await fetch("https../src/tmpfiles.org/api/v1/upload", {
                method: "POST",
                body: formData,
                headers: {
                    "User-Agent": fakeUserAgent()
                },
            });
    
            const result = await response.json();
          const match = /https?:\../src/tmpfiles.org\/(.*)/.exec(result.data.url);
    return `https../src/tmpfiles.org/dl/${match[1]}`;
        } catch (error) {
            handleErrorResponse(error);
        }
    },
    Uguu: async (content) => {
        try {
            const {
                ext,
                mime
            } = await fromBuffer(content) || {};
            const formData = createFormData(content, "files[]", ext);
            const response = await fetch("https://uguu.se/upload.php", {
                method: "POST",
                body: formData,
                headers: {
                    "User-Agent": fakeUserAgent()
                },
            });
            const files = await response.json();
            return files.files[0].url;
        } catch (error) {
            handleErrorResponse(error);
        }
    },  
     gofile: async (content) => {
        try {
            const {
                ext,
                mime
            } = await fromBuffer(content) || {};
            const formData = createFormData(content, "file", ext);
            const getServer = await (await fetch("https://api.gofile.io/getServer", {
                method: "GET",
            })).json();
            const response = await fetch(`https://${getServer.data.server}.gofile.io/uploadFile`, {
                method: "POST",
                body: formData,
                headers: {
                    "User-Agent": fakeUserAgent()
                },
            });
            const result = await response.json();
            return `https://${getServer.data.server}.gofile.io/download/web/${result.data.fileId}/thumb_${result.data.fileName}`
        } catch (error) {
            handleErrorResponse(error);
        }
    },
oxo: async (content) => {
        try {
            const {
                ext,
                mime
            } = await fromBuffer(content) || {};
            const formData = createFormData(content, "file", ext);
            const response = await fetch("http://0x0.st", {
                method: "POST",
                body: formData,
                headers: {
                    "User-Agent": fakeUserAgent()
                },
            });
           
            return await response.text();
        } catch (error) {
            handleErrorResponse(error);
        }
    },
    catbox: async (content) => {     
      try {
            const {
                ext,
                mime
            } = await fromBuffer(content) || {};
            const formData = createFormData(content, "fileToUpload", ext);
            formData.append("reqtype", "fileupload");
            const response = await fetch("https://catbox.moe/user/api.php", {
                method: "POST",
                body: formData,
                headers: {
                    "User-Agent": fakeUserAgent()
                },
            });
            return await response.text();
        } catch (error) {
            handleErrorResponse(error);
        }
    }
}

let fs = require('fs');
let file = require.resolve(__filename);
fs.watchFile(file, () => {
  fs.unwatchFile(file);
  delete require.cache[file];
  require(file);
});