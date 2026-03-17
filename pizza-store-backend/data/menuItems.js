const menuItems = [
  {
      name: "Paneer Tikka Pizza",
      description: "Spicy paneer cubes with onion toppings",
      price: 279,
      category: "pizza",
      image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38",
      isAvailable: true
  },
  {
      name: "Mexican Green Wave",
      description: "Mexican herbs with crunchy veggies",
      price: 269,
      category: "pizza",
      image: "https://images.unsplash.com/photo-1590947132387-155cc02f3212",
      isAvailable: true
  },
  {
      name: "Cheese Burst Pizza",
      description: "Extra cheese filled crust pizza",
      price: 299,
      category: "pizza",
      image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002",
      isAvailable: true
  },
  {
      name: "Cheese Maccoronni",
      description: "Extra butter and spring onions",
      price: 299,
      category: "pizza",
      image: "https://images.unsplash.com/photo-1590947132387-155cc02f3212",
      isAvailable: true
  },
  {
      name: "Capsicum Delight",
      description: "Fresh capsicum with creamy cheese",
      price: 239,
      category: "pizza",
      image: "https://images.unsplash.com/photo-1513104890138-7c749659a591",
      isAvailable: true
  },
  {
      name: "Veg Loaded Pizza",
      description: "Loaded with fresh vegetables",
      price: 289,
      category: "pizza",
      image: "https://images.unsplash.com/photo-1595854341625-f33ee10dbf94",
      isAvailable: true
  },
  {
      name: "Double Cheese Pizza",
      description: "Double mozzarella cheese topping",
      price: 309,
      category: "pizza",
      image: "https://images.unsplash.com/photo-1604382355076-af4b0eb60143",
      isAvailable: true
  },
  {
      name: "Garlic Bread",
      description: "Fresh baked garlic bread",
      price: 99,
      category: "sides",
      image: "https://images.unsplash.com/photo-1593560708920-61dd98c46a4e",
      isAvailable: true
  },
  {
      name: "Cheese Garlic Bread",
      description: "Garlic bread topped with cheese",
      price: 129,
      category: "sides",
      image: "https://images.unsplash.com/photo-1608198093002-ad4e005484ec",
      isAvailable: true
  },
  {
      name: "French Fries",
      description: "Crispy golden fries",
      price: 89,
      category: "sides",
      image: "https://images.unsplash.com/photo-1550547660-d9450f859349",
      isAvailable: true
  },
  {
      name: "Burger ",
      description: "Chicken Burger",
      price: 109,
      category: "sides",
      image: "https://images.unsplash.com/photo-1586190848861-99aa4a171e90",
      isAvailable: true
  },
  {
      name: "Stuffed Garlic Bread",
      description: "Bread stuffed with cheese filling",
      price: 149,
      category: "sides",
      image: "https://images.unsplash.com/photo-1506354666786-959d6d497f1a",
      isAvailable: true
  },
  {
      name: "Coca Cola",
      description: "Chilled coca cola",
      price: 40,
      category: "beverages",
      image: "https://images.unsplash.com/photo-1596803244618-8dbee441d70b",
      isAvailable: true
  },
  {
      name: "Pepsi",
      description: "Refreshing cola drink",
      price: 40,
      category: "beverages",
      image: "https://images.unsplash.com/photo-1600891964599-f61ba0e24092",
      isAvailable: true
  },
  {
      name: "Sprite",
      "description": "Lemon flavored soda",
      price: 40,
      category: "beverages",
      image: "https://images.unsplash.com/photo-1581006852262-e4307cf6283a",
      isAvailable: true
  },
  {
      name: "Fanta",
      "description": "Orange flavored soda",
      price: 40,
      category: "beverages",
      image: "https://images.unsplash.com/photo-1624517452488-04869289c4ca",
      isAvailable: true
  },
  {
      name: "Cold Coffee",
      description: "Iced coffee drink",
      price: 120,
      category: "beverages",
      image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93",
      isAvailable: true
  },
  {
      name: "Chocolate Lava Cake",
      description: "Hot chocolate cake with molten center",
      price: 129,
      category: "desserts",
      image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c",
      isAvailable: true
  },
  {
      name: "Brownie",
      description: "Rich chocolate brownie",
      price: 99,
      category: "desserts",
      image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93",
      isAvailable: true
  },
  {
      name: "Chocolate Ice Cream",
      description: "Creamy chocolate ice cream",
      price: 79,
      category: "desserts",
      image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb",
      isAvailable: true
  },
  {
      name: "Vanilla Ice Cream",
      description: "Classic vanilla ice cream",
      price: 79,
      category: "desserts",
      image: "https://images.unsplash.com/photo-1554866585-cd94860890b7",
      isAvailable: true
  },
  {
      name: "Strawberry Cake",
      description: "Fresh strawberry cake slice",
      price: 139,
      category: "desserts",
      image: "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e",
      isAvailable: true
  },
  {
      name: "Classic Margherita",
      description: "Fresh mozzarella, tomato sauce and basil",
      price: 199,
      category: "newlaunches",
      image: "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3",
      isAvailable: true
  },
  {
      name: "Farmhouse Pizza",
      description: "Onion, capsicum, tomato and mushroom",
      price: 249,
      category: "Best Sellers",
      image: "https://images.unsplash.com/photo-1594007654729-407eedc4be65",
      isAvailable: true
  },
  {
      name: "Pepperoni Feast",
      description: "Loaded pepperoni with extra cheese",
      price: 299,
      category: "newlaunches",
      image: "https://images.unsplash.com/photo-1628840042765-356cda07504e",
      isAvailable: true
  },
  {
      name: "Veggie Paradise",
      description: "Sweet corn, olives, capsicum and cheese",
      price: 269,
      category: "Best Sellers",
      image: "https://images.unsplash.com/photo-1604382355076-af4b0eb60143",
      isAvailable: true
  },
  {
      name: "Cheese Burst Pizza",
      description: "Extra cheese stuffed crust pizza",
      price: 319,
      category: "Best Sellers",
      image: "https://images.unsplash.com/photo-1542281286-9e0a16bb7366",
      isAvailable: true
  },
  {
      name: "Paneer Tikka Pizza",
      description: "Paneer tikka chunks with spicy sauce",
      price: 309,
      category: "New Launches",
      image: "https://images.unsplash.com/photo-1593560708920-61dd98c46a4e",
      isAvailable: true
  },
  {
      name: "Mexican Green Wave",
      description: "Jalapeno, capsicum, onion and tomato",
      price: 289,
      category: "newlaunches",
      image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002",
      isAvailable: true
  },
  {
      name: "BBQ Chicken Pizza",
      description: "BBQ chicken chunks with smoky sauce",
      price: 349,
      category: "New Launches",
      image: "https://images.unsplash.com/photo-1513104890138-7c749659a591",
      isAvailable: true
  },
  {
      name: "Pizza + Coke Combo",
      description: "Medium pizza with chilled Coke",
      price: 399,
      category: "Combos",
      image: "https://images.unsplash.com/photo-1590947132387-155cc02f3212",
      isAvailable: true
  },
  {
      name: "Pizza + Garlic Bread Combo",
      description: "Medium pizza with garlic bread",
      price: 429,
      category: "Combos",
      image: "https://images.unsplash.com/photo-1579751626657-72bc17010498",
      isAvailable: true
  },
  {
      name: "Family Feast Combo",
      description: "3 pizzas + garlic bread + coke",
      price: 999,
      category: "Combos",
      image: "https://images.unsplash.com/photo-1604382355076-af4b0eb60143",
      isAvailable: true
  },
  {
      name: "Snack Combo",
      description: "Small pizza + fries + coke",
      price: 349,
      category: "Combos",
      image: "https://images.unsplash.com/photo-1600891964599-f61ba0e24092",
      isAvailable: true
  },
  {
      name: "Classic Margherita",
      description: "Fresh mozzarella pizza",
      price: 199,
      category: "bestsellers",
      image: "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3",
      isAvailable: true
  },
  {
      name: "Paneer Tikka Pizza",
      description: "Spicy paneer pizza",
      price: 309,
      category: "newlaunches",
      image: "https://images.unsplash.com/photo-1593560708920-61dd98c46a4e",
      isAvailable: true
  },
  {
      name: "Pizza + Coke Combo",
      description: "Medium pizza with coke",
      price: 399,
      category: "combos",
      image: "https://images.unsplash.com/photo-1590947132387-155cc02f3212",
      isAvailable: true
  },
  {
      name: "Pizza + Coke Combo",
      description: "Medium pizza with coke",
      price: 399,
      category: "bestsellers",
      image: "https://images.unsplash.com/photo-1590947132387-155cc02f3212",
      isAvailable: true
  },
  {
      name: "Burger",
      description: "  Chicken Burger",
      price: 109,
      category: "bestsellers",
      image: " https://images.unsplash.com/photo-1586190848861-99aa4a171e90",
      isAvailable: true
  },
  {
      name: "Pepperoni Feast",
      description: "Loaded pepperoni with extra cheese",
      price: 299,
      category: "bestsellers",
      image: "https://images.unsplash.com/photo-1628840042765-356cda07504e",
      isAvailable: true
  }
];

module.exports = menuItems;
