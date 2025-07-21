import React from 'react';
import { Clock, MoreVertical } from 'lucide-react';

interface ArticleProps {
  title: string;
  source: string;
  image?: string;
  size?: 'large' | 'medium' | 'small';
  description?: string;
}

const ArticleCard: React.FC<ArticleProps> = ({ 
  title, 
  source, 
  size = 'medium',
  description 
}) => {
  const sizeClasses = {
    large: 'col-span-2 row-span-2',
    medium: 'col-span-1',
    small: 'col-span-1'
  };

  const titleClasses = {
    large: 'text-2xl font-medium leading-7',
    medium: 'text-lg font-medium leading-6',
    small: 'text-base font-medium leading-5'
  };

  return (
    <article className={`group cursor-pointer ${sizeClasses[size]}`}>
      <div className="bg-white rounded-lg hover:shadow-md transition-shadow duration-200">
        <div className="p-4">
          <h3 className={`${titleClasses[size]} text-gray-900 group-hover:text-blue-600 transition-colors mb-2 line-clamp-3`}>
            {title}
          </h3>
          
          {description && size === 'large' && (
            <p className="text-gray-600 text-sm mb-3 line-clamp-2">
              {description}
            </p>
          )}
          
          <div className="flex items-center justify-between text-xs text-gray-500">
            <div className="flex items-center space-x-2">
              <span className="font-medium">{source}</span>
              <span>•</span>
              <div className="flex items-center space-x-1">
                <Clock className="w-3 h-3" />
              </div>
            </div>
            
            <button className="p-1 hover:bg-gray-100 rounded-full">
              <MoreVertical className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </article>
  );
};

export default ArticleCard;