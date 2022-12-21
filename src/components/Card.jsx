import './Card.scss'

export  function Card( { name, phone, isFav, id, setCards, cards, toggleLike } ) {

    const deleteCard = () => {
        const body = JSON.parse(localStorage.getItem("contacts")).filter(el => el.id !== id);
        setCards(body);
        localStorage.setItem("contacts", JSON.stringify(body));
    }

    return (
        <div className="card">
            <div className="card__avatar"></div>
            <div className="card__text">
                <div className="card__name">{name}</div>
                <div className="card__number">{phone}</div>
            </div>
            <div className="card__buttons">
                <button title='Удалить' className="card__delete" onClick={deleteCard}><i className="fa-solid fa-xmark"></i></button>
                <button title='В избранное' onClick={() => toggleLike(id)} className="card__like"><i className={`fa-regular fa-heart ${isFav ? 'card__like--active' : ''}`}></i></button>
            </div>
        </div>
    )
}
