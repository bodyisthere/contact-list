import React from "react";

import "./App.scss";
import { Cards } from "./components/Cards.jsx";
import { NewCard } from "./components/NewCard";
import { Input } from "./components/Input";

function App() {
  const [cards, setCards] = React.useState([]);
  const [isPopOpen, setIsPopOpen] = React.useState(false);

  React.useEffect(() => {
    if(localStorage.getItem("contacts")) return setCards(JSON.parse(localStorage.getItem("contacts")));
    localStorage.setItem("contacts", []);
  }, [])

  const toggleLike = (id) => {
    let body = JSON.parse(localStorage.getItem("contacts"));
    const contact = body.filter(el => el.id === id);
    body = body.filter(el => el.id !== id);
    if(contact[0].isFav) {
      contact[0].isFav = false;
      body.push(...contact);
      localStorage.setItem("contacts", JSON.stringify(body));
    } else {
      contact[0].isFav = true;
      body.unshift(...contact);
      localStorage.setItem("contacts", JSON.stringify(body));
    }
    setCards(JSON.parse(localStorage.getItem("contacts")));
  }

  return (
  <div className="App">
    <div className="phone">
      {isPopOpen ? <NewCard setIsPopOpen={setIsPopOpen} cards={cards} setCards={setCards}/> : ''}
      <Input cards={cards} setCards={setCards}/>
      <Cards cards={cards} setCards={setCards} toggleLike={toggleLike}/>
      <button className="phone__add" onClick={() => setIsPopOpen(true)}>Добавить</button>
    </div>
  </div>
  )
}

export default App;
