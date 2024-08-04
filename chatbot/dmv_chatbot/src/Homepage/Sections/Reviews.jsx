import React from 'react'

const Reviews = ({ darkMode }) => {
  const bgColor = darkMode ? 'bg-gray-900' : 'bg-gray-50'
  const textColor = darkMode ? 'text-gray-100' : 'text-gray-900'
  const cardBgColor = darkMode ? 'bg-gray-800' : 'bg-white'
  const cardTextColor = darkMode ? 'text-gray-300' : 'text-gray-700'
  const headingColor = darkMode ? 'text-gray-100' : 'text-gray-900'
  const buttonTextColor = darkMode ? 'text-rose-400' : 'text-rose-600'
  const buttonHoverBg = darkMode ? 'hover:bg-rose-500' : 'hover:bg-rose-600'
  const buttonHoverText = 'hover:text-white'
  const starColor = darkMode ? 'text-green-400' : 'text-green-500'
  const reviewTitleColor = darkMode ? 'text-rose-400' : 'text-rose-600'

  return (
    <section className={bgColor}>
      <div className="mx-auto max-w-screen-2xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="md:flex md:items-end md:justify-between">
          <div className="max-w-xl">
            <h2 className={`text-4xl font-bold tracking-tight ${headingColor} sm:text-5xl`}>
              Read trusted reviews from our customers
            </h2>

            <p className={`mt-6 max-w-lg leading-relaxed ${cardTextColor}`}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur praesentium natus
              sapiente commodi. Aliquid sunt tempore iste repellendus explicabo dignissimos placeat,
              autem harum dolore reprehenderit quis! Quo totam dignissimos earum.
            </p>
          </div>

          <a
            href="#"
            className={`mt-6 inline-flex shrink-0 items-center gap-2 rounded-full border border-rose-600 px-5 py-3 ${buttonTextColor} transition ${buttonHoverBg} ${buttonHoverText} md:mt-0`}
          >
            <span className="font-medium"> Read all reviews </span>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="size-4 rtl:rotate-180"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          </a>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3">
          {[1, 2, 3].map((index) => (
            <blockquote key={index} className={`flex h-full flex-col justify-between ${cardBgColor} p-6 shadow-sm sm:p-8`}>
              <div>
                <div className={`flex gap-0.5 ${starColor}`}>
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className="h-5 w-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                      />
                    </svg>
                  ))}
                </div>

                <div className="mt-4">
                  <p className={`text-2xl font-bold ${reviewTitleColor} sm:text-3xl`}>Stayin' Alive</p>

                  <p className={`mt-4 leading-relaxed ${cardTextColor}`}>
                    No, Rose, they are not breathing. And they have no arms or legs … Where are they? You
                    know what? If we come across somebody with no arms or legs, do we bother resuscitating
                    them? I mean, what quality of life do we have there?
                  </p>
                </div>
              </div>

              <footer className={`mt-4 text-sm font-medium ${cardTextColor} sm:mt-6`}>
                &mdash; Michael Scott
              </footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Reviews