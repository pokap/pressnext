/*
 * This file is part of the PressNext package.
 *
 * (c) Florent Denis <dflorent.pokap@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

'use strict';

let logger = {};

logger.debug = function (message) {
    let now = new Date();
    let date = [now.getFullYear(),now.getMonth(),now.getDate()].join('-');
    let time = [now.getHours(),now.getMinutes(),now.getSeconds(),now.getMilliseconds()].join(':');

    console.log('['+date+'T'+time+'] '+message);
};

export { logger };
