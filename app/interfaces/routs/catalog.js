'use strict';

const Core = require('../../core');

async function Catalog(req, res) {
  const query = req.db.sql();
  query.select(['filmid', 'title', 'year', 'rating', 'views', 'poster', 'genre'])
    .inTable('films');

  if (query.top !== undefined) {
    // Getting top 10 according rating
    query.order('rating DESC LIMIT 10');
  } else {
    query.order('title ASC');
  }

  if (query.word !== undefined) {
    // For search query
    query.where({ title: `*${req.query.word}*` });
  }

  await query.exec((err, result) => {
    if (err) {
      Core.log.warning(err);
      res.status(500).end();
      return;
    }
    // test data
    // result = [{"filmid":1,"title":"Bitcoin","year":2017,"rating":"5.45","views":300469,"poster":"Bitcoin.png","genre":4},{"filmid":2,"title":"Bridge","year":2015,"rating":"7.25","views":76489,"poster":"Bridge.png","genre":2},{"filmid":3,"title":"Buildings","year":2002,"rating":"8.90","views":103538,"poster":"Buildings.png","genre":2},{"filmid":4,"title":"Car","year":2020,"rating":"9.56","views":3235900,"poster":"Car.png","genre":4},{"filmid":5,"title":"Cherry","year":2011,"rating":"8.98","views":7853234,"poster":"Cherry.png","genre":2},{"filmid":6,"title":"City","year":204,"rating":"5.02","views":4520683,"poster":"City.png","genre":2},{"filmid":7,"title":"Coffee","year":2020,"rating":"9.99","views":7099098,"poster":"Coffee.png","genre":3},{"filmid":8,"title":"Computer","year":1998,"rating":"3.67","views":367833,"poster":"Computer.png","genre":5},{"filmid":9,"title":"Design","year":2004,"rating":"4.39","views":46368008,"poster":"Design.png","genre":5},{"filmid":10,"title":"Dubai","year":2015,"rating":"8.77","views":52453,"poster":"Dubai.png","genre":2},{"filmid":11,"title":"Fire","year":2012,"rating":"4.91","views":34687900,"poster":"Fire.png","genre":1},{"filmid":12,"title":"Futuristic","year":2013,"rating":"6.72","views":12319056,"poster":"Futuristic.png","genre":4},{"filmid":13,"title":"Glitch","year":2020,"rating":"7.68","views":7099098,"poster":"Glitch.png","genre":5},{"filmid":14,"title":"Hud","year":2015,"rating":"5.48","views":5063452,"poster":"Hud.png","genre":5},{"filmid":15,"title":"Jellyfish","year":2001,"rating":"4.70","views":340657,"poster":"Jellyfish.png","genre":1},{"filmid":16,"title":"Landing","year":2018,"rating":"7.80","views":530034,"poster":"Landing.png","genre":2},{"filmid":17,"title":"Loading","year":2010,"rating":"8.60","views":102405,"poster":"Loading.png","genre":5},{"filmid":18,"title":"Music","year":2002,"rating":"9.50","views":7099098,"poster":"Music.png","genre":4},{"filmid":19,"title":"Nebula","year":2020,"rating":"6.65","views":808540,"poster":"Nebula.png","genre":1},{"filmid":20,"title":"Neon","year":2018,"rating":"8.50","views":39704210,"poster":"Neon.png","genre":4},{"filmid":21,"title":"Network","year":2020,"rating":"5.95","views":481024,"poster":"Network.png","genre":5},{"filmid":22,"title":"Ocean","year":2020,"rating":"8.84","views":1080040,"poster":"Ocean.png","genre":1},{"filmid":23,"title":"Palm Trees","year":2019,"rating":"9.42","views":1430078,"poster":"Palm Trees.png","genre":1},{"filmid":24,"title":"Seoul","year":2017,"rating":"7.90","views":802379,"poster":"Seoul.png","genre":2},{"filmid":25,"title":"Sparrow","year":2016,"rating":"5.16","views":6095601,"poster":"Sparrow.png","genre":1},{"filmid":26,"title":"Trees","year":2016,"rating":"4.34","views":5006062,"poster":"Trees.png","genre":1},{"filmid":27,"title":"Wireframe","year":2016,"rating":"8.43","views":4290063,"poster":"Wireframe.png","genre":4},{"filmid":28,"title":"World","year":2017,"rating":"9.31","views":10450090,"poster":"World.png","genre":1}];
    res.send(JSON.stringify(result)).end();
  });
}
module.exports = Catalog;

