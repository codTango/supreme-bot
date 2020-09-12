import { ipcRenderer } from 'electron';

const db = {
  find: (file, query) => { return ipcRenderer.sendSync('find', file, query); },
  insert: (file, data) => { return ipcRenderer.sendSync('insert', file, data); },
  update: (file, query, update, options = {}) => { return ipcRenderer.sendSync('update', file, query, update, options); },
  count: (file, query) => { return ipcRenderer.sendSync('count', file, query); },
  remove: (file, query, options = {}) => { return ipcRenderer.sendSync('remove', file, query, options); },
}

export default db;
