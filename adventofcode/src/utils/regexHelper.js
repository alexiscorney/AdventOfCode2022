function matchAfterPhrase(str, phrase) {
    var regExp = new RegExp(phrase+`(.*)`);
    return str.match(regExp);
}

function matchBetweenPhrases(str, phrase1, phrase2) {
    var regExp = new RegExp(phrase1+`(.*?)`+phrase2);
    return str.match(regExp)[1];
}

module.exports = { matchAfterPhrase, matchBetweenPhrases }