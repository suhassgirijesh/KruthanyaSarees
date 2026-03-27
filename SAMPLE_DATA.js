// Sample products data - you can import these into MongoDB to get started
// Use in MongoDB: db.products.insertMany([...])

const sampleProducts = [
  // Silk Sarees
  {
    name: "Kanchipuram Silk Saree - Burgundy",
    description: "Exquisite hand-woven Kanchipuram silk saree with traditional temple motifs. Perfect for weddings and special occasions.",
    category: "Silk Sarees",
    price: 7500,
    discount: 10,
    fabricType: "Kanchipuram Silk",
    color: "Burgundy",
    size: ["One Size"],
    images: ["silk-1.jpg", "silk-1-alt.jpg"],
    stock: 25,
    rating: 4.8,
    isFeatured: true,
    isTrending: true,
    isNewArrival: false,
    isBestSeller: true
  },
  {
    name: "South Indian Silk Saree - Golden",
    description: "Luxurious zari-bordered silk saree with peacock motifs",
    category: "Silk Sarees",
    price: 6500,
    discount: 15,
    fabricType: "Art Silk",
    color: "Golden",
    size: ["One Size"],
    images: ["silk-2.jpg"],
    stock: 30,
    rating: 4.6,
    isFeatured: true,
    isBestSeller: true
  },

  // Cotton Sarees
  {
    name: "Pure Cotton Saree - Ocean Blue",
    description: "Comfortable pure cotton saree perfect for daily wear",
    category: "Cotton Sarees",
    price: 2500,
    discount: 20,
    fabricType: "Pure Cotton",
    color: "Ocean Blue",
    size: ["One Size"],
    images: ["cotton-1.jpg"],
    stock: 50,
    rating: 4.5,
    isTrending: true
  },
  {
    name: "Check Cotton Saree - Red",
    description: "Classic checked cotton saree with ethnic appeal",
    category: "Cotton Sarees",
    price: 2000,
    discount: 10,
    fabricType: "Cotton Blend",
    color: "Red",
    size: ["One Size"],
    images: ["cotton-2.jpg"],
    stock: 45,
    rating: 4.3
  },

  // Wedding Sarees
  {
    name: "Bridal Benarasi Gold Saree",
    description: "Ornate handwoven Benarasi saree with heavy zari work. Perfect for weddings.",
    category: "Wedding Sarees",
    price: 15000,
    discount: 5,
    fabricType: "Benarasi Silk",
    color: "Red with Gold",
    size: ["One Size"],
    images: ["wedding-1.jpg"],
    stock: 10,
    rating: 4.9,
    isFeatured: true,
    isBestSeller: true
  },
  {
    name: "Grand Marathi Wedding Saree",
    description: "Traditional Marathi saree with intricate embroidery",
    category: "Wedding Sarees",
    price: 12000,
    discount: 8,
    fabricType: "Silk",
    color: "Cream and Gold",
    size: ["One Size"],
    images: ["wedding-2.jpg"],
    stock: 8,
    rating: 4.7
  },

  // Designer Sarees
  {
    name: "Contemporary Printed Designer Saree",
    description: "Modern geometric prints on premium fabric by emerging designers",
    category: "Designer Sarees",
    price: 5500,
    discount: 25,
    fabricType: "Linen Blend",
    color: "Multi-color",
    size: ["One Size"],
    images: ["designer-1.jpg"],
    stock: 20,
    rating: 4.6,
    isTrending: true
  },
  {
    name: "Ethnic Hand Block Print Saree",
    description: "Artisanal hand-block printed saree with traditional motifs",
    category: "Designer Sarees",
    price: 4500,
    discount: 30,
    fabricType: "Cotton",
    color: "Indigo",
    size: ["One Size"],
    images: ["designer-2.jpg"],
    stock: 15,
    rating: 4.5
  },

  // Party Wear Sarees
  {
    name: "Glamorous Sequin Saree - Silver",
    description: "Dazzling sequined saree perfect for parties and celebrations",
    category: "Party Wear Sarees",
    price: 4800,
    discount: 20,
    fabricType: "Net with Sequins",
    color: "Silver",
    size: ["One Size"],
    images: ["party-1.jpg"],
    stock: 18,
    rating: 4.4,
    isTrending: true
  },
  {
    name: "Shimmering Party Saree - Rose Gold",
    description: "Rose gold shimmer saree with elegant draping",
    category: "Party Wear Sarees",
    price: 5200,
    discount: 15,
    fabricType: "Georgette",
    color: "Rose Gold",
    size: ["One Size"],
    images: ["party-2.jpg"],
    stock: 22,
    rating: 4.5
  },

  // Traditional Sarees
  {
    name: "Traditional Paithani Saree",
    description: "Authentic Paithani saree from Maharashtra with peacock motifs",
    category: "Traditional Sarees",
    price: 8500,
    discount: 12,
    fabricType: "Silk",
    color: "Green with Gold",
    size: ["One Size"],
    images: ["traditional-1.jpg"],
    stock: 12,
    rating: 4.7,
    isFeatured: true
  },
  {
    name: "Odisha Sambalpuri Saree",
    description: "Handwoven Sambalpuri saree with traditional tie-dye patterns",
    category: "Traditional Sarees",
    price: 3500,
    discount: 18,
    fabricType: "Jamdani",
    color: "White with Red",
    size: ["One Size"],
    images: ["traditional-2.jpg"],
    stock: 20,
    rating: 4.4
  }
];

// Export for MongoDB insertion
// db.products.insertMany(sampleProducts);
