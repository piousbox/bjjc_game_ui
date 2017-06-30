
function px2int(px) {
  var tmp = px.substring(0, px.length - 2);
  tmp = parseInt(tmp);
  return tmp;
}

function doResize() {
  // resize location image
  $("#locationImage").css('height', px2int($("#locationImage").css('width')) * 750 / 1333);

  // resize sword
  $(".i-item").each(function(itemIdx) {
    var item = $(".i-item")[itemIdx];
    $(item).css('width', $(item).height());
  });

  // fix top of inventoryCollapse
  var newTop = ($("#worldMap2").height() - 30) + "px";
  $("#inventoryCollapse").css('top', newTop);
}

(function($) {
  $.dragScroll = function(options) {
    var settings = $.extend({
      scrollVertical: true,
      scrollHorizontal: true,
      cursor: null
    }, options);

    var clicked = false;
    var clickY;
    var clickX;

    var getCursor = function() {
      if (settings.cursor) return settings.cursor;
      if (settings.scrollVertical && settings.scrollHorizontal) return 'move';
      if (settings.scrollVertical) return 'row-resize';
      if (settings.scrollHorizontal) return 'col-resize';
    }
   
    // height: 750
    // width 1333
    var updateScrollPos = function(e, el) {
      var $el = $(el);

      $('html').css('cursor', getCursor());

      var setTop = $el.offset().top + (clickY - e.pageY)

      var maxTop = $el.height() - $("#worldMap2").height();

      var setLeft = $el.offset().left + (clickX - e.pageX);
      var maxLeft = $el.width() - $("#worldMap2").width();

      console.log("+++ +++ set top, left:", setTop, setLeft)

      if (settings.scrollVertical && setTop < 0 && setTop > -maxTop) {
        $el.offset({top: setTop});
      }
      if (settings.scrollHorizontal && setLeft < 0 && setLeft > -846) {
        $el.offset({left: setLeft});
      }
    }

    $(document).on({
      'mousemove': function(e) {
        clicked && updateScrollPos(e, '#worldMap2 .container');
      },
      'mousedown': function(e) {
        if (e.pageY < $("#worldMap2").height() &&
            e.pageX < $("#worldMap2").width()
        ) {
          clicked = true;
        }
        clickY = e.pageY;
        clickX = e.pageX;
      },
      'mouseup': function() {
        clicked = false;
        $('html').css('cursor', 'auto');
      }
    });
  }
}(jQuery))

$.dragScroll();

$(document).ready(function () {
  doResize();

  $("#worldMap2").scroll(function(e) {
    console.log("+++ scrolling event:", e)

    $e = $(e.target);
    window.e = e;
    if ($e.offset().left > 0 ) {
      $e.offset({left: 0 });
    }
    if ($e.offset().left < -845) {
      $e.offset({ left: -1333 });
    }
  });

});

window.onresize = function () { doResize() };

var worldMapCollapsed = false;
function worldMapCollapse () {
  if (worldMapCollapsed) {
    $("#worldMap2").css('width', '33%');
    $("#worldMap2Collapse").css('left', '33%');
    $("#locationMap").css('left', '33%');
    $("#locationMap").css('width', '67%');
    worldMapCollapsed = false;
  } else {
    $("#worldMap2").css('width', '2%');
    $("#worldMap2Collapse").css('left', '2%');
    $("#locationMap").css('left', '2%');
    $("#locationMap").css('width', '98%');
    worldMapCollapsed = true;
  }
  doResize();
};

