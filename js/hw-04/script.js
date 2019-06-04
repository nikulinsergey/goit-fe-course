'use strict';

const Priority = {
    LOW: 0,
    NORMAL: 1,
    HIGH: 2,
};

const notepad = {
    notes: [],
    getNotes() {
        /*
         * Принимает: ничего
         * Возвращает: все заметки, значение свойства notes
         */
        return this.notes
    },
    findNoteById(id) {
        /*
         * Ищет заметку в массиве notes
         *
         * Принимает: идентификатор заметки
         * Возвращает: заметку с совпавшим полем id или undefined если ничего не найдено
         */
        let noteFound = '';
        for (let i = 0; i < this['notes'].length; i += 1) {

            if (this.notes[i]['id'] === id) {
                noteFound = this.notes[i];
                break;
            } else {
                noteFound = undefined
            }
        }
        return noteFound
    },
    saveNote(note) {
        /*
         * Сохраняет заметку в массив notes
         *
         * Принимает: объект заметки
         * Возвращает: сохраненную заметку
         */

        this['notes'].push(note);
        return this['notes' [note]]
    },
    deleteNote(id) {
        /*
         * Удаляет заметку по идентификатору из массива notes
         *
         * Принимает: идентификатор заметки
         * Возвращает: ничего
         */

        for (let i = 0; i < this['notes'].length; i += 1) {
            if (this.notes[i]['id'] === id) {
                this['notes'].splice(1, i)
            }
        }
    },
    updateNoteContent(id, updatedContent) {
        /*
         * Обновляет контент заметки
         * updatedContent - объект с полями вида {имя: значение, имя: значение}
         * Свойств в объекте updatedContent может быть произвольное количество
         *
         * Принимает: идентификатор заметки и объект, полями которого надо обновить заметку
         * Возвращает: обновленную заметку
         */

        for (let i = 0; i < this['notes'].length; i += 1) {
            if (this.notes[i]['id'] === id) {
                this.notes[i] = {
                    ...this.notes[i],
                    ...updatedContent
                }
                return this.notes[i]
            } else continue;
        }

    },


    updateNotePriority(id, priority) {
        /*
         * Обновляет приоритет заметки
         *
         * Принимает: идентификатор заметки и ее новый приоритет
         * Возвращает: обновленную заметку
         */

        for (let i = 0; i < this['notes'].length; i += 1) {
            if (this.notes[i]['id'] === id) {
                this.notes[i]['priority'] = priority;
                return this.notes[i]
            }
        }
    },
    filterNotesByQuery(query) {
        /*
         * Фильтрует массив заметок по подстроке query.
         * Если значение query есть в заголовке или теле заметки - она подходит
         *
         * Принимает: подстроку для поиска в title и body заметки
         * Возвращает: новый массив заметок, контент которых содержит подстроку
         */
        let newArr = [];



        for (let i = 0; i < this['notes'].length; i += 1) {

            for (let key in this.notes[i]) {
                let lowerString = '';
                if (key === 'title' || key === 'body') {
                    lowerString = this.notes[i][key].toLowerCase()
                    if (lowerString.includes(query)) {
                        newArr.push(this.notes[i]);
                        break;
                    } else continue;
                }
            }
        }
        return newArr
    },

    filterNotesByPriority(priority) {
        /*
         * Фильтрует массив заметок по значению приоритета
         * Если значение priority совпадает с приоритетом заметки - она подходит
         *
         * Принимает: приоритет для поиска в свойстве priority заметки
         * Возвращает: новый массив заметок с подходящим приоритетом
         */
        let newArr = [];

        for (let i = 0; i < this['notes'].length; i += 1) {
            if (this.notes[i]['priority'] === priority) {
                newArr.push(this.notes[i])
            }
        }
        return newArr
    }
};


/*
 * Добавляю 4 заметки и смотрю что получилось
 */
notepad.saveNote({
    id: 'id-1',
    title: 'JavaScript essentials',
    body: 'Get comfortable with all basic JavaScript concepts: variables, loops, arrays, branching, objects, functions, scopes, prototypes etc',
    priority: Priority.HIGH,
});

notepad.saveNote({
    id: 'id-2',
    title: 'Refresh HTML and CSS',
    body: 'Need to refresh HTML and CSS concepts, after learning some JavaScript. Maybe get to know CSS Grid and PostCSS, they seem to be trending.',
    priority: Priority.NORMAL,
});

notepad.saveNote({
    id: 'id-3',
    title: 'Get comfy with Frontend frameworks',
    body: 'First must get some general knowledge about frameworks, then maybe try each one for a week or so. Need to choose between React, Vue and Angular, by reading articles and watching videos.',
    priority: Priority.NORMAL,
});

notepad.saveNote({
    id: 'id-4',
    title: 'Winter clothes',
    body: "Winter is coming! Need some really warm clothes: shoes, sweater, hat, jacket, scarf etc. Maybe should get a set of sportwear as well so I'll be able to do some excercises in the park.",
    priority: Priority.LOW,
});

console.log('Все текущие заметки: ', notepad.getNotes());

/*
 * Зима уже близко, пора поднять приоритет на покупку одежды
 */
notepad.updateNotePriority('id-4', Priority.NORMAL);

console.log(
    'Заметки после обновления приоритета для id-4: ',
    notepad.getNotes(),
);

/*
 * Решил что фреймворки отложу немного, понижаю приоритет
 */
notepad.updateNotePriority('id-3', Priority.LOW);

console.log(
    'Заметки после обновления приоритета для id-3: ',
    notepad.getNotes(),
);

/*
 * Решил отфильтровать заметки по слову html
 */
console.log(
    'Отфильтровали заметки по ключевому слову "html": ',
    notepad.filterNotesByQuery('html'),
);

/*
 * Решил отфильтровать заметки по слову javascript
 */
console.log(
    'Отфильтровали заметки по ключевому слову "javascript": ',
    notepad.filterNotesByQuery('javascript'),
);

/*
 * Хочу посмотреть только заметки с нормальным приоритетом
 */
console.log(
    'Отфильтровали заметки по нормальному приоритету: ',
    notepad.filterNotesByPriority(Priority.NORMAL),
);

/*
 * Обновим контент заметки с id-3
 */
notepad.updateNoteContent('id-3', {
    title: 'Get comfy with React.js or Vue.js',
});

console.log(
    'Заметки после обновления контента заметки с id-3: ',
    notepad.getNotes(),
);

/*
 * Повторил HTML и CSS, удаляю запись c id-2
 */
notepad.deleteNote('id-2');
console.log('Заметки после удаления с id -2: ', notepad.getNotes());