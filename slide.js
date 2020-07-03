$.fn.extend({
  slide: function (option) {
    var wrap = $(this);//获取轮播可视区域
    var box = $(this).find(".slide-box");//轮播大盒子
    var item = $(this).find(".slide-item");//轮播单个子元素
    var circle = null;//小圆点的节点
    var current = 1;//轮播当前位置
    var direction = 1;//轮播方向
    var state = option.circleState || true;//是否有小圆点
    var time = option.time || 1000;//轮播自动切换时间
    var circle = null;//小圆点的节点

    // 设置宽高
    var width = option.width || 300;//轮播宽度
    var height = option.height || 200;//轮播高度
    var length = item.length;//轮播子元素个数

    wrap.width(width + "px");
    wrap.height(height + "px");

    item.width(width + "px");
    item.height(height + "px");

    box.width(width * (length + 2) + "px");
    box.height(height + "px");

    // 复制节点
    // 复制节点
    $frist = wrap.find(".slide-item:first").clone();
    $last = wrap.find(".slide-item:last").clone();

    box.append($frist);
    box.prepend($last);




    // 初始化偏移
    box.css("margin-left", "-" + width + "px");


    // 设置小圆点
    if (state) {
      var $circle = $(`
      <div class="slide-circle">
  
      </div>
      `)
      box.append($circle);
      for (var i = 0; i < length; i++) {
        $node = $(`<a href="javascript:;"  num=${i + 1}></a>`);
        box.find(".slide-circle").append($node);
        box.find(".slide-circle a:first").addClass("check");
      }
      circle = box.find(".slide-circle");
      console.log(circle);
    }

    function changeTab() {
      circle.find("a").removeClass("check");
      circle.find("a[num=" + current + "]").addClass("check");
    }

    function move() {
      // 设置当前位置
      current = current + direction;
      direction = 1;

      // 设置偏移
      box.css("margin-left", -width * current + "px");
      box.css("transition", "all .3s");

      // 处理临界点
      if (current == 0 || current > length) {
        current = (current == 0) ? length : 1;

        box.on('transitionend', function () {
          box.css("margin-left", -width * current + "px");
          box.css("transition", "all 0s");
        })
      }

      // 改变小圆点
      if (state) {
        changeTab();
      }
    }
    // 设置定时器
    var timer = setInterval(move.bind(this), time);
    // 鼠标移入停止播放
    wrap.on("mouseover", function () {
      clearInterval(timer);

    })


    // 鼠标离开继续播放
    wrap.on("mouseout", function () {
      timer = setInterval(move.bind(this), time);
    }.bind(this));

    var x = 0;

    // 点击小圆点切换
    if (state) {
      circle.find("a").on("click", function () {
        current = $(this).attr("num") - 1
        // setcurrent();
        move();
      });
    }

    // 鼠标按下获取坐标
    wrap.on('mousedown', function (e) {
      x = e.pageX;
    });

    // 鼠标抬起
    wrap.on('mouseup', function (e) {
      // 判断方向
      if (e.pageX - x > 0) {
        direction = -1;
      }
      else {
        direction = 1;
      }

      // 移动
      move();
    }.bind(this));
  }
});


