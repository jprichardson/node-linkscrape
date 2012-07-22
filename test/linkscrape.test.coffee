testutil = require('testutil')
fs = require('fs')
P = require('autoresolve')
scrape = require(P('lib/linkscrape'))
cheerio = require('cheerio')

describe '+ linkscrape()', ->
  it 'should return the parsed links from a page', (done) ->
    fs.readFile P('test/resources/testfile.html'), (err, data) ->
      scrape 'http://someserver.com/mypage', data.toString(), ($, links) ->
        T links.length is 6

        T links[0].href is 'http://google.com'
        T links[0].text is 'Google'
        T links[0].html is '<b>Google</b>'
        T links[0].element?
        T links[0].link is 'http://google.com'

        T links[1].href is '#wat'
        T links[1].text is 'Link in page'
        T links[1].html is 'Link in page'
        T links[1].element?
        T links[1].link is null
        T $(links[1].element).attr('class') is 'pretty'

        T links[2].href is "javascript:alert('hi');"
        T links[2].text is 'hi'
        T links[2].html is 'hi'
        T links[2].element?
        T links[2].link is null

        T links[3].href is "alert('hello')"
        T links[3].text is 'hello'
        T links[3].html is 'hello'
        T links[3].element?
        T links[3].link is null

        T links[4].href is "/faq/questions"
        T links[4].text is 'Faq'
        T links[4].html is 'Faq'
        T links[4].element?
        T links[4].link is 'http://someserver.com/faq/questions'

        T links[5].href is "aboutus"
        T links[5].text is 'About Us'
        T links[5].html is 'About Us'
        T links[5].element?
        T links[5].link is 'http://someserver.com/aboutus'

        done()

