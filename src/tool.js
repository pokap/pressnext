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

let tool = {};

tool.start_animate = (context, callback) => {
    let tick = (timestamp) => {
        callback();

        context.data._anime = window.requestAnimationFrame(tick);
    };

    context.data._anime = window.requestAnimationFrame(tick);
};

tool.stop_animate = (context) => {
    window.cancelAnimationFrame(context.data._anime);
};

tool.next_suite = (time) => {
    if (time === 1) {
        engine.next();
    } else {
        engine.next(() => { tool.next_suite(time - 1) });
    }
};

tool.prev_suite = (time) => {
    if (time === 1) {
        engine.prev();
    } else {
        engine.prev(() => { tool.prev_suite(time - 1); });
    }
};

export { tool };
