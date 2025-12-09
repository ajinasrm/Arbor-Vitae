export interface Product {
    id: string;
    name: string;
    price: number;
    category: 'Women' | 'Men' | 'Accessories';
    subCategory: 'Tops' | 'Bottoms' | 'Outerwear' | 'Bags' | 'Scarves';
    image: string;
    description: string;
    features: string[];
    sizes: string[];
    isNew?: boolean;
}

export const products: Product[] = [
    {
        id: '1',
        name: "The Oak Jacket",
        price: 18500, // stored in cents/smallest unit or clean number. let's use integers for now, representing currency
        category: 'Men',
        subCategory: 'Outerwear',
        image: 'https://images.unsplash.com/photo-1520975661595-6453be3f7070?q=80&w=1000&auto=format&fit=crop',
        description: "A durable, sustainable canvas jacket inspired by the strength of oak. Perfect for layering in transitional weather.",
        features: ["100% Organic Cotton Canvas", "Recycled Brass Buttons", "Water-resistant finish"],
        sizes: ['S', 'M', 'L', 'XL'],
        isNew: true,
    },
    {
        id: '2',
        name: "Willow Silk Dress",
        price: 22000,
        category: 'Women',
        subCategory: 'Tops',
        image: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?q=80&w=1000&auto=format&fit=crop',
        description: "Flowing and graceful, the Willow Silk Dress moves with you. Made from cruelty-free peace silk.",
        features: ["100% Peace Silk", "Natural Dyes", "Adjustable waist tie"],
        sizes: ['XS', 'S', 'M', 'L'],
        isNew: true,
    },
    {
        id: '3',
        name: "Cedar Chinos",
        price: 12000,
        category: 'Men',
        subCategory: 'Bottoms',
        image: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?q=80&w=1000&auto=format&fit=crop',
        description: "Classic straight-leg chinos crafted from breathable hemp blend. Built to last.",
        features: ["55% Hemp, 45% Organic Cotton", "Deep pockets", "Reinforced stitching"],
        sizes: ['30', '32', '34', '36'],
    },
    {
        id: '4',
        name: "Birch Linen Shirt",
        price: 9500,
        category: 'Women',
        subCategory: 'Tops',
        image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80&w=1000&auto=format&fit=crop',
        description: "Lightweight and airy, the Birch Linen Shirt is your summer staple.",
        features: ["100% European Linen", "Mother-of-pearl buttons", "Relaxed fit"],
        sizes: ['XS', 'S', 'M', 'L', 'XL'],
    },
    {
        id: '5',
        name: "Pine Wool Sweater",
        price: 15500,
        category: 'Men',
        subCategory: 'Tops',
        image: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?q=80&w=1000&auto=format&fit=crop',
        description: "Warm, chunky knit sweater tailored for comfort and warmth.",
        features: ["100% Merino Wool", "Ethically sourced", "Hand-finished"],
        sizes: ['S', 'M', 'L', 'XL'],
    },
    {
        id: '6',
        name: "Juniper Scarf",
        price: 5500,
        category: 'Accessories',
        subCategory: 'Scarves',
        image: 'https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?q=80&w=1000&auto=format&fit=crop',
        description: "Soft cashmere blend scarf in a deep evergreen hue.",
        features: ["Cashmere & Wool blend", "Unisex design", "Extra long"],
        sizes: ['One Size'],
    },
    {
        id: '7',
        name: "Maple Bucket Bag",
        price: 24500,
        category: 'Accessories',
        subCategory: 'Bags',
        image: 'https://images.unsplash.com/photo-1591561954557-26941169b49e?q=80&w=1000&auto=format&fit=crop',
        description: "Structured leather bucket bag with ample space for essentials.",
        features: ["Vegetable-tanned leather", "Adjustable strap", "Inner pocket"],
        sizes: ['One Size'],
        isNew: true,
    },
    {
        id: '8',
        name: "Elm Cargo Pants",
        price: 13500,
        category: 'Women',
        subCategory: 'Bottoms',
        image: 'https://images.unsplash.com/photo-1532453288672-3a27e9be9efd?q=80&w=1000&auto=format&fit=crop',
        description: "Functional meets fashionable. High-waisted cargo pants with a tapered leg.",
        features: ["Organic Cotton Twill", "Utility pockets", "High rise"],
        sizes: ['26', '28', '30', '32'],
    }
];
