const quiz = (function() {

    let alert = '';

    const questions = [
        {
            body: 'Do you like cats?',
            answers: ['No', 'Yes'],
            right: 'Yes'
        },
        {
            body: 'What cats do you like?',
            answers: ['All', 'Red', 'Black'],
            right: 'All'
        },
        {
            body: 'Do you have a cat?',
            answers: ['Surely', 'No', 'Not at any price'],
            right: 'Surely'
        }
    ];

    function init() {
        for (let i = 0; i < questions.length; i++) {
            singleQuestion(i);
            getAnswer();
            switch(checkQuestion(i)) {
                case -1:
                   return this;
                case 0:
                    i = -1;
                    console.log('You are wrong. Try again'+'\n~~~~~~~~~~~~~~~~~~~');
                    break;
                case 1:
                    console.log('Right answer! \nYour result is ' + (i + 1)+'\n~~~~~~~~~~~~~~~~~~~');
                    break;
            }
        }
        console.log('Congrats!');
        return this;
    }

    function getAnswer() {
        alert = prompt('Your answer', '');
        return this;
    }

    function singleQuestion(index) {
        console.log(questions[index]['body']);
        for (let j = 0; j < questions[index]['answers'].length; j++) {
            console.log(j + ': ' + questions[index]['answers'][j]);
        }
    }

    function checkQuestion(index) {
        var res = 0;
        if (alert === 'stop') {
            res = -1;
        } else if (alert === ''
            || typeof Number(alert) !== 'number'
            || Number(alert) < 0
            || Number(alert) >= questions[index]['answers'].length
            || (questions[index]['answers'][Number(alert)] !== questions[index]['right'])) {
            res = 0;
        } else {
            res = 1;
        }
        return res;
    }

    return {
        init,
        getAnswer,
        singleQuestion,
        checkQuestion
    }

})();

quiz.init();
