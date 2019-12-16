export default {

    GAMES : {
        INIT: GenerateApiUrl('games'),
        NEW_GAME: GenerateApiUrl('games/new'),
        EVALUATE: GenerateApiUrl('games/evaluate')
    },
}

function GenerateApiUrl(postUrl) {
    return '/v1/' + postUrl;
}