import React from 'react';

class Cards extends React.Component {
    toggleCard = (c) => {
        if (!c.opened && !c.scored) {
            this.props.toggleCardHandler(c);
        }
    }
    render() {
        return (
            <div className="cards">
            { this.props.cards.map((c,i) => {
                // let imgUrl = `images/pojmovi/${c.image}`;
                return (
                    <div 
                        onClick={() => {this.toggleCard(c)}}
                        className="cards--wrapper" 
                        key={c.image+i}
                    >
                        <div 
                            className={`cards--wrapper-inner ${c.opened ? 'cards--wrapper-inner-rotate' : ''}`}
                        >
                            <div className="cards--front">
                            </div>
                            <div className={`cards--back`} style={{backgroundImage: `url(${(c.opened || c.revealed) ? c.image : ''})`}}>
                            </div>
                        </div>
                    </div>             
                );
            })
            }
            </div>
        );
    }
}

export default Cards;