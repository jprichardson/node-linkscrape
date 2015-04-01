var assert = require('assert')
var fs = require('fs')
var linkscrape = require('../')

/* global describe, it */

describe('+ linkscrape()', function () {
  it('should return the parsed links from a page', function (done) {
    fs.readFile('./test/resources/testfile.html', function (err, data) {
      assert.ifError(err)
      linkscrape('http://someserver.com/mypage', data.toString(), function (links, $) {
        assert(links.length === 7)

        assert(links[0].href === 'http://google.com')
        assert(links[0].text === 'Google')
        assert(links[0].html === '<b>Google</b>')
        assert(links[0].element != null)
        assert(links[0].link === 'http://google.com')

        assert(links[1].href === '#wat')
        assert(links[1].text === 'Link in page')
        assert(links[1].html === 'Link in page')
        assert(links[1].element != null)
        assert(links[1].link === null)
        assert($(links[1].element).attr('class') === 'pretty')

        assert(links[2].href === "javascript:alert('hi');")
        assert(links[2].text === 'hi')
        assert(links[2].html === 'hi')
        assert(links[2].element != null)
        assert(links[2].link === null)

        assert(links[3].href === "alert('hello')")
        assert(links[3].text === 'hello')
        assert(links[3].html === 'hello')
        assert(links[3].element != null)
        assert(links[3].link === null)

        assert(links[4].href === '/faq/questions')
        assert(links[4].text === 'Faq')
        assert(links[4].html === 'Faq')
        assert(links[4].element != null)
        assert(links[4].link === 'http://someserver.com/faq/questions')

        assert(links[5].href === 'aboutus')
        assert(links[5].text === 'About Us')
        assert(links[5].html === 'About Us')
        assert(links[5].element != null)
        assert(links[5].link === 'http://someserver.com/aboutus')

        assert(links[6].href === undefined)
        assert(links[6].text === 'Something')
        assert(links[6].html === 'Something')
        assert(links[6].element != null)
        assert(links[6].link === null)
        done()
      })
    })
  })
})
