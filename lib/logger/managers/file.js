import RNFS from 'react-native-fs';
import Manager from '../manager';

const LOG_API_URL = 'https://requestb.in/1lb23ut1'

const upload = async (path) => {
  try {
    const formData = new FormData();
    formData.append('file', {
      uri: path,
      name: 'rn.log',
      type: 'text/plain'
    });

    const response = await fetch(`${LOG_API_URL}`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'multipart/form-data;',
      },
      body: formData,
    });

    return response
  } catch(err) {
    return null
  }
}

class FileManager extends Manager {
  get filename() {
    return 'rn.log'
  }

  get path() {
    return `${RNFS.DocumentDirectoryPath}/${this.filename}`
  }

  write(level, message) {
    return RNFS.write(this.path, `${message}\r\n`, -1, 'utf8')
  }

  async upload() {
    const response = await upload(this.path)
    return response
  }

  remove() {
    return RNFS.unlink(this.path)
  }
}

export default FileManager
