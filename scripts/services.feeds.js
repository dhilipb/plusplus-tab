var limit = 10;
var App = angular.module('App')
    .service('Feed', function(Retriever, Screenshot, $localStorage) {
        var Feed = {};
        Feed.HackerNews = function(source, posts) {
            // Check for fallback
            if (void 0 == posts[0]['image']) {
                Feed.HackerNews_Fallback(source, posts);
                return;
            }

            count = 0;
            for (p in posts) {
                if (count++ == limit) {
                    return;
                }

                var post = posts[p];
                if (post.image.indexOf("url=http") < 0) {
                    post.image = Screenshot.placeholder();
                }

                $localStorage.posts.push({
                    'source': source,
                    'url': post.url,
                    'votes': post.upVotes,
                    'title': post.title,
                    'comments': {
                        'count': post.comments_count,
                        'link': post.comments_link
                    },
                    'image': post.image
                });
            }
        };


        Feed.HackerNews_Fallback = function(source, posts) {
            count = 0;
            for (p in posts) {

                var post = posts[p];
                var url = is.startWith(post.url, 'item?id=') ? 'https://news.ycombinator.com/item?id=' + post.id : post.url;

                if (post.type != 'link') {
                    continue;
                }
                if (count++ == limit) {
                    return;
                }

                $localStorage.posts.push({
                    'source': 'HackerNews',
                    'url': url,
                    'votes': post.points,
                    'title': post.title,
                    'user': post.domain,
                    'comments': {
                        'count': post.comments_count,
                        'link': 'https://news.ycombinator.com/item?id=' + post.id
                    },
                    'image': Screenshot.get(url)
                });
            }
        };

        Feed.ProductHunt = function(source, posts) {
            count = 0;
            for (p in posts.posts) {
                if (count++ == limit) {
                    return;
                }

                var post = posts.posts[p];

                $localStorage.posts.push({
                    'source': source,
                    'url': post.redirect_url,
                    'votes': post.votes_count,
                    'title': post.name,
                    'description': post.tagline,
                    'user': post.user.name,
                    'comments': {
                        'count': post.comments_count,
                        'link': post.discussion_url
                    },
                    'image': post.screenshot_url['300px']
                });
            }
        };

        Feed.Reddit = function(source, posts) {
            count = 0;

            for (p in posts.data.children) {
                if (count++ == limit) {
                    return;
                }

                var post = posts.data.children[p].data;
                var index = $localStorage.posts.length;
                var title = unescape(post.title.length > 120 ? post.title.substring(0, 115) + "..." : post.title);
                title = title.replace(/&amp;/g, '&');

                $localStorage.posts.push({
                    'source': source,
                    'url': post.url,
                    'votes': post.ups,
                    'title': title,
                    'user': post.domain,
                    'comments': {
                        'count': post.num_comments,
                        'link': "http://reddit.com" + post.permalink
                    },
                    'image': Screenshot.get(post.url)
                });
            }
        };

        Feed.DesignerNews = function(source, posts) {
            count = 0;
            for (p in posts.stories) {
                if (count++ == limit) {
                    return;
                }

                var post = posts.stories[p];

                $localStorage.posts.push({
                    'source': source,
                    'url': post.url,
                    'votes': post.vote_count,
                    'title': post.title,
                    'user': post.submitter_display_name,
                    'comments': {
                        'count': post.num_comments,
                        'link': 'https://news.layervault.com/stories/' + post.id
                    },
                    'image': Screenshot.get(post.url)
                });
            }
        };

        return Feed;
    });
