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

function button_shoot_her() {
    let shoot = document.createElement("button");
    shoot.innerText = 'Shoot her';
    shoot.disabled = true;

    return shoot;
}

export default [
    {
        "title": "New story",
        "message": ["<i>You are a cowboy and you meet a cowboy to give him a letter.</i>"],
        "__initialize": (context) => {
            tool.fadeMessages(context);

            let input = document.createElement("input");
            input.type = 'text';
            input.value = 'hmmm';

            context.data.input = context.next.parentNode.insertBefore(input, context.next);
        },
        "__finish": (context) => {
            context.data.text = context.data.input.value || 'hmmm';

            context.data.input.remove();
            context.data.input = null;
        }
    },
    {
        "title": "The letter of everything",
        "message": (context) => {
            return [
                "<i>You tell him \""+context.data.text+"\" by giving him a letter.</i>",
                "<i>After reading the letter she asks you \"What does that mean?\".</i>"
            ];
        },
        "__initialize": (context) => {
            tool.fadeMessages(context);

            (new Audio("../sound/whatdoesthatmean.ogg")).play();
        }
    },
    {
        "title": "The letter of everything",
        "message":[
            "<i>She approaches you but you can not react your eyes immersed in hers.</i>"
        ],
        "__initialize": (context) => {
            tool.fadeMessages(context);

            context.data.shoot = context.next.parentNode.insertBefore(button_shoot_her(), context.next);
        },
        "__finish": (context) => {
            context.data.shoot.remove();
            context.data.input = null;
        }
    },
    {
        "title": "Quick save...",
        "message": ["Quick save..."]
    },
    {
        "title": "The letter of everything",
        "message": [
            "<i>She takes her weapon and points it at you.</i>"
        ],
        "__initialize": (context) => {
            tool.fadeMessages(context);

            context.data.shoot = context.next.parentNode.insertBefore(button_shoot_her(), context.next);
        },
        "__finish": (context) => {
            context.data.shoot.remove();
            context.data.input = null;
        }
    },
    {
        "title": "The letter of everything",
        "message": [
            "<i>Her weapon in his hand, those eyes in yours you feel the near end.</i>"
        ],
        "__initialize": (context) => {
            tool.fadeMessages(context);

            context.data.xnext = () => { tool.selectionLevel(19); };

            context.close.classList.remove('disable');
            context.close.addEventListener("click", context.data.xnext, false);

            document.querySelector('h1').innerText = 'ClickX';
            document.querySelector('title').innerText = 'ClickX';

            context.data.shoot = context.next.parentNode.insertBefore(button_shoot_her(), context.next);
        },
        "__finish": (context) => {
            context.close.removeEventListener("click", context.data.xnext);
            context.close.classList.add('disable');

            document.querySelector('h1').innerText = 'PressNext';
            document.querySelector('title').innerText = 'PressNext';

            context.data.shoot.remove();
            context.data.input = null;
        }
    },
    {
        "title": "The letter of everything",
        "message": [
            "<i>She shoots you.</i>",
            "<i>The shock that makes you fall off the horse.</i>",
            "<i>Your life ends before you even touch the ground.</i>"
        ],
        "__initialize": (context) => {
            tool.fadeMessages(context);

            (new Audio("../sound/winchestershot.ogg")).play();
        }
    },
    {
        "title": "Game over.",
        "message": ["You are dead."],
        "__initialize": (context) => {
            context.next.dataset.level = '12';
        }
    },
    {
        "title": "OK",
        "message": ["Well if you do not want to play my stories we do something else."]
    },
];
