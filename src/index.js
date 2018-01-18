/**
 * TODO:
 *
 *  - Adds counter level
 *  - Improve API
 *  - Adds metric:
 *      - Time the game
 *      - Count "next"
 *      - Number of level not found (percent)
 *  - Adds story:
 *      - Maybe 4 chapters
 *      - Adds a sub-game:
 *          - More levels/chapters
 *          - Enigmas
 */
;(function () {
    var chapters = [
        {
            "last_level_number": 2
        },
        {
            "last_level_number": 8,
            "__initialize": function (context) {
                context.background.style.background = '#00131D';
            },
            "__finish": function (context) {
                context.background.style.background = null;
            }
        },
        {
            "last_level_number": 11,
            "__initialize": function (context) {
                context.background.style.background = '#333';
            },
            "__finish": function (context) {
                context.background.style.background = null;
            }
        }
    ];

    var levels = [
        {
            "title": "Press \"Next\" to continue.",
            "message": ["Welcome, I will be your guide.","Press \"next\" to go to the next level."]
        },
        {
            "title": "Successful.",
            "message": ["Congratulations on the completion of the project.","Press \"next\" to go to the next level."]
        },
        {
            "title": "Let's try something",
            "message": ["Chapitre 2","&nbsp;","We will test your reflexes.","&nbsp;","Les't GO, GO GO GO Press \"next\" to go to the next level."]
        },
        {
            "title": "Press \"next\" to go to the next level.",
            "message": ["Press \"next\" to go to the next level."],
            "__initialize": function (context) {
                var maxXPosition = 30;
                var minXPosition = -30;

                var speed = 2;
                var position = 0;

                pn_start_animate(function () {
                    position = position + speed;

                    if (position > maxXPosition || position < minXPosition) {
                        speed = speed * (-1);
                    }

                    context.modal.style.left = position + 'px';
                });
            },
            "__finish": function (context) {
                pn_stop_animate();

                context.modal.style.left = null;
            }
        },
        {
            "title": "New level",
            "message": ["Try something else, more difficult, slightly faster."],
        },
        {
            "title": "Press \"next\" to go to the next level.",
            "message": ["Press \"next\" to go to the next level."],
            "__initialize": function (context) {
                var maxYPosition = 30;
                var minYPosition = -30;

                var speed = 4;
                var position = 0;

                pn_start_animate(function () {
                    position = position + speed;

                    if (position > maxYPosition || position < minYPosition) {
                        speed = speed * (-1);
                    }

                    context.modal.style.top = position + 'px';
                });
            },
            "__finish": function (context) {
                pn_stop_animate();

                context.modal.style.top = null;
            }
        },
        {
            "title": "Very nice",
            "message": ["Now the 2 together."],
        },
        {
            "title": "Press \"next\" to go to the next level.",
            "message": ["Press \"next\" to go to the next level."],
            "__initialize": function (context) {
                var maxXPosition = 200;
                var minXPosition = -200;
                var maxYPosition = 50;
                var minYPosition = -50;

                var speedX = 4, speedY = 4;
                var positionX = 0;
                var positionY = 0;

                pn_start_animate(function () {
                    positionX = positionX + speedX;
                    positionY = positionY + speedY;

                    if (positionX > maxXPosition || positionX < minXPosition) {
                        speedX = speedX * (-1);
                    }
                    if (positionY > maxYPosition || positionY < minYPosition) {
                        speedY = speedY * (-1);
                    }

                    context.modal.style.left = positionX + 'px';
                    context.modal.style.top = positionY + 'px';
                });
            },
            "__finish": function (context) {
                pn_stop_animate();

                context.modal.style.left = null;
            }
        },
        {
            "title": "Oh jeez!",
            "message": ["&nbsp;","&nbsp;","I play a better game.","&nbsp;","&nbsp;"]
        },
        {
            "title": "Click X",
            "message": ["OMG CLICK X for next level."],
            "__initialize": function (context) {
                context.data.xnext = function () { pn_next_suite(1); };

                context.next.classList.add('disable');

                context.close.classList.remove('disable');
                context.close.addEventListener("click", context.data.xnext, false);

                document.querySelector('h1').innerText = 'ClickX';
                document.querySelector('title').innerText = 'ClickX';
            },
            "__finish": function (context) {
                context.close.removeEventListener("click", context.data.xnext);

                context.next.classList.remove('disable');
                context.close.classList.add('disable');

                document.querySelector('h1').innerText = 'PressNext';
                document.querySelector('title').innerText = 'PressNext';
            }
        },
        {
            "title": "Ending",
            "message": ["The end."],
            "__initialize": function (context) {
                var button = document.createElement("button");
                button.innerText = 'BACK';
                button.className = 'primary';
                button.addEventListener("click", function () { pn_prev_suite(1); }, false);

                context.next.classList.remove("primary");

                context.data.d_prev = context.next.parentNode.appendChild(button);
            },
            "__finish": function (context) {
                context.data.d_prev.remove();

                context.next.classList.add("primary");
            }
        }
    ];

    var previous_level = levels.length;
    var current_level = 1;
    var current_chapter = 1;
    var current_callback;
    var in_transition = false;

    var d_background;
    var d_modal;
    var d_title;
    var d_content;
    var d_next;
    var d_level;
    var d_chapter;
    var d_close;

    var context = {};

    function pn_start_animate(callback) {
        var tick = function (timestamp) {
            callback();

            context.data._anime = window.requestAnimationFrame(tick);
        };

        context.data._anime = window.requestAnimationFrame(tick);
    }
    function pn_stop_animate() {
        window.cancelAnimationFrame(context.data._anime);
    }
    function pn_next_suite(time) {
        if (time === 1) {
            next();
        } else {
            next(function () { pn_next_suite(time - 1) });
        }
    }
    function pn_prev_suite(time) {
        if (time === 1) {
            prev();
        } else {
            prev(function () { pn_prev_suite(time - 1); });
        }
    }

    function _debug(message) {
        var now = new Date();
        var date = [now.getFullYear(),now.getMonth(),now.getDate()].join('-');
        var time = [now.getHours(),now.getMinutes(),now.getSeconds(),now.getMilliseconds()].join(':');

        console.log('['+date+'T'+time+'] '+message);
    }
    function _close_chapter(chapter_index) {
_debug("close chapter n°"+(chapter_index + 1));
        var chapter = chapters[chapter_index];

        if (chapter.hasOwnProperty('__finish')) {
            chapter.__finish(context);
        }
    }
    function _load_chapter(chapter_index) {
_debug("load chapter n°"+(chapter_index + 1));
        var chapter = chapters[chapter_index];

        if (chapter.hasOwnProperty('__initialize')) {
            chapter.__initialize(context);
        }

        d_chapter.innerText = chapter_index + 1;
    }
    function _close_level(level_index) {
_debug("close level n°"+(level_index + 1));
        var level = levels[level_index];

        if (level.hasOwnProperty('__finish')) {
            level.__finish(context);
        }

        // clear
        context.data = {};
    }
    function _load_level(level_index) {
_debug("load level n°"+(level_index + 1));
        var level = levels[level_index];

        if (level.hasOwnProperty('__initialize')) {
            level.__initialize(context);
        }

        d_level.innerText = level_index + 1;
        d_title.innerText = level.title;
        d_content.innerHTML = '<p>' + level.message.join('</p><p>') + '</p>';
    }
    function _manage_level(previous_level_number, new_level_number) {
        if (!in_transition) {
            return;
        }

        var previous_chapter_number = search_chapter(previous_level_number);

        current_chapter = search_chapter(new_level_number);

        _close_level(previous_level_number - 1);

        if (previous_chapter_number !== current_chapter) {
            _close_chapter(previous_chapter_number - 1);
            _load_chapter(current_chapter - 1);
        }

        _load_level(new_level_number - 1);

        d_modal.classList.remove("transition");
        in_transition = false;
    }

    function selection_level(level_number, callback) {
_debug("selection level n°"+level_number);
        if (level_number > levels.length || level_number < 1) {
            throw "No such level.";
        }

        if (in_transition) {
            return;
        }

        previous_level = current_level;
        current_level = level_number;
        current_callback = callback;

        d_modal.classList.add("transition");
        in_transition = true;
    }

    function prev(callback) {
_debug("prev");
        if (in_transition) {
            return;
        }

        if (current_level <= 1) {
            current_level = 1;

            selection_level(levels.length, callback);
        } else {
            selection_level(current_level - 1, callback);
        }
    }

    function next(callback) {
_debug("next");
        if (in_transition) {
            return;
        }

        if (current_level >= levels.length) {
            current_level = levels.length;

            selection_level(1, callback);
        } else {
            selection_level(current_level + 1, callback);
        }
    }

    function search_chapter(level_number) {
        for (var i = chapters.length; i > 0; i--) {
            if (level_number > chapters[i - 1].last_level_number) {
                return i + 1;
            }
        }

        return 1;
    }

    function init() {
        d_background = document.getElementById('background');
        d_modal = document.getElementById('modal');
        d_title = document.getElementById('title');
        d_content = document.getElementById('content');
        d_next = document.getElementById('next');
        d_level = document.getElementById('level');
        d_chapter = document.getElementById('chapter');
        d_close = document.getElementById('close');

        context = {
            "data": {},
            "background": d_background,
            "next": d_next,
            "modal": d_modal,
            "close": d_close
        };

        d_modal.addEventListener("transitionend", function (evt) {
            if (evt.propertyName !== 'opacity') {
                return;
            }

            if (in_transition) {
                _manage_level(previous_level, current_level);
            } else {
                if (!!current_callback) {
                    current_callback();
                }
            }
        }, false);

        d_next.addEventListener("click", function (evt) {
            if (d_next.classList.contains("disable")) {
                return;
            }

            (new Audio("../button.ogg")).play();

            next();
        }, false);

        _load_level(0);
    }

    document.addEventListener("DOMContentLoaded", init);
    
    window._debug_game = {
        selection_level: selection_level,
        prev: prev,
        next: next
    };
})();
