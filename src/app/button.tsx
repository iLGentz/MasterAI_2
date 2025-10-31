
'use client'
 
import { useState } from 'react'
 
// export default function LikeButton({ likes }: { likes: number }) {
//   // ...
// }
// 1. Definiamo le props con un'interfaccia TypeScript
interface LikeButtonProps {
}

export default function LikeButton() {
  const [isLiked, setIsLiked] = useState(false);

  const handleClick = () => {
    if (isLiked) {
     
      setIsLiked(false);
    } else {
      
      setIsLiked(true);
    }
  };

  return (
    <div className='fixed mt-150 ml-420'>
      <button onClick={handleClick} className={isLiked ? 'liked' : 'not-liked'}>
        {isLiked ? '❤️' : '🤍'} Mi Piace
      </button>
    </div>
  );
}