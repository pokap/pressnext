/*
 * This file is part of the PressNext package.
 *
 * (c) Florent Denis <dflorent.pokap@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

'use strict';

import { engine } from 'engine';

import levels from 'data_level';
import chapters from 'data_chapter';

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

let d_background;
let d_next;
let d_close;

document.addEventListener("DOMContentLoaded", () => {
    d_background = document.getElementById('background');
    d_next = document.getElementById('next');
    d_close = document.getElementById('close');

    engine.d_modal = document.getElementById('modal');
    engine.d_title = document.getElementById('title');
    engine.d_content = document.getElementById('content');
    engine.d_level = document.getElementById('level');
    engine.d_chapter = document.getElementById('chapter');

    engine.context = {
        "data": {},
        "background": d_background,
        "next": d_next,
        "modal": engine.d_modal,
        "close": d_close
    };

    d_next.addEventListener("click", (evt) => {
        if (d_next.classList.contains("disable")) {
            return;
        }

        (new Audio("../button.ogg")).play();

        engine.next();
    }, false);

    engine.d_modal.addEventListener("transitionend", (evt) => {
        if (evt.propertyName !== 'opacity') {
            return;
        }

        if (engine.in_transition) {
            engine.manage_level(engine.previous_level, engine.current_level);
        } else {
            if (!!engine.current_callback) {
                engine.current_callback();
            }
        }
    }, false);

    engine.init(levels, chapters);
});

window.debug_game = {
    selection_level: engine.selection_level,
    prev: engine.prev,
    next: engine.next
};
