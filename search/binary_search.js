define(['../vendor/zrender/src/zrender.js',
        '../vendor/zrender/src/shape/Circle.js',
        '../vendor/zrender/src/shape/Line.js'
       ],
function(zrender, CircleShape, Line) {

    var zr = zrender.init(document.getElementById('main'));
    var array = [1, 5, 9, 11, 15, 20, 77, 88, 90, 200, 301];

    var hiArrow = null;
    var loArrow = null;

    +function draw() {
        for (var i = 0; i < array.length; i++) {
            // 圆形
            zr.addShape(new CircleShape({
                style: {
                    x: 20 + 20 * 3 * i,
                    y: 100,
                    r: 20,
                    brushType: 'both',
                    color: 'rgba(220, 20, 60, 0.8)',
                    text: array[i],
                    textPosition: 'inside'
                },
                hoverable: true,   // default true
                draggable: false,   // default false
                clickable: false
            }));
        };

        loArrow = new Line({
            style: {
                 xStart: 20,
                 yStart: 40,
                 xEnd: 20,
                 yEnd: 80,
                 strokeColor: '#F3F3F3',
                 lineWidth: 10
            }
        });

        hiArrow = new Line({
            style: {
                xStart: 20 + 20 * 3 * (array.length - 1),
                yStart: 40,
                xEnd: 20 + 20 * 3 * (array.length - 1),
                yEnd: 80,
                strokeColor: '#F3F3F3',
                lineWidth: 10
            }
        });

        zr.addShape(loArrow);
        zr.addShape(hiArrow);

    }();


    function reset() {
        loArrow.style.xStart = 20;
        loArrow.style.xEnd = 20;

        hiArrow.style.xStart = 20 + 20 * 3 * (array.length - 1);
        hiArrow.style.xEnd = 20 + 20 * 3 * (array.length - 1);

        zr.modShape(loArrow.id, loArrow);
        zr.modShape(hiArrow.id, hiArrow);

        zr.refresh();
    }

    return function(number) {
        //reset();
        number = Number(number);
        var lo = 0;
        var hi = array.length - 1;

        var timer = setInterval(function() {
            if( lo < hi) {
                var mid = Math.ceil(lo + (hi - lo) / 2);
                if (number < array[mid]) {
                    hi = mid;
                    hiArrow.style.xStart = 20 + 20 * 3 * mid;
                    hiArrow.style.xEnd = 20 + 20 * 3 * mid;
                    zr.modShape(hiArrow.id, hiArrow);
                    zr.refresh();
                } else if (number > array[mid]) {
                    lo = mid;
                    loArrow.style.xStart = 20 + 20 * 3 * mid;
                    loArrow.style.xEnd = 20 + 20 * 3 * mid;
                    zr.modShape(loArrow.id, loArrow);
                    zr.refresh();
                } else {
                    loArrow.style.xStart = 20 + 20 * 3 * mid;
                    loArrow.style.xEnd = 20 + 20 * 3 * mid;
                    hiArrow.style.xStart = 20 + 20 * 3 * mid;
                    hiArrow.style.xEnd = 20 + 20 * 3 * mid;
                    zr.modShape(loArrow.id, loArrow);
                    zr.modShape(hiArrow.id, hiArrow);
                    zr.refresh();
                    clearInterval(timer);
                }
            }
        }, 2000);
    }

});