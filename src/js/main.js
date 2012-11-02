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

  function colorTopComments() {
    if (optionDisabled('highlight-comments')) {
      return;
    }

    var positiveScore = function positiveScore(item) {
      return item.score > 0
    };

    var commentsDescending = function commentsDescending(comment1, comment2) {
      return comment2.score - comment1.score;
    };

    function CommentItem(element) {
      var $el = $(element),
        info = $el.children('.info'),
        score = +info.find('.score').text();

      this.comment = $el;
      this.info = info;
      this.score = isNaN(score) ? 0 : score;
      this.message = $el.children('.message');
    }

    CommentItem.prototype = {
      MAIN_COLOR: '210, 248, 205',

      applyOpacity: function (opacity) {
        var color = 'rgba(' + this.MAIN_COLOR + ', ' + opacity + ')';

        this.message.css('background-color', color);
        this.info.css('background-color', color);
      }
    };

    var toCommentItem = function toCommentItem() {
      return new CommentItem(this);
    };

    var comments = $('.comment_item, .answer').map(toCommentItem).get();
    comments = $.grep(comments, positiveScore);
    comments.sort(commentsDescending);

    var highlightFactor = .20;
    var count = comments.length*highlightFactor >> 0;
    count = Math.max(count, 2);
    count = Math.min(count, 15);
    comments = comments.slice(0, count);

    // todo: filter low score

    function applyColorToComments(comments) {
      var maxOpacity = 1.0,
        length = comments.length,
        step = maxOpacity/(length + 1);

      for (var i = 0; i < length; ++i) {
        comments[i].applyOpacity(maxOpacity - i*step);
      }
    }

    applyColorToComments(comments);
  }

  function onLoad() {
    colorAuthor();
    colorTopComments();
    hookPopup();
  }

  $(onLoad);

}(jQuery, window.Habrauser = window.Habrauser || {}));
