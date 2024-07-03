'use client'

import { useRouter } from 'next/navigation';

const PaginationControls = (
  {
    hasNextPage,
    hasPrevPage,
  }
) => {
  const router = useRouter()
 // const searchParams = useSearchParams()

//  const page = searchParams.get('page') ?? '1'
 // const per_page = searchParams.get('per_page') ?? '5'

  
//   const goToPreviousPage = (event) => {
// //    event.preventDefault(); // Prevent default behavior
//     window.scrollTo(0, 1000);
//     router.push(`/?page=${Number(page) - 1}&per_page=${per_page}`, undefined, { scroll: false });
      
//   };
  
  
  return (
    <div className='flex gap-2'>
      <button
        className='bg-blue-500 text-white p-1'
        onClick={(event) => goToPreviousPage(event)}>
        prev page
      </button>

      <div>
        {page} / {Math.ceil(10 / Number(per_page))}
      </div>

      <button
        className='bg-blue-500 text-white p-1'
        onClick={() => {
          router.push(`/?page=${Number(page) + 1}&per_page=${per_page}`)
        }}>
        next page
      </button>
    </div>
  )
}

export default PaginationControls