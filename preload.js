const { contextBridge, ipcRenderer, shell, app } = require('electron');

ipcRenderer.on('console', (event, data) => {
    console[data.method].apply(console, data.args)
});

contextBridge.exposeInMainWorld('api', {
    initipc: ipcMessageEvent => {
        ipcRenderer.on('message', ipcMessageEvent);
    },
    openExternal: url => {
        ipcRenderer.invoke('openExternal', {"url": url});
    },
    quit: () => ipcRenderer.send("quit"),
    showPicker: current_path => {
        return ipcRenderer.invoke('showPicker', {"current_path": current_path});
    },
    showPickerForPlugin: () => {
        return ipcRenderer.invoke('showPickerForPlugin');
    },
    saveconfig: saveconfig => {
        ipcRenderer.send("saveconfig", saveconfig);
    },
    generateCrypto: () => {
        return ipcRenderer.invoke('generateCrypto');
    }
})