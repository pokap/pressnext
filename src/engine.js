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

let engine = {};

engine.levels = [];
engine.chapters = [];

engine.previous_level = null;
engine.current_level = 1;
engine.current_chapter = 1;
engine.current_callback = null;
engine.in_transition = false;
engine.context = {};

engine.d_modal = null;
engine.d_title = null;
engine.d_content = null;
engine.d_level = null;
engine.d_chapter = null;

engine.init = function (levels, chapters) {
    this.levels = levels;
    this.chapters = chapters;

    this.previous_level = levels.length;

    this.load_level(0);
};

engine.close_chapter = function (chapter_index) {
    logger.debug("close chapter n°"+(chapter_index + 1));

    let chapter = this.chapters[chapter_index];

    if (chapter.hasOwnProperty('__finish')) {
        chapter.__finish(this.context);
    }
};

engine.load_chapter = function (chapter_index) {
    logger.debug("load chapter n°"+(chapter_index + 1));

    let chapter = this.chapters[chapter_index];

    if (chapter.hasOwnProperty('__initialize')) {
        chapter.__initialize(this.context);
    }

    this.d_chapter.innerText = chapter_index + 1;
};

engine.close_level = function (level_index) {
    logger.debug("close level n°"+(level_index + 1));

    let level = this.levels[level_index];

    if (level.hasOwnProperty('__finish')) {
        level.__finish(this.context);
    }

    // clear
    this.context.data = {};
};

engine.load_level = function (level_index) {
    logger.debug("load level n°"+(level_index + 1));

    let level = this.levels[level_index];

    if (level.hasOwnProperty('__initialize')) {
        level.__initialize(this.context);
    }

    this.d_level.innerText = level_index + 1;
    this.d_title.innerText = level.title;
    this.d_content.innerHTML = '<p>' + level.message.join('</p><p>') + '</p>';
};

engine.manage_level = function (previous_level_number, new_level_number) {
    if (!this.in_transition) {
        return;
    }

    let previous_chapter_number = this.search_chapter(previous_level_number);

    this.current_chapter = this.search_chapter(new_level_number);

    this.close_level(previous_level_number - 1);

    if (previous_chapter_number !== this.current_chapter) {
        this.close_chapter(previous_chapter_number - 1);
        this.load_chapter(this.current_chapter - 1);
    }

    this.load_level(new_level_number - 1);

    this.d_modal.classList.remove("transition");
    this.in_transition = false;
};

engine.search_chapter = function (level_number) {
    for (let i = this.chapters.length; i > 0; i--) {
        if (level_number > this.chapters[i - 1].last_level_number) {
            return i + 1;
        }
    }

    return 1;
};

engine.selection_level = function (level_number, callback) {
    logger.debug("selection level n°"+level_number);

    if (level_number > this.levels.length || level_number < 1) {
        throw "No such level.";
    }

    if (this.in_transition) {
        return;
    }

    this.previous_level = this.current_level;
    this.current_level = level_number;
    this.current_callback = callback;

    this.d_modal.classList.add("transition");
    this.in_transition = true;
};

engine.prev = function (callback) {
    logger.debug("prev");

    if (this.in_transition) {
        return;
    }

    if (this.current_level <= 1) {
        this.current_level = 1;

        this.selection_level(this.levels.length, callback);
    } else {
        this.selection_level(this.current_level - 1, callback);
    }
};

engine.next = function (callback) {
    logger.debug("next");

    if (this.in_transition) {
        return;
    }

    if (this.current_level >= this.levels.length) {
        this.current_level = this.levels.length;

        this.selection_level(1, callback);
    } else {
        this.selection_level(this.current_level + 1, callback);
    }
};

export { engine };
