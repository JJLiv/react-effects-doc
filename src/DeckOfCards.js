import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "./Card";
//https://deckofcardsapi.com/api/deck/new/draw/?count=1
//https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1

const DECK_API_URL = 'https://deckofcardsapi.com/api/deck/'


const DeckOfCards = () => {
    const [deck, setDeck] = useState(null);
    const [card, setCard] = useState([]);
    const [isShuffling, setIsShuffling] = useState(false);
    
    
    
    useEffect(() => {
        async function getCards(){
        let resp = await axios.get(`${DECK_API_URL}/new/shuffle`)
        .then(res => res.data);
        console.log(resp);
        setDeck(resp);
        }
        getCards();
    }, [])
    
    async function draw() {
        try{
        let drawResp = await axios.get(`${DECK_API_URL}/${deck.deck_id}/draw/`);
        if (drawResp.data.remaining === 0) throw new Error("Deck empty!");
        
        const card = drawResp.data.cards[0];
        setCard(d => [
            ...d,
            {
                id: card.code,
                value: card.value,
                suit: card.suit,
                img: card.image,
            }
        ])

        } catch(err){
            alert(err);
        }


    }

    async function shuffleDeck(){
        setIsShuffling(true);
        let shuffleResp = await axios.get(`${DECK_API_URL}/${deck.deck_id}/shuffle/`)
        .then(res => res.data);
        setDeck(shuffleResp);
        setCard([]);
    }

    return (
        <>
        <div>
            {card.map(c => (
                <Card key={c.id} value={c.value} suit={c.suit} img={c.img} />
            ))}
            <button onClick={draw}>Click For Card</button>
        </div>
        <div>
            <button onClick={shuffleDeck}> Shuffle Deck</button>
            
        </div>
        </>
    );
};


export default DeckOfCards;