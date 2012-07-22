Node.js - linkscrape
=====================
 
This module allows scrapes links from an HTML string and normalizes them. It does not actually perform the HTTP request. Use [superagent][1] or [request][2] for that.


Installation
------------

    npm install linkscrape



Example
-------

HTML string:
```html
<html>
  <head>
    <title>
      Test File
    </title>
  </head>
  <body>
    <p id="wat">
      <a href="http://google.com"><b>Google</b></a>
    </p>
    <p>
      <a href="#wat" class="pretty">Link in page</a>
      <a href="javascript:alert('hi');">hi</a>
      <a href="alert('hello')">hello</a>
      <a href="/faq/questions">Faq</a>
      <a href="aboutus">About Us</a>
    </p>
  </body>
</html>
```

You must pass in the URL (of where the HTML string came from) to the `scrape()` method so that it can normalize the links.

```javascript
var scrape = require('linkscrape');

scrape('http://someserver.com/mypage', htmlString, function($, links){
    console.log(links.length);// is 6

    console.log(links[0].href); //is 'http://google.com'
    console.log(links[0].text); //is 'Google'
    console.log(links[0].html); //is '<b>Google</b>'
    console.log(links[0].element); //object
    console.log(links[0].link); //is 'http://google.com'

    console.log(links[1].href); //is '#wat'
    console.log(links[1].text); //is 'Link in page'
    console.log(links[1].html); //is 'Link in page'
    console.log(links[1].element); //object
    console.log(links[1].link); //is null
    console.log($(links[1].element).attr('class')); //is 'pretty'

    console.log(links[2].href); //is "javascript:alert('hi');"
    console.log(links[2].text); //is 'hi'
    console.log(links[2].html); //is 'hi'
    console.log(links[2].element); //object
    console.log(links[2].link); //is null

    console.log(links[3].href); //is "alert('hello')"
    console.log(links[3].text); //is 'hello'
    console.log(links[3].html); //is 'hello'
    console.log(links[3].element); //object
    console.log(links[3].link); //is null

    console.log(links[4].href); //is "/faq/questions"
    console.log(links[4].text); //is 'Faq'
    console.log(links[4].html); //is 'Faq'
    console.log(links[4].element); //object
    console.log(links[4].link); //is 'http://someserver.com/faq/questions'

    console.log(links[5].href); //is "aboutus"
    console.log(links[5].text); //is 'About Us'
    console.log(links[5].html); //is 'About Us'
    console.log(links[5].element); //object
    console.log(links[5].link); //is 'http://someserver.com/aboutus'
});
```

It's currently backed by [cheerio][3]. So you can use the `$` with the jQuery selectors. See [cheerio docs][3] for more details. 



Test
----

    npm test

or...

    mocha test

License
-------

Licensed under MIT. See `LICENSE` for more details.

Copyright (c) 2012 JP Richardson


[1]:http://visionmedia.github.com/superagent/
[2]:https://github.com/mikeal/request
[3]:https://github.com/MatthewMueller/cheerio
