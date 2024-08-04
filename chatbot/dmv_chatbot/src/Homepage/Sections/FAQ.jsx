import React from 'react'

const FAQ = ({ darkMode }) => {
  const bgColor = darkMode ? 'bg-gray-800' : 'bg-white'
  const textColor = darkMode ? 'text-gray-200' : 'text-gray-900'
  const borderColor = darkMode ? 'border-gray-700' : 'border-gray-100'
  const dividerColor = darkMode ? 'divide-gray-700' : 'divide-gray-100'
  const paragraphColor = darkMode ? 'text-gray-300' : 'text-gray-700'

  return (
    <section>
      <div className={`divide-y ${dividerColor} rounded-xl border ${borderColor} ${bgColor}`}>
        <details
          className="group p-6 [&_summary::-webkit-details-marker]:hidden"
          open
        >
          <summary className={`flex cursor-pointer items-center justify-between gap-1.5 ${textColor}`}>
            <h2 className="text-lg font-medium">
              Lorem ipsum dolor sit amet consectetur adipisicing?
            </h2>

            <span className="relative size-5 shrink-0">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="absolute inset-0 size-5 opacity-100 group-open:opacity-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>

              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="absolute inset-0 size-5 opacity-0 group-open:opacity-100"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </span>
          </summary>

          <p className={`mt-4 leading-relaxed ${paragraphColor}`}>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ab hic
            veritatis molestias culpa in, recusandae laboriosam neque aliquid
            libero nesciunt voluptate dicta quo officiis explicabo
            consequuntur distinctio corporis earum similique!
          </p>
        </details>

        <details className="group p-6 [&_summary::-webkit-details-marker]:hidden">
          <summary className={`flex cursor-pointer items-center justify-between gap-1.5 ${textColor}`}>
            <h2 className="text-lg font-medium">
              Lorem ipsum dolor sit amet consectetur adipisicing?
            </h2>

            <span className="relative size-5 shrink-0">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="absolute inset-0 size-5 opacity-100 group-open:opacity-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>

              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="absolute inset-0 size-5 opacity-0 group-open:opacity-100"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </span>
          </summary>

          <p className={`mt-4 leading-relaxed ${paragraphColor}`}>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ab hic
            veritatis molestias culpa in, recusandae laboriosam neque aliquid
            libero nesciunt voluptate dicta quo officiis explicabo
            consequuntur distinctio corporis earum similique!
          </p>
        </details>
      </div>
    </section>
  )
}

export default FAQ