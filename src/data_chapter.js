/*
 * This file is part of the PressNext package.
 *
 * (c) Florent Denis <dflorent.pokap@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

'use strict';

export default [
    {
        "name": "1",
        "last_level_number": 2
    },
    {
        "name": "2",
        "last_level_number": 8,
        "__initialize": (context) => {
            context.background.style.background = '#00131D';
        },
        "__finish": (context) => {
            context.background.style.background = null;
        }
    },
    {
        "name": "3",
        "last_level_number": 11,
        "__initialize": (context) => {
            context.background.style.background = '#333';
        },
        "__finish": (context) => {
            context.background.style.background = null;
        }
    }
];
