const {
  contextBridge,
  ipcRenderer,
  remote
} = require('electron');

contextBridge.exposeInMainWorld(
  'electronAPI',
  {
    request: (chanel, data) => {
      let validChannels = ['app_version'];

      if (validChannels.includes(chanel)) {
        ipcRenderer.send(chanel, data);
      }
    },
    response: (channel, fn) => {
      let validChannels = ['app_version'];

      if (validChannels.includes(channel)) {
        ipcRenderer.removeAllListeners(channel);
        ipcRenderer.on(channel, (event, args) => {
          fn(args);
        })
      }
    }
  }
)
