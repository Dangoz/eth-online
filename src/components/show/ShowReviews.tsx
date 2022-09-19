import { Button } from '@nextui-org/react'

const ShowReviews: React.FC = () => {
  const handleReview = async () => {}

  return (
    <>
      <div className="w-full flex justify-center mt-10">
        <Button
          color={'gradient'}
          className="gradientBG h-[44px] w-[99px] text-[16px] text-[black]"
          onClick={handleReview}
        >
          Review
        </Button>
      </div>
    </>
  )
}

export default ShowReviews
