const {app, BrowserWindow, webFrame, Menu, dialog} = require('electron')
const path = require('path')
const url = require('url')
const shell = require('electron').shell

let is_shown = true;

app.win = null;

app.on('ready', () => 
{
  app.win = new BrowserWindow({
    width: 405, 
    height: 420, 
    minWidth: 405, 
    minHeight: 420,
    webPreferences: {zoomFactor: 1.0}, 
    backgroundColor:"#000", 
    frame:false, 
    autoHideMenuBar: true, 
    icon: __dirname + '/icon.ico'
  })
    
  app.win.loadURL(`file://${__dirname}/sources/index.html`);
  // app.win.toggleDevTools();
  
  app.win.on('closed', () => {
    win = null
    app.quit()
  })

  app.win.on('hide',function() {
    is_shown = false;
  })

  app.win.on('show',function() {
    is_shown = true;
  })

  app.on('window-all-closed', () => 
  {
    app.quit()
  })

  app.on('activate', () => {
    if (app.win === null) {
      createWindow()
    }
    else{
      app.win.show();
    }
  })
})



app.inspect = function()
{
  app.win.toggleDevTools();
}

app.toggle_fullscreen = function()
{
  app.win.setFullScreen(app.win.isFullScreen() ? false : true);
}

app.toggle_visible = function()
{
  if(is_shown){ app.win.hide(); } else{ app.win.show(); }
}

app.inject_menu = function(m)
{
  if(process.platform == "win32"){ return; }

  Menu.setApplicationMenu(Menu.buildFromTemplate(m));
}