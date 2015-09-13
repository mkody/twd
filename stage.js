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

  var handleClick = function(e) {
    var checkForLink = function(el) {
      var openLink = function(url) {
        gui.Shell.openExternal(url);
        e.preventDefault();
      };

      if (el.nodeName.toLowerCase() === 'a') {
        var href = el.getAttribute('href');
        if (href !== null) {
          var middleButton = e.which === 2;
          if (middleButton ||
              (el.target === '_blank' &&
               el.rel !== 'user' &&
               el.rel !== 'mediaPreview')) {
            openLink(href);
          }

          console.log(href, middleButton, el.target, el.rel);
        }
      } else if ((p = el.parentElement) !== null) {
        checkForLink(p);
      }
    };

    checkForLink(e.target);
  };

  var init = function() {
    if (wv) {
      wv.addEventListener('click', handleClick, false);
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
