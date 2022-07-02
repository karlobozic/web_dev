export const seedData = {
  users: {
    _model: "User",
    admin: {
      firstName: "Admin",
      lastName: "Admin",
      email: "admin@admin.ie",
      password: "admin"
    },
    bot1: {
      firstName: "bot1",
      lastName: "spam",
      email: "bot1@spam.ie",
      password: "bot1"
    },
    bot2: {
      firstName: "bot2",
      lastName: "spam",
      email: "bot2@spam.ie",
      password: "test"
    },
    bot3: {
      firstName: "bot3",
      lastName: "spam",
      email: "bot3@spam.ie",
      password: "test"
    },
    karlo: {
      firstName: "Karlo",
      lastName: "Bozic",
      email: "karlo@bozic.ie",
      password: "pass"
    }
  },
  pois: {
    _model: "POI",
    north: {
      title: "North",
      userid: "->users.admin"
    },
    south: {
      title: "South",
      userid: "->users.admin"
    },
    east: {
      title: "East",
      userid: "->users.admin"
    },
    west: {
      title: "West",
      userid: "->users.admin"
    },
  },
  rivers: {
    _model : "River",
    river_1 : {
      name: "Sava",
      description: "Sava is a river in Central and Southeast Europe, a right and the longest tributary of the Danube",
      longitude: 45.27644528731883,
      latitude: 16.93331303897395,
      poiid: "->pois.north",
      userid: "->users.admin",
      img: "http://res.cloudinary.com/dp1kli9db/image/upload/v1656669747/jgmzkd7lwls2e60tr8r7.jpg"
    },
    river_2 : {
      name: "Cetina",
      description: "Cetina is a river in southern Croatia. It has a length of 101 km (63 mi) and its basin covers an area of 1,463 km2 (565 sq mi)",
      longitude: 43.73376829493976,
      latitude: 16.6796099946854,
      poiid: "->pois.south",
      userid: "->users.admin",
      img: "http://res.cloudinary.com/dp1kli9db/image/upload/v1656670148/ewzfbfqx3iwkjgfyqr9s.jpg"
    },
    river_3 : {
      name: "Mirna",
      description: "Mirna is a river in Istria, Croatia. In ancient times it was called the Aquilis. It is Istria's longest and richest river, being 53 km (33 mi) long",
      longitude: 45.35488722225431,
      latitude: 13.742937306363407,
      poiid: "->pois.west",
      userid: "->users.admin",
      img: "http://res.cloudinary.com/dp1kli9db/image/upload/v1656670197/pfphbriknzqi9ad4kkqp.jpg"
    },
    river_4 : {
      name: "Bosut",
      description: "Bosut is a river in the Syrmia region of eastern Croatia and northwestern Serbia, a 186 km long left tributary of the Sava river",
      longitude: 45.10955484515268,
      latitude: 19.01830617319331,
      poiid: "->pois.east",
      userid: "->users.admin",
      img: "http://res.cloudinary.com/dp1kli9db/image/upload/v1656670068/wb6xw3y3llvrfnwmie65.jpg"
    },
    river_5 : {
      name: "Bednja ",
      description: "Bednja is a river in northern Croatia, a right tributary of the Drava",
      longitude: 46.3003130180776,
      latitude: 16.749063781219377,
      poiid: "->pois.north",
      userid: "->users.admin",
      img: "http://res.cloudinary.com/dp1kli9db/image/upload/v1656669996/oszsisi3cquvu1ttaxzx.jpg"
    },
  }
};

