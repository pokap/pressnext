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

/**
 * TODO:
 *
 *  - Adds counter level
 *      - Pouvoir afficher autre chose à la place du level
 *  - Improve API
 *  - Adds metric:
 *      - Time the game
 *      - Count "next"
 *      - Number of level not found (percent)
 *  - Adds story:
 *      - Chapters
 *          - Didactiel
 *              - intro + reflexe
 *          - Petite histoire
 *              - c'est une IA (la fenêtre), une rescapée d'un guerre qu'il y a eu entre une colonni humaine et une autre armé humain
 *              - "En fait on va faire un autre histoire"
 *              - Nouvel histoire : Vous être un cowboy et vous allez à la rencontre d'une cowboy pour lui donner une lettre.
 *                  - (boite de dialogue, ce qu'on y écrit est dit au prochain level, mettre le message "get schwifty" pour un autre chapitre)
 * (1)      - Vous lui dites ____ en lui donnant lettre, après avoir lu la lettre elle vous demande "Qu'est ce que cela veut dire ?" <- faire un son google, pas besoin de décompte
 *                  - qu'est ce que vous faite ?
 *              - elle s'approche de vous mais vous ne pouvez pas réagir vos yeux plongé dans les siens.
 *                  - qu'est ce que vous faite ?
 *              - sauvegarde .. (fake, c'est le flag-du-cycle)
 *              - elle prend son arme et le braque sur vous.
 *                  - qu'est ce que vous faite ?
 *              - sont arme à la main, ces yeux dans les votres vous sentez la fin proche.
 *                  - (on peut cliquer sur le "button close" pour éviter le game-over)
 *                  - qu'est ce que vous faite ?
 *              - elle vous tire dessus un grand tire (bruit) qui vous faits tomber du cheval, votre vie prend fin avant même de toucher le sol.
 *                  - Game over. (Reprise à la dernière sauvegarde flag-du-cycle)
 *              - "Bon si vous ne voulez pas jouer à mes histoires on faire autre chose."
 *          - Dernier chapitre:
 *              - Faire un jeu simon prélocalisé, si c'est fini plus vite que prévu faire un message troll
 *              - Faire un compte-à-rebours (sinon prev) avec le next qui s'affiche au dernier moment (on peut clické dessus avant) prélocalisé.
 *              - Plusieurs level dans lequel il faut trouvé une suite d'object pour avoir la clé du dernier next
 *                  - Level 1
 *                      - une première armoire bleu fermé qui contient la clé final
 *                      - une seconde armoire marron contient un clé jaune
 *                  - Level 2
 *                      - un coffre fermé jaune contient un clé verte
 *                  - Level 3
 *                      - chapitre sous-sol
 *                      - Level 3-1
 *                          - une status verte
 *                      - Level 3-2
 *                      - Level 3-3
 * (2)                      - une trape noir (fermé par une clé noir à trouver dans un level caché, qui renvoie faire un autre chapitre)
 *                  - Level 4
 *                      - une horloge de bureau (bruit)
 *                      - le bouton next est grisé (désactivé mais non disable) avec la sérure
 *          - 
 *          - Fin (recommencer, crédit passage rapide, mettre à la fin "vous pouviez lui dire "get schwifty"" sur (1))
 */

let d_background;
let d_next;
let d_close;

document.addEventListener("DOMContentLoaded", () => {
    d_background = document.getElementById('background');
    d_next = document.getElementById('next');
    d_close = document.getElementById('close');

    engine.d_modal = document.getElementById('modal');
    engine.d_title = document.getElementById('title');
    engine.d_content = document.getElementById('content');
    engine.d_level = document.getElementById('level');
    engine.d_chapter = document.getElementById('chapter');

    engine.context = {
        "data": {},
        "background": d_background,
        "next": d_next,
        "modal": engine.d_modal,
        "close": d_close
    };

    d_next.addEventListener("click", (evt) => {
        if (d_next.classList.contains("disable")) {
            return;
        }

        (new Audio("../button.ogg")).play();

        engine.next();
    }, false);

    engine.d_modal.addEventListener("transitionend", (evt) => {
        if (evt.propertyName !== 'opacity') {
            return;
        }

        if (engine.in_transition) {
            engine.manage_level(engine.previous_level, engine.current_level);
        } else {
            if (!!engine.current_callback) {
                engine.current_callback();
            }
        }
    }, false);

    engine.init(levels, chapters);
});

window.debug_game = {
    selection_level: engine.selection_level,
    prev: engine.prev,
    next: engine.next
};
