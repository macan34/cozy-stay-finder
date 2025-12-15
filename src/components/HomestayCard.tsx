import { Star, Users, MapPin } from 'lucide-react';

interface HomestayCardProps {
  image: string;
  title: string;
  description: string;
  price: number;
  location?: string;
  rating?: number;
  capacity?: number;
  isSpecial?: boolean;
  managedBy?: string;
}

const HomestayCard = ({
  image,
  title,
  description,
  price,
  location,
  rating,
  capacity,
  isSpecial,
  managedBy,
}: HomestayCardProps) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID').format(price);
  };

  return (
    <article className="homestay-card group cursor-pointer">
      {/* Image Container */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-2">
          {isSpecial && (
            <span className="badge-special">Spesial</span>
          )}
          {capacity && (
            <span className="bg-card/90 text-foreground text-xs font-medium px-2 py-1 rounded flex items-center gap-1">
              <Users className="w-3 h-3" />
              {capacity} org
            </span>
          )}
          {rating && (
            <span className="bg-card/90 text-foreground text-xs font-medium px-2 py-1 rounded flex items-center gap-1">
              <Star className="w-3 h-3 fill-accent text-accent" />
              {rating.toFixed(2)}
            </span>
          )}
        </div>

        {/* Managed By Badge */}
        {managedBy && (
          <div className="absolute bottom-3 left-3 bg-card/95 rounded-full px-3 py-1 flex items-center gap-2 shadow-sm">
            <div className="w-6 h-6 rounded-full bg-success flex items-center justify-center">
              <span className="text-success-foreground text-xs font-bold">W</span>
            </div>
            <span className="text-xs text-muted-foreground">
              Dikelola Oleh <strong className="text-foreground">{managedBy}</strong>
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-semibold text-foreground text-lg mb-1 group-hover:text-primary transition-colors line-clamp-1">
          {title}
        </h3>
        
        {location && (
          <p className="text-xs text-primary font-medium mb-2 flex items-center gap-1">
            <MapPin className="w-3 h-3" />
            {location}
          </p>
        )}
        
        <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
          {description}
        </p>
        
        <p className="price-tag text-lg">
          Rp {formatPrice(price)} <span className="text-muted-foreground text-sm font-normal">/ malam</span>
        </p>
      </div>
    </article>
  );
};

export default HomestayCard;