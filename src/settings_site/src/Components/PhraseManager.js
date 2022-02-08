import React from "react";

const phrases = [
    { phrase: "As long as we've got the determination, we can do anything!", author: "Honoka Kousaka" },
    { phrase: "I'll do my best no matter what. I won't give up on saving our school. I'll make it happen!!", author: "Honoka Kousaka" }
];

class PhraseDisplay extends React.Component {
    render() {
        const toRenderPhrase = phrases[Math.ceil((Math.random() * phrases.length)) - 1]
        return (
            <React.Fragment>
                <span>
                    <strong>{toRenderPhrase.phrase}</strong>
                    <i>~ {toRenderPhrase.author}</i>
                </span>
            </React.Fragment>);
    }
}

export default PhraseDisplay;