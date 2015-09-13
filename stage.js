(function() {
  var gui = require('nw.gui');
  var menu = new gui.Menu;
  var wv = document.querySelector('webview');

  menu.append(new gui.MenuItem({
    label: "Cut",
    click: function() {
      wv.contentWindow.document.execCommand("cut");
    }
  }));
  menu.append(new gui.MenuItem({
    label: "Copy",
    click: function() {
      wv.contentWindow.document.execCommand("copy");
    }
  }));
  menu.append(new gui.MenuItem({
    label: "Paste",
    click: function() {
      wv.contentWindow.document.execCommand("paste");
    }
  }));

  wv.addEventListener("loadcommit", function(e){
    wv.insertCSS({file: "custom.css"});
  });

  var init = function() {
    if (wv) {
      wv.addEventListener('newwindow', function(e) {
        gui.Shell.openExternal(e.targetUrl);
      });

      wv.addEventListener("contextmenu", function(e) {
        e.preventDefault();
        menu.popup(e.x, e.y);
      });
    } else {
      setTimeout(init, 100);
    }
  };

  init();
}).apply(this);
