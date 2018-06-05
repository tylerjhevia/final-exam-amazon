exports.seed = function(knex, Promise) {
  return knex('inventory').del().then(function() {
    return knex('inventory').insert([
      {
        title: 'Lenovo Miix 32089iop',
        description:
          "It's powered by a 1.44 GHz Intel Atom x5-Z8350 quad-core processor",
        url:
          'https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcRoeC5qo7MVignZ6MAMZOo8QeJBLWswBjVhXoNGD37stdXcmTKg&usqp=CAY',
        price: 200.53
      },
      {
        title: 'Sceptre 65" Class 4K LED TV',
        description:
          'With a Sceptre 65-inch LED 4K Ultra HDTV (U650CV-U), entertainment is transformed into an epic adventure. ',
        url:
          'https://i5.walmartimages.com/asr/bcbc95b4-5816-4841-8545-33e9b677a6d5_2.3644c20df819fa74845119c2704625a9.jpeg?odnHeight=450&odnWidth=450&odnBg=FFFFFF',
        price: 414.67
      },
      {
        title: 'Bose SoundLink headphones',
        description:
          'Deep, immersive sound, improved eq-best-in-class performance for wireless headphones',
        url:
          'https://images-na.ssl-images-amazon.com/images/I/71r5yiYW3nL._SL1500_.jpg',
        price: 143.78
      },
      {
        title: 'The Bacon Express Toaster',
        description: 'If you love bacon you’ll love the Bacon Express Toaster!',
        url:
          'https://cdn1.sharperimage.com/si/img/productImages/205855/205855-z3.jpg',
        price: 50.34
      },
      {
        title: 'Inflatable University of Florida Gator',
        description: 'Go Gators',
        url:
          'https://www.cdn-outlet.com/photos/options/8125978-209-zoomin.jpg',
        price: 69.69
      }
    ]);
  });
};
