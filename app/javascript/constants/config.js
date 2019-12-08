export default {
  defaultPath: "/",
  baseName: "/",
  timeLimit: "00:03:00", // The time interval of the game
  minLetters: 3, // Mininum number of letters required to submit
  gamePlay: {
    // You can toggle the game play settings here,
    diagonal: true, // On-Off diagonal word matching
    vertical: true, // On-Off Vertical word matching
    horizontal: true // On-Off horizonal word matching
  },
  wordTypes: {
    nouns: true,
    verbs: true,
    adjectives: true,
    adverbs: true,
    properNouns: false // Words like Smith, Ohio, France are not allowed
  }
};
