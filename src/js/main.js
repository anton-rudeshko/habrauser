(function ($, Habrauser) {
  'use strict';

  var userCache = [],
    karmaScriptInjected = false;

  function optionDisabled(option) {
    return Habrauser[option] === false;
  }

  function loadInfo(userLink, callback) {
    $.ajax({
      url: userLink,
      success: function (html) {
        var page = $(html),
          cache = page.find('.user_header'), // todo: regexp?
          karmaSrc = page.filter('script[src$="/users/all.js"]').attr('src');

        callback(cache, karmaSrc);
      }
    });
  }

  function displayPopup(popup, x, y) {
    var pluginData = popup.data('habrauser');
    if (!pluginData) {
      pluginData = {
        onTimeout: function () {
          popup.fadeOut(200, function () {
            popup.detach();
          });
        }
      };

      popup.data('habrauser', pluginData).hover(function () {
        clearTimeout(pluginData.timeout);
      }, function () {
        pluginData.timeout = setTimeout(pluginData.onTimeout, 500);
      });
    }

    popup.css({
      'left': x + 'px',
      'top': y + 'px'
    }).appendTo('body').fadeIn(200);

    pluginData.timeout = setTimeout(pluginData.onTimeout, 2000);
  }

  function injectKarma(src) {
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = src;
    document.body.appendChild(script);
    karmaScriptInjected = true;
  }

  function displayUserPopup(e) {
    var userLink = $(e.target).attr('href');
    if (!userCache[userLink]) {
      userCache[userLink] = $('<div class="habrauser loading"></div>');
      loadInfo(userLink, function (newCache, karmaSrc) {
        userCache[userLink].html(newCache).removeClass('loading');
        if (!karmaScriptInjected) {
          injectKarma(karmaSrc);
        }
      });
    }

    displayPopup(userCache[userLink], e.pageX, e.pageY);
    return false;
  }

  function hookPopup() {
    if (optionDisabled('user-popup')) {
      return;
    }

    $('.content_left').delegate('a.username, .author a, .comment_head .info a', 'click', displayUserPopup);
  }

  function colorAuthor() {
    if (optionDisabled('highlight-author')) {
      return;
    }

    var authorLink = $('.infopanel .author a').attr('href');
    $('.content_left').find('a[href="' + authorLink + '"]').addClass('habrauser__author-comment').attr('title', 'Автор');
  }

  function onLoad() {
    colorAuthor();
    hookPopup();
  }

  $(onLoad);

}(jQuery, window.Habrauser = window.Habrauser || {}));
