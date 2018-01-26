/*
 * This file is part of the PressNext package.
 *
 * (c) Florent Denis <dflorent.pokap@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

'use strict';

import c1_01_intro from './level/c1_01_intro';
import c1_02_reflex from './level/c1_02_reflex';
import c2_02_story2 from './level/c2_02_story2';

export default []
    .concat(c1_01_intro)
    .concat(c1_02_reflex)
    .concat(c2_02_story2)
;

// export default [
//
//     {
//         "title": "Oh jeez!",
//         "message": ["&nbsp;","&nbsp;","I play a better game.","&nbsp;","&nbsp;"]
//     },
//     {
//         "title": "Click X",
//         "message": ["OMG CLICK X for next level."],
//         "__initialize": (context) => {
//             context.data.xnext = () => { tool.nextSuite(1); };
//
//             context.next.classList.add('disable');
//
//             context.close.classList.remove('disable');
//             context.close.addEventListener("click", context.data.xnext, false);
//
//             document.querySelector('h1').innerText = 'ClickX';
//             document.querySelector('title').innerText = 'ClickX';
//         },
//         "__finish": (context) => {
//             context.close.removeEventListener("click", context.data.xnext);
//
//             context.next.classList.remove('disable');
//             context.close.classList.add('disable');
//
//             document.querySelector('h1').innerText = 'PressNext';
//             document.querySelector('title').innerText = 'PressNext';
//         }
//     },
//     {
//         "title": "Ending",
//         "message": ["The end."],
//         "__initialize": (context) => {
//             let button = document.createElement("button");
//             button.innerText = 'BACK';
//             button.className = 'primary';
//             button.addEventListener("click", () => { tool.prevSuite(1); }, false);
//
//             context.next.classList.remove("primary");
//
//             context.data.d_prev = context.next.parentNode.appendChild(button);
//         },
//         "__finish": (context) => {
//             context.data.d_prev.remove();
//
//             context.next.classList.add("primary");
//         }
//     }
// ];
