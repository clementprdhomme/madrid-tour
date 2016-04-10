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

];
