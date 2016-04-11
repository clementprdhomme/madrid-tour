/* List of all the point fof interests in Madrid along with their information */
export default [

  {
    name: 'Musée du Prado',
    category: 'museum',
    coords: [40.4138, -3.6921],
    link: 'https://www.museodelprado.es',
    opening_hours: [
      [[10, 19]],
      [[10, 20]],
      [[10, 20]],
      [[10, 20]],
      [[10, 20]],
      [[10, 20]],
      [[10, 20]]
    ],
    prices: {
      rates: [
        {
          name: 'Tarif général',
          amount: '14€/pers.',
          default: true
        },
        {
          name: 'Tarif réduit',
          amount: '7€/pers.',
          periods: [
            [[10, 14]],
            [[10, 14]],
            [[10, 14]],
            [[10, 14]],
            [[10, 14]],
            [[10, 14]],
            [[10, 14]]
          ]
        },
        {
          name: 'Gratuit',
          periods: [
            [[17, 19]],
            [[18, 20]],
            [[18, 20]],
            [[18, 20]],
            [[18, 20]],
            [[18, 20]],
            [[18, 20]]
          ]
        }
      ]
    }
  },

  {
    name: 'Appartement de Clément',
    category: 'housing',
    coords: [40.433454, -3.698676]
  },

  {
    name: 'Votre appartement',
    category: 'housing',
    coords: [40.434796, -3.703645]
  },

  {
    name: 'Musée Reina Sofía',
    category: 'museum',
    coords: [40.4079123, -3.6945568999999523],
    link: 'http://www.museoreinasofia.es',
    opening_hours: [
      [[10, 19]],
      [[10, 21]],
      [[0, 0]],
      [[10, 21]],
      [[10, 21]],
      [[10, 21]],
      [[10, 21]]
    ],
    prices: {
      rates: [
        {
          name: 'Tarif général',
          amount: '8€/pers.',
          default: true
        }
      ]
    }
  },

  {
    name: 'Carrefour',
    category: 'supermarket',
    coords: [40.433167, -3.703978],
    opening_hours: [
      [[9, 22]],
      [[8.5, 23]],
      [[8.5, 23]],
      [[8.5, 23]],
      [[8.5, 23]],
      [[8.5, 23]],
      [[8.5, 23]]
    ],
    prices: {
      always_free: true
    }
  },

  {
    name: 'Pharmacie',
    category: 'pharmacy',
    coords: [40.434788, -3.700026],
    opening_hours: [
      [[0, 24]],
      [[0, 24]],
      [[0, 24]],
      [[0, 24]],
      [[0, 24]],
      [[0, 24]],
      [[0, 24]]
    ],
    prices: {
      always_free: true
    }
  }

];
