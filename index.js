var sentiment = require('sentiment');
var _ = require('lodash');
var nlp = require('compromise');
var wordcount = require('word-count')
var fleschKincaid = require('flesch-kincaid');
var syllable = require('syllable');
var flesch = require('flesch');

const quotes = [
    {
        quote: 'Don\'t cry because it\'s over, smile because it happened.',
        person: 'Dr. Seuss'
    },
    {
        quote: 'I\'m selfish, impatient and a little insecure. I make mistakes, I am out of control and at times hard to handle. But if you can\'t handle me at my worst, then you sure as hell don\'t deserve me at my best.',
        person: 'Marilyn Monroe'
    },
    {
        quote: 'Two things are infinite: the universe and human stupidity; and I\'m not sure about the universe.',
        person: 'Albert Einstein'
    },
    {
        quote: 'A room without books is like a body without a soul.',
        person: 'Marcus Tullius Cicero'
    },
    {
        quote: 'Be the change that you wish to see in the world.',
        person: 'Mahatma Gandhi'
    },
    {
        quote: 'If you tell the truth, you don\'t have to remember anything.',
        person: 'Mark Twain'
    },
];

var getAnalysis = function(quote) {
    var data = {};
    data.quote = quote;

    data.sentimentResults = sentiment(quote.quote);
    data.wcount = wordcount(quote.quote);
    var doc = nlp(quote.quote);
    data.sentenceCount = doc.sentences().out('array').length;
    data.syllableCount = syllable(quote.quote);
    data.flesch = flesch({
        sentence: data.sentenceCount,
        word: data.wcount,
        syllable: data.syllableCount
    });

    data.fleschKincaid = fleschKincaid({
        sentence: data.sentenceCount,
        word: data.wcount,
        syllable: data.syllableCount
    });

    return data;
};

console.log("Quote Sentiment Analysis...");
console.log("-------------------------------------");
console.log("");

_.forEach(quotes, function(quote) {
    
    const data = getAnalysis(quote);

    console.log(quote.quote);
    console.log("---  " + quote.person);
    console.log("");
    console.log("Word count: " + data.wcount);
    console.log("Sentence count: " + data.sentenceCount);
    console.log("Syllable count: " + data.syllableCount);
    console.log("");
    console.log("Sentiment....");
    console.log("score: " + data.sentimentResults.score + " comparative: " + data.sentimentResults.comparative);
    console.log("");
    console.log("Flesch score: " + data.flesch);
    console.log("");
    console.log("Flesch-Kincaid score: " + data.fleschKincaid);
    console.log("");
    console.log("-------------------------------------");
    console.log("");
});