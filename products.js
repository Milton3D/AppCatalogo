const productos = [
    {
      id: 1,
      nombre: "Omega 3 Natural",
      descripcion: "Suplemento de aceite de pescado rico en ácidos grasos omega-3",
      precio: 29.99,
      precioMayor: [
        { cantidad: "12-24 unidades", precio: 19.99 },
        { cantidad: "25-49 unidades", precio: 17.99 },
        { cantidad: "50+ unidades", precio: 15.99 }
      ],
      categoria: "suplementos",
      tipo: "ambos"
    },
    {
      id: 2,
      nombre: "Vitamina C Orgánica",
      descripcion: "Extracto natural de acerola y camu camu",
      precio: 24.99,
      precioMayor: [
        { cantidad: "12-24 unidades", precio: 16.99 },
        { cantidad: "25-49 unidades", precio: 14.99 },
        { cantidad: "50+ unidades", precio: 12.99 }
      ],
      categoria: "vitaminas",
      tipo: "detal"
    },
    {
      id: 3,
      nombre: "Té Verde Matcha",
      descripcion: "Poderoso antioxidante natural de primera calidad",
      precio: 19.99,
      precioMayor: [
        { cantidad: "12-24 unidades", precio: 12.99 },
        { cantidad: "25-49 unidades", precio: 11.99 },
        { cantidad: "50+ unidades", precio: 10.99 }
      ],
      categoria: "infusiones",
      tipo: "ambos"
    },
    {
      id: 4,
      nombre: "Propóleo Premium",
      descripcion: "Extracto de propóleo para fortalecer el sistema inmune",
      precio: 15.99,
      precioMayor: [
        { cantidad: "12-24 unidades", precio: 9.99 },
        { cantidad: "25-49 unidades", precio: 8.99 },
        { cantidad: "50+ unidades", precio: 7.99 }
      ],
      categoria: "inmunidad",
      tipo: "mayor"
    },
    {
      id: 5,
      nombre: "Colágeno Natural",
      descripcion: "Suplemento de colágeno hidrolizado con vitamina C",
      precio: 34.99,
      precioMayor: [
        { cantidad: "12-24 unidades", precio: 24.99 },
        { cantidad: "25-49 unidades", precio: 22.99 },
        { cantidad: "50+ unidades", precio: 20.99 }
      ],
      categoria: "suplementos",
      tipo: "ambos"
    },
    {
      id: 6,
      nombre: "Spirulina Orgánica",
      descripcion: "Superalimento rico en proteínas y nutrientes",
      precio: 27.99,
      precioMayor: [
        { cantidad: "12-24 unidades", precio: 18.99 },
        { cantidad: "25-49 unidades", precio: 16.99 },
        { cantidad: "50+ unidades", precio: 14.99 }
      ],
      categoria: "superalimentos",
      tipo: "ambos"
    }
  ];