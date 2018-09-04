/*
 * This file is part of the PressNext package.
 *
 * (c) Florent Denis <dflorent.pokap@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

'use strict';

import { tool } from './../tool';

export default [
    {
        "title": "I will talk about something",
        "message": ["<i>I will tell you a story.</i>","<i>My story.</i>","<i>I am not a simple game.</i>","<i>I am a survivor of a war between a human colony and another human army.</i>"],
        "__initialize": (context) => {
            tool.fadeMessages(context);
        }
    },
    {
        "title": "I will talk about something",
        "message": ["In fact we will make another story..."]
    }
];
