cheerio = require('cheerio')
url = require('url')

extractLinks = (pageUrl, pageHtml, callback) ->
  $ = cheerio.load(pageHtml); links = []; parsedUrl = url.parse(pageUrl)
  $('a').each (i, el) ->
    absoluteUrl = normalizeLink(parsedUrl, $(el).attr('href'))
    link = {}
    link.text = $(el).text()
    link.html = $(el).html()
    link.href = $(el).attr('href')
    link.element = el
    link.link = absoluteUrl
    links.push link
  callback($, links)

normalizeLink = (parsedUrl, scrapedHref) ->
  if scrapedHref.indexOf('javascript:') is 0
    return null
  if scrapedHref.indexOf('#') is 0
    return null

  scrapedUrl = url.parse(scrapedHref)
  if scrapedUrl.host? #is absolute
    return scrapedHref
  else
    if scrapedHref.indexOf('/') is 0
      return parsedUrl.protocol + '//' + parsedUrl.host + scrapedHref
    else
      if scrapedHref.indexOf('(') > 0 and scrapedHref.indexOf(')') > 0 #crappy JavaScript detection
        return null
      else
        pos = parsedUrl.href.lastIndexOf("/")
        surl = ""
        if pos >= 0
          surl = parsedUrl.href.substring(0, pos + 1)
          return surl + scrapedHref
        else
          return parsedUrl.href + "/" + scrapedHref
  return null

module.exports = extractLinks
