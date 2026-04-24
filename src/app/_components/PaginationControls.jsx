'use client'

import { useRouter } from 'next/navigation';

const PaginationControls = () => {
  const router = useRouter()

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
