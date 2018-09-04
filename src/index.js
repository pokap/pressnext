/*
 * This file is part of the PressNext package.
 *
 * (c) Florent Denis <dflorent.pokap@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

'use strict';

import { engine } from './engine';

import levels from './data_level';
import chapters from './data_chapter';

document.addEventListener("DOMContentLoaded", () => {
    engine.init(levels, chapters, (context) => {
        context.next.addEventListener("click", (evt) => {
            if (context.next.classList.contains("disable")) {
                return;
            }

            (new Audio("../sound/button.ogg")).play();

            if (!!context.next.dataset.level) {
                engine.selectionLevel(parseInt(context.next.dataset.level));
                delete context.next.dataset.level;
            } else {
                engine.next();
            }
        }, false);

        context.modal.addEventListener("transitionend", (evt) => {
            if (evt.propertyName !== 'opacity') {
                return;
            }

            engine.rockerLevel();
        }, false);
    });
});

window.debugGame = engine;
