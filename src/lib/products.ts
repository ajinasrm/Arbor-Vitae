export interface Product {
    id: string;
    name: string;
    price: number;
    category: 'Women' | 'Men' | 'Accessories';
    subCategory: 'Tops' | 'Bottoms' | 'Outerwear' | 'Bags' | 'Scarves' | 'Dresses';
    image: string;
    description: string;
    features: string[];
    sizes: string[];
    isNew?: boolean;
}

export const products: Product[] = [
    {
        id: '1',
        name: 'The Classic Linen Shirt',
        price: 4500,
        category: 'Women',
        subCategory: 'Tops',
        image: 'https://images.unsplash.com/photo-1598532163257-52bbc618e9ba?q=80&w=1000&auto=format&fit=crop',
        description: 'A breathable, lightweight linen shirt perfect for summer days. Ethically sourced and tailored for a relaxed fit.',
        features: ['100% Organic Linen', 'Breathable Fabric', 'Coconut Shell Buttons'],
        sizes: ['XS', 'S', 'M', 'L', 'XL'],
        isNew: true
    },
    {
        id: '2',
        name: 'Essential Cotton Trousers',
        price: 5200,
        category: 'Men',
        subCategory: 'Bottoms',
        image: 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?q=80&w=1000&auto=format&fit=crop',
        description: 'Structured yet comfortable trousers made from high-quality organic cotton.',
        features: ['Organic Cotton Twill', 'Tapered Fit', 'Deep Pockets'],
        sizes: ['30', '32', '34', '36'],
        isNew: true
    },
    {
        id: '3',
        name: 'Handwoven Scarf',
        price: 2800,
        category: 'Accessories',
        subCategory: 'Scarves',
        image: 'https://images.unsplash.com/photo-1520908615049-13c48c48ce48?q=80&w=1000&auto=format&fit=crop',
        description: 'Delicate handwoven scarf featuring natural dyes and traditional patterns.',
        features: ['Handwoven', 'Natural Dyes', 'Soft Texture'],
        sizes: ['One Size'],
        isNew: false
    },
    {
        id: '4',
        name: 'Forest Green Midi Dress',
        price: 6800,
        category: 'Women',
        subCategory: 'Dresses',
        image: 'https://images.unsplash.com/photo-1596783074918-c84cb06531ca?q=80&w=1000&auto=format&fit=crop', // Reliable dress image
        description: 'Elegant midi dress in our signature deep forest green. Perfect for evening gatherings.',
        features: ['Sustainable Viscose', 'Side Pockets', 'Wrap Design'],
        sizes: ['S', 'M', 'L'],
        isNew: true
    },
    // Adding reliable fallbacks for others
    {
        id: '5',
        name: 'Utility Jacket',
        price: 8500,
        category: 'Men',
        subCategory: 'Outerwear',
        image: 'https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?q=80&w=1000&auto=format&fit=crop',
        description: 'Rugged utility jacket with ample pockets and durable stitching.',
        features: ['Water Resistant', 'Durable Canvas', 'Multiple Pockets'],
        sizes: ['M', 'L', 'XL'],
        isNew: false
    },
    {
        id: '6',
        name: 'Canvas Tote Bag',
        price: 1500,
        category: 'Accessories',
        subCategory: 'Bags',
        image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?q=80&w=1000&auto=format&fit=crop',
        description: "Functional meets fashionable. High-waisted cargo pants with a tapered leg.",
        features: ["Organic Cotton Twill", "Utility pockets", "High rise"],
        sizes: ['26', '28', '30', '32'],
    }
];
