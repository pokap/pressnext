/*
 * This file is part of the PressNext package.
 *
 * (c) Florent Denis <dflorent.pokap@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

'use strict';

import { logger } from './logger';

let previousLevel;
let currentLevel = 1;
let currentChapter = 1;

let currentCallback;

let chapters = [];
let levels = [];

let searchChapter = (levelNumber) => {
    for (let i = chapters.length; i > 0; i--) {
        if (levelNumber > chapters[i - 1].last_level_number) {
            return i + 1;
        }
    }

    return 1;
};

let closeChapter = (chapterIndex, context) => {
    logger.debug("close chapter n°"+(chapterIndex + 1));

    let chapter = chapters[chapterIndex];

    if (chapter.hasOwnProperty('__finish')) {
        chapter.__finish(context);
    }
};

let loadChapter = (chapterIndex, context) => {
    logger.debug("load chapter n°"+(chapterIndex + 1));

    let chapter = chapters[chapterIndex];

    if (chapter.hasOwnProperty('__initialize')) {
        chapter.__initialize(context);
    }

    context.chapter.innerText = chapterIndex + 1;
};

let closeLevel = (levelIndex, context) => {
    logger.debug("close level n°"+(levelIndex + 1));

    let level = levels[levelIndex];

    if (level.hasOwnProperty('__finish')) {
        level.__finish(context);
    }

    // clear
    context.data = {};
};

let loadLevel = (levelIndex, context) => {
    logger.debug("load level n°"+(levelIndex + 1));

    let level = levels[levelIndex];

    if (level.hasOwnProperty('__initialize')) {
        level.__initialize(context);
    }

    context.level.innerText = levelIndex + 1;
    context.title.innerText = level.title;
    context.content.innerHTML = '<p>' + level.message.join('</p><p>') + '</p>';
};

let manageLevel = (previousLevelNumber, newLevelNumber, context) => {
    let previousChapterNumber = searchChapter(previousLevelNumber);

    currentChapter = searchChapter(newLevelNumber);

    closeLevel(previousLevelNumber - 1, context);

    if (previousChapterNumber !== currentChapter) {
        closeChapter(previousChapterNumber - 1, context);
        loadChapter(currentChapter - 1, context);
    }

    loadLevel(newLevelNumber - 1, context);

    context.modal.classList.remove("transition");
};

let engine = {};

engine.inTransition = false;
engine.context = {};

engine.init = function (_levels, _chapters, callback) {
    let docById = (id) => document.getElementById(id);

    levels = _levels;
    chapters = _chapters;

    previousLevel = _levels.length;

    engine.context = {
        "data": {},
        "background": docById('background'),
        "next": docById('next'),
        "modal": docById('modal'),
        "close": docById('close'),
        "title": docById('title'),
        "content": docById('content'),
        "level": docById('level'),
        "chapter": docById('chapter')
    };

    callback(engine.context);

    loadLevel(0, engine.context);
};

engine.rockerLevel = () => {
    if (engine.inTransition) {
        manageLevel(previousLevel, currentLevel, engine.context);

        engine.inTransition = false;
    } else {
        if (!!currentCallback) {
            currentCallback();
        }
    }
};

engine.selectionLevel = function (levelNumber, callback) {
    logger.debug("selection level n°"+levelNumber);

    if (levelNumber > levels.length || levelNumber < 1) {
        throw "No such level.";
    }

    if (engine.inTransition) {
        return;
    }

    previousLevel = currentLevel;
    currentLevel = levelNumber;
    currentCallback = callback;

    engine.inTransition = true;
    engine.context.modal.classList.add("transition");
};

engine.prev = function (callback) {
    logger.debug("prev");

    if (engine.inTransition) {
        return;
    }

    if (currentLevel <= 1) {
        currentLevel = 1;

        engine.selectionLevel(levels.length, callback);
    } else {
        engine.selectionLevel(currentLevel - 1, callback);
    }
};

engine.next = function (callback) {
    logger.debug("next");

    if (engine.inTransition) {
        return;
    }

    if (currentLevel >= levels.length) {
        currentLevel = levels.length;

        engine.selectionLevel(1, callback);
    } else {
        engine.selectionLevel(currentLevel + 1, callback);
    }
};

export { engine };
