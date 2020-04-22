const {
  contextBridge,
  ipcRenderer,
  remote
} = require('electron');

contextBridge.exposeInMainWorld(
  'electronAPI',
  {
    request: (chanel, data) => {
      let validChannels = ['app_info', ''];

      if (validChannels.includes(chanel)) {
        ipcRenderer.send(chanel, data);
      }
    },
    response: (channel, fn) => {
      let validChannels = ['app_info', 'update_message'];

      if (validChannels.includes(channel)) {
        console.log(channel);
        //ipcRenderer.removeAllListeners(channel);
        ipcRenderer.on(channel, (event, args) => {
          console.log(args);
          fn(args);
        })
      }
    }
  }
)
