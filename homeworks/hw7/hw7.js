// 1. По нажатию на кнопку 'btn-msg' должен появиться алерт с текстом кнопки

document.addEventListener('DOMContentLoaded', function () {
    const showBtn = document.querySelector('#btn-msg');
    const item = document.querySelector('#tag');

    showBtn.addEventListener('click', function() {
        const mesText = showBtn.textContent;
        const template = `
        <div class="alert alert-info">${mesText}</div>
    `;
        let old = document.querySelector('.alert');
        if (old) old.remove();

        showBtn.insertAdjacentHTML('afterend', template);
    });

    // 2. При наведении указателя мыши на 'btn-msg' кнопка становится красной; когда указатель мыши покидает кнопку, она становится прежнего цвета.

    showBtn.onmouseover = function () {
        showBtn.style.backgroundColor = 'red';
    };
    showBtn.onmouseout = function () {
         showBtn.style.backgroundColor = '';
    };

    // 3. При нажатии на любой узел документа показать в элементе с id=tag имя тега нажатого элемента

    document.addEventListener('click', function(evn) {
        let getName = evn.target.tagName;
        const template = `
        <span class="tagname"> ${getName}</span>
      `;
        const currentTag = document.querySelector('.tagname');
        if (currentTag) currentTag.remove(); // если есть алерт то его удаляем

        item.insertAdjacentHTML('afterend', template);
    });

    // Дан массив
// [
// {'лето': 'одень футболку и шорты'}, {'осень': 'одень куртку и штаны'}, {'зима': 'одень шубу и теплые штаны'}, {'весна': 'одень ветровку и джинсы'}
// ]
// Сделать форму с select, в которой option будут соответствовать временам года из массива. При выборе определенного option установить в input type=text соответствующую времени года строку.

    let seasons = [
        {'лето': 'одень футболку и шорты'},
        {'осень': 'одень куртку и штаны'},
        {'зима': 'одень шубу и теплые штаны'},
        {'весна': 'одень ветровку и джинсы'}
    ];

    const sel = document.forms.seasons.elements['selectName'];
    const seasonAct = document.forms.seasons.elements['targetInput'];
    seasonAct.value = seasons[0][sel.value];

    sel.addEventListener('change', function() {
        for (let i=0; i <= seasons.length; i++) {
            if(seasons[i][sel.value]){
                seasonAct.value = seasons[i][sel.value];
                break;
            }
        }
    })

});

