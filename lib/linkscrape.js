var cheerio = require('cheerio')
    , url = require('url');

function extractLinks(pageUrl, pageHtml, callback) {
    var $ = cheerio.load(pageHtml)
        , links = []
        , parsedUrl = url.parse(pageUrl)

    $('a').each(function (i, el) {
        var absoluteUrl = normalizeLink(parsedUrl, $(el).attr('href'))
            , link = {};

        link.text = $(el).text();
        link.html = $(el).html();
        link.href = $(el).attr('href');
        link.element = el;
        link.link = absoluteUrl;
        links.push(link);
    })

    callback(links, $);
}

function normalizeLink(parsedUrl, scrapedHref) {
    if (!scrapedHref || !parsedUrl) return null
    if (scrapedHref.indexOf('javascript:') === 0) return null
    if (scrapedHref.indexOf('#') === 0) return null

    var scrapedUrl = url.parse(scrapedHref);
    if (scrapedUrl.host != null) return scrapedHref;
    if (scrapedHref.indexOf('//') === 0) return parsedUrl.protocol + scrapedHref;
    if (scrapedHref.indexOf('/') === 0) return parsedUrl.protocol + '//' + parsedUrl.host + scrapedHref;
    if (scrapedHref.indexOf('(') > 0 && scrapedHref.indexOf(')') > 0) return null;

    var pos = parsedUrl.href.lastIndexOf("/");
    if (pos >= 0) {
        var surl = parsedUrl.href.substring(0, pos + 1);
        return surl + scrapedHref;
    } else {
        return parsedUrl.href + "/" + scrapedHref;
    }
}

module.exports = extractLinks

