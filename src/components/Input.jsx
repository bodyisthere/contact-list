import React from "react";

export function Input( {cards, setCards}) {
    const [searchContact, setSearchContact] = React.useState('');

    const searchCard = () => {
        const regExp = new RegExp(`${searchContact}`, 'gi');
        setCards(JSON.parse(localStorage.getItem("contacts")).filter(el => regExp.test(el.name)));
    }

    React.useEffect(() => {
      if(searchContact.length === 0) setCards(JSON.parse(localStorage.getItem("contacts")))
    }, [searchContact])

    const sort = () => {
      let body = JSON.parse(localStorage.getItem("contacts"));
      body = body.sort((a, b) => a.name > b.name ? 1 : -1);
      let favs = body.filter(el => el.isFav === true);
      body = body.filter(el => el.isFav !== true);
      body.unshift(...favs);
      setCards(body);
      localStorage.setItem("contacts", JSON.stringify(body));
    }

    return (
        <div className="phone__top">
        <div className="phone__icon"><i className="fa-solid fa-phone"></i></div>
        <div className="phone__input">
          <div className="phone__search"><i className="fa-solid fa-magnifying-glass"></i></div>
          <input type="text" id="" onChange={e => {setSearchContact(e.target.value); searchCard()}}/>
        </div>
        <div className="phone__sort"><i className="fa-solid fa-sort" title="Сортировать по алфавиту" onClick={sort}></i></div>
      </div>
    )
}