export default {

    GAMES : {
        INIT: GenerateApiUrl('games'),
        NEW_GAME: GenerateApiUrl('games/new'),
        CROSS_CHECK: GenerateApiUrl('games/crosscheck'),
        SCORES: GenerateApiUrl('games/evaluate')
    },
}

function GenerateApiUrl(postUrl) {
    return '/v1/' + postUrl;
}