import BackArrow from '@/components/icons/BackArrow'

const ReviewPostLoader = () => {
  return (
    <>
      <div
        className="rounded-[24px] bg-bgGrey flex flex-col justify-start border-[2px] border-white 
         p-[24px] gap-2 mt-5 cursor-pointer hover:bg-slate-500 w-[1000px] h-[500px] Loader"
        style={{
          breakInside: 'avoid',
        }}
      >
        {/* creator */}
        <div className="flex justify-start items-center gap-3">
          <div className="w-[50px] h-[50px] rounded-full gradientBG flex justify-center items-center cursor-pointer primaryShadow"></div>

          <div>
            <div> </div>
            <div> </div>
          </div>
        </div>

        {/* media info */}
        <div className="flex justify-start items-center gap-3 pl-3">
          <BackArrow />
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-1 font-semibold">
              <div> </div>
              <div className="text-slate-300"> </div>
            </div>
          </div>
        </div>

        {/* review */}
        <div className="flex flex-col gap-2">
          <div className="text-[18px] font-semibold"> </div>
          <div className="whitespace-pre-line break-words overflow-y-scroll max-h-[180px]"> </div>
        </div>

        <div className="text-[12px] text-slate-300"> </div>
      </div>
    </>
  )
}

export default ReviewPostLoader
