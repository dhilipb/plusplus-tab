var Sources = {
    'HackerNews': {
    	'url': 'http://producthunter.awesome.io/hn.json',
    	'fallback': 'http://node-hnapi.herokuapp.com/news',
        'logo': 'images/hackernews.png',
        'lastFetched': 0,
        'loading': false,
        'enabled': true
    },
    'ProductHunt': {
    	'url': 'https://api.producthunt.com/v1/posts/?days_ago=0',
    	'auth': 'OAuth',
        'logo': 'images/producthunt.png',
        'lastFetched': 0,
        'loading': false,
        'enabled': true
    },
    'Reddit': {
    	'url': 'http://www.reddit.com/r/technology.json',
        'logo': 'images/reddit.png',
        'lastFetched': 0,
        'loading': false,
        'enabled': true
    },
    // 'Reddit Gunners': {
    // 	'url': 'http://www.reddit.com/r/Gunners/new.json',
    //     'logo': 'images/gunners.png',
    //     'loading': false,
    //     'enabled': true
    // },
    'DesignerNews': {
    	'url': 'https://news.layervault.com/?format=json',
        'logo': 'images/designernews.png',
        'lastFetched': 0,
        'loading': false,
        'enabled': true
    }
};
