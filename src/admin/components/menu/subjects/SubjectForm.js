import React from 'react';
import axios from 'axios';

const SUBJECT_URL = 'http://localhost:3001/api/v1/subject/';

const SubjectForm = ( { subjects, findSubject, action, createMessage, addSubject, name, base } ) => {

    const input_field = document.querySelector('input#name');
    const mes = document.querySelector('.message');

    // нажатие на кнопку добавления предмета
    const postSubject = (event) => {
        event.preventDefault();
        const new_subject = event.target.name.value;
        mes.style.color = 'red';
        if (new_subject === "") {
            createMessage("Заполните поле!")
            input_field.focus();
        }
        else {
            if (findSubject(new_subject).length !== 0){
                input_field.focus();
                createMessage("Данный предмет существует!");
            }
            else {
                input_field.value = "";
                axios.post(SUBJECT_URL, {subject: {name: new_subject}});
                mes.style.color = 'green';
                createMessage("Учебный предмет добавлен успешно!");
                addSubject([...subjects, {name: new_subject}])
            }
        };
        setTimeout(() => {
            createMessage("");
            input_field.blur();
        }, 5000);
    };

    // нажатие на кнопку обновления предмета
    const updateSubject = (event) => {
        event.preventDefault();
        const update_subject = event.target.name.value;
        const subject_id = event.target.subject_id.value;
        mes.style.color = 'red';
        if (update_subject === "") {
            createMessage("Заполните поле!");
            input_field.focus();
        }
        else {
            subjects.map( item => item.name == name ? item.name = update_subject : item);
            input_field.value = "";
            axios.patch(SUBJECT_URL + `${subject_id}`, {subject: {name: update_subject}});
            mes.style.color = 'green';
            createMessage("Учебный предмет обновлен успешно!");
            base();
        }
        setTimeout(() => {
            createMessage("");
            input_field.blur();
        }, 5000);
        // subjects.map(item => item.id == event.target.update.id ? item.name = event.target.update.value : item);
    };

    // нажатие на кнопку "Отмена"
    const cancel = (event) => {
        event.preventDefault();
        input_field.value = "";
        document.querySelector("#update_subject_id").value = "";
        base();
    };

    return (
        <>
            <form className='subject-form' onSubmit={ action == 'enter' ? postSubject : updateSubject}>
                <label>Наименование</label>
                <input type={'hidden'} name='subject_id' id='update_subject_id' />
                <input type="text" id='name' />
                <div className='buttons'>
                    <input type="submit" value={action == 'enter' ? 'Добавить' : "Обновить"} id='submit'/>
                    { action === 'update' ? <button onClick={cancel} >Отменить</button> : <></> }
                </div>
            </form>
        </>
    )
};

export default SubjectForm;
