import { StarIcon as OutlineStarIcon } from '@heroicons/react/24/outline'
import { StarIcon as SolidStarIcon } from '@heroicons/react/24/solid'
import { useState } from 'react'

interface StarRatingProps {
  viewOnly?: boolean
  rating: number
  totalRating: number
  onChange?: (rating: number) => void
}

const StarRating: React.FC<StarRatingProps> = ({
  viewOnly = false,
  rating = 0,
  totalRating = 5,
  onChange = (rating: number) => {},
}) => {
  const [hoverIndex, setHoverIndex] = useState<number | null>(null)

  if (viewOnly) {
    return (
      <>
        <div className="flex items-center">
          {[...Array(totalRating)].map((_, index) => (
            <div key={index}>
              {index + 1 > rating && index + 1 - rating < 1 && (
                <SolidStarIcon
                  className="w-4 h-4 text-titlePurple"
                  style={{
                    clipPath: `polygon(0 0, ${100 - (index + 1 - rating) * 100}% 0, ${
                      100 - (index + 1 - rating) * 100
                    }% 100%, 0% 100%)`,
                  }}
                />
              )}

              {index + 1 <= rating && <SolidStarIcon className="w-4 h-4 text-titlePurple" />}

              {index + 1 > rating && index + 1 - rating >= 1 && (
                <OutlineStarIcon className="w-4 h-4 text-titlePurple" />
              )}
            </div>
          ))}
        </div>
      </>
    )
  }

  return (
    <>
      <div className="flex items-center">
        {[...Array(totalRating)].map((_, index) => (
          <div
            key={index}
            onMouseEnter={() => setHoverIndex(index)}
            onMouseLeave={() => setHoverIndex(null)}
            onClick={() => onChange(index + 1)}
          >
            {(hoverIndex !== null && index <= hoverIndex) || (hoverIndex === null && index + 1 <= rating) ? (
              <SolidStarIcon className="w-6 h-6 text-titlePurple cursor-pointer" />
            ) : (
              <OutlineStarIcon className="w-6 h-6 text-titlePurple cursor-pointer" />
            )}
          </div>
        ))}
      </div>
    </>
  )
}

export default StarRating
