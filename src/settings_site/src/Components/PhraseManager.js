import React from "react";

const phrases = [
    { phrase: "As long as we've got the determination, we can do anything!", imageURL: "https://static.wikia.nocookie.net/madmanroberto123-fanfiction/images/e/e8/Honoka_Kousaka.jpg" },
    { phrase: "I'll do my best no matter what. I won't give up on saving our school. I'll make it happen!!", imageURL: "https://www.gamemaps.com/img/addons/l4d2/ss/honoka_kousaka_voice_for_zoey_20466_0.jpg" }
];

class PhraseDisplay extends React.Component {
    render() {
        const toRenderPhrase = phrases[Math.ceil((Math.random() * phrases.length)) - 1]
        return (
            <React.Fragment>
                <img alt='phrase-author' src={toRenderPhrase.imageURL} />
                <span>{toRenderPhrase.phrase}</span>
            </React.Fragment>);
    }
}

export default PhraseDisplay;