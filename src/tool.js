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

tool.startAnimate = (context, callback) => {
    let tick = (timestamp) => {
        callback();

        context.data._anime = window.requestAnimationFrame(tick);
    };

    context.data._anime = window.requestAnimationFrame(tick);
};

tool.stopAnimate = (context) => {
    window.cancelAnimationFrame(context.data._anime);
};

tool.nextSuite = (time) => {
    if (time === 1) {
        engine.next();
    } else {
        engine.next(() => { tool.nextSuite(time - 1) });
    }
};

tool.prevSuite = (time) => {
    if (time === 1) {
        engine.prev();
    } else {
        engine.prev(() => { tool.prevSuite(time - 1); });
    }
};

tool.selectionLevel = (level, callback) => {
    engine.selectionLevel(level, callback)
};

export { tool };
