/*
 * This file is part of the PressNext package.
 *
 * (c) Florent Denis <dflorent.pokap@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

'use strict';

import { tool } from './tool';

export default [
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
        "__initialize": (context) => {
            let maxXPosition = 30;
            let minXPosition = -30;

            let speed = 2;
            let position = 0;

            tool.start_animate(context, () => {
                position = position + speed;

                if (position > maxXPosition || position < minXPosition) {
                    speed = speed * (-1);
                }

                context.modal.style.left = position + 'px';
            });
        },
        "__finish": (context) => {
            tool.stop_animate(context);

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
        "__initialize": (context) => {
            let maxYPosition = 30;
            let minYPosition = -30;

            let speed = 4;
            let position = 0;

            tool.start_animate(context, () => {
                position = position + speed;

                if (position > maxYPosition || position < minYPosition) {
                    speed = speed * (-1);
                }

                context.modal.style.top = position + 'px';
            });
        },
        "__finish": (context) => {
            tool.stop_animate(context);

            context.modal.style.top = null;
        }
    },
    {
        "title": "Very nice",
        "message": ["Now the 2 together."]
    },
    {
        "title": "Press \"next\" to go to the next level.",
        "message": ["Press \"next\" to go to the next level."],
        "__initialize": (context) => {
            let maxXPosition = 200;
            let minXPosition = -200;
            let maxYPosition = 50;
            let minYPosition = -50;

            let speedX = 4, speedY = 4;
            let positionX = 0;
            let positionY = 0;

            tool.start_animate(context, () => {
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
        "__finish": (context) => {
            tool.stop_animate(context);

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
        "__initialize": (context) => {
            context.data.xnext = () => { tool.next_suite(1); };

            context.next.classList.add('disable');

            context.close.classList.remove('disable');
            context.close.addEventListener("click", context.data.xnext, false);

            document.querySelector('h1').innerText = 'ClickX';
            document.querySelector('title').innerText = 'ClickX';
        },
        "__finish": (context) => {
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
        "__initialize": (context) => {
            let button = document.createElement("button");
            button.innerText = 'BACK';
            button.className = 'primary';
            button.addEventListener("click", () => { tool.prev_suite(1); }, false);

            context.next.classList.remove("primary");

            context.data.d_prev = context.next.parentNode.appendChild(button);
        },
        "__finish": (context) => {
            context.data.d_prev.remove();

            context.next.classList.add("primary");
        }
    }
];
