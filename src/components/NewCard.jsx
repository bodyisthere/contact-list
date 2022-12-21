import React from 'react'
import ReactInputMask from 'react-input-mask';

import './New-card.scss'
import { nameValidation, phoneValidation } from '../utils/validation';

export function NewCard({setIsPopOpen, setCards, cards}) {

    const [name, setName] = React.useState('');
    const [phone, setPhone] = React.useState('');
    const [isFav, setIsFav] = React.useState(false);

    const [nameError, setNameError] = React.useState(false);
    const [phoneError, setPhoneError] = React.useState(false);

    const checkbox = React.useRef(null)

    const addContact = () => {
        const nV = nameValidation(name);
        const pV = phoneValidation(phone);

        if(!nV || !pV) {
            if(!nV) {setNameError(true)} else {setNameError(false)}
            if(!pV) {setPhoneError(true)} else {setPhoneError(false)}
            return;
        }

        if(nV) setNameError(false);
        if(pV) setPhoneError(false);

        let body = JSON.parse(localStorage.getItem("contacts"));
        body.push({
            id: Date.now(),
            name,
            phone,
            isFav: isFav,
        });
        body = body.sort((a, b) => a.name > b.name ? 1 : -1);
        let favs = body.filter(el => el.isFav === true);
        body = body.filter(el => el.isFav !== true);
        body.unshift(...favs);
        setCards(body);

        setName('');
        setPhone('');
        localStorage.setItem("contacts", JSON.stringify(body));
        setIsPopOpen(false);
    }

    return (
        <div className="new-card">
            <div className="new-card__content">
                <div className="new-card__close" onClick={() => setIsPopOpen(false)}><i className="fa-solid fa-xmark"></i></div>
                <div className="new-card__title">Добавить контакт</div>
                <div className="new-card__fields">
                    <div className="new-card__field">
                        <label htmlFor="inp">Имя</label>
                        <input type="text" id="inp" className={`new-card__input ${nameError ? 'new-card__input--error' : '321'}`} value={name} onChange={e => setName(e.target.value)}/>
                        {nameError ? <p className='new-card__text-error'>поле имя не может содержать: 0-9~@#$%^-_(){} </p> : ''}
                    </div>
                    <div className="new-card__field">
                        <label htmlFor="inp2">Номер</label>
                        <ReactInputMask 
                            placeholder='+7 999 999 99 99' 
                            id="inp2" 
                            className={`new-card__input ${phoneError ? 'new-card__input--error' : '321'}`} 
                            mask="+7 999 999 99 99" 
                            maskChar=" " 
                            value={phone} 
                            onChange={e => setPhone(e.target.value)}
                        />
                        {phoneError ? <p className='new-card__text-error'>заполните телефон корректно</p> : ''}
                    </div>
                    <div className="new-card__field-checkbox">
                        <input type="checkbox" id="inp3" ref={checkbox} onClick={() => setIsFav(!isFav) }/>
                        <label htmlFor="inp3">В избранное</label>
                    </div>
                </div>
                <button className="new-card__add" onClick={addContact}>Создать</button>
            </div>
        </div>
    )
}