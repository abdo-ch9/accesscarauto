import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ShoppingCart } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  badge?: string;
}

interface ProductCardProps {
  product: Product;
  onAddToCart: (name: string) => void;
}

const ProductCard: React.FC<ProductCardProps> = memo(({ product, onAddToCart }) => (
  <Link key={product.id} to={`/product/${product.id}`} className="product-card group">
    <div className="relative overflow-hidden">
      <img 
        src={product.image} 
        alt={product.name} 
        className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
        loading="lazy"
      />
      {product.badge && <Badge className="absolute top-3 left-3">{product.badge}</Badge>}
    </div>
    <div className="p-4">
      <h3 className="font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
        {product.name}
      </h3>
      <div className="flex items-center justify-between">
        <span className="text-xl font-bold text-primary">${product.price}</span>
        <Button 
          size="sm" 
          className="btn-racing" 
          onClick={(e) => { 
            e.preventDefault(); 
            onAddToCart(product.name); 
          }}
        >
          <ShoppingCart className="h-4 w-4 mr-1" />
          Add
        </Button>
      </div>
    </div>
  </Link>
));

ProductCard.displayName = 'ProductCard';

export default ProductCard;
