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
        "title": "Let's try something",
        "message": ["We will test your reflexes.","&nbsp;","Les't GO, GO GO GO Press \"next\" to go to the next level."]
    },
    {
        "title": "Press \"next\" to go to the next level.",
        "message": ["Press \"next\" to go to the next level."],
        "__initialize": (context) => {
            let maxXPosition = 30;
            let minXPosition = -30;

            let speed = 2;
            let position = 0;

            tool.startAnimate(context, (context) => {
                position = position + speed;

                if (position > maxXPosition || position < minXPosition) {
                    speed = speed * (-1);
                }

                context.modal.style.left = position + 'px';
            });
        },
        "__finish": (context) => {
            tool.stopAnimate(context);

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

            tool.startAnimate(context, (context) => {
                position = position + speed;

                if (position > maxYPosition || position < minYPosition) {
                    speed = speed * (-1);
                }

                context.modal.style.top = position + 'px';
            });
        },
        "__finish": (context) => {
            tool.stopAnimate(context);

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

            tool.startAnimate(context, (context) => {
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
            tool.stopAnimate(context);

            context.modal.style.left = null;
        }
    },
];
