var testutil = require('testutil')
  , fs = require('fs')
  , linkscrape = require('../lib/linkscrape')
  , cheerio = require('cheerio');

describe('+ linkscrape()', function() {
  it('should return the parsed links from a page', function(done) {
    fs.readFile('./test/resources/testfile.html', function(err, data) {
      linkscrape('http://someserver.com/mypage', data.toString(), function(links, $) {
        T (links.length === 7);
        
        T (links[0].href === 'http://google.com');
        T (links[0].text === 'Google');
        T (links[0].html === '<b>Google</b>');
        T (links[0].element != null);
        T (links[0].link === 'http://google.com');
        
        T (links[1].href === '#wat');
        T (links[1].text === 'Link in page');
        T (links[1].html === 'Link in page');
        T (links[1].element != null);
        T (links[1].link === null);
        T ($(links[1].element).attr('class') === 'pretty');
        
        T (links[2].href === "javascript:alert('hi');");
        T (links[2].text === 'hi');
        T (links[2].html === 'hi');
        T (links[2].element != null);
        T (links[2].link === null);
        
        T (links[3].href === "alert('hello')");
        T (links[3].text === 'hello');
        T (links[3].html === 'hello');
        T (links[3].element != null);
        T (links[3].link === null);
        
        T (links[4].href === "/faq/questions");
        T (links[4].text === 'Faq');
        T (links[4].html === 'Faq');
        T (links[4].element != null);
        T (links[4].link === 'http://someserver.com/faq/questions');
        
        T (links[5].href === "aboutus");
        T (links[5].text === 'About Us');
        T (links[5].html === 'About Us');
        T (links[5].element != null);
        T (links[5].link === 'http://someserver.com/aboutus');
        
        T (links[6].href === undefined);
        T (links[6].text === 'Something');
        T (links[6].html === 'Something');
        T (links[6].element != null);
        T (links[6].link === null);
        done()
      })
    })
  })
})


