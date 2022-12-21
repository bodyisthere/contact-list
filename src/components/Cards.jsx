import { Card } from "./Card"

export function Cards( {cards, setCards, toggleLike} ) {
    return (
        <div className="phone__list">
            {cards.length
            ?
            cards.map((el, index) => {
                return <Card {...el} key={index} setCards={setCards} cards={cards} toggleLike={toggleLike}/>
            })
            :
            <div className="phone__no-items">У вас пока нет добавленных контактов...</div> }
        </div>
    )
}