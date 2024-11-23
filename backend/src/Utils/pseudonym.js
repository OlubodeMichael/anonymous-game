function generatePseudonym() {
    const adjectives = ['Brave', 'Clever', 'Silent', 'Mysterious', 'Swift'];
    const nouns = ['Fox', 'Eagle', 'Wolf', 'Owl', 'Panther'];
    return `${adjectives[Math.floor(Math.random() * adjectives.length)]} ${nouns[Math.floor(Math.random() * nouns.length)]}`;
}

module.exports = { generatePseudonym };
// working ??
