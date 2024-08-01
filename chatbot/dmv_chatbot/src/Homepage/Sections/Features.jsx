import React from 'react'

const Features = ({ darkMode }) => {
  const bgColor = darkMode ? 'bg-gray-900' : 'bg-white'
  const textColor = darkMode ? 'text-white' : 'text-gray-900'
  const subTextColor = darkMode ? 'text-gray-300' : 'text-gray-600'
  const cardBgColor = darkMode ? 'bg-gray-800' : 'bg-gray-100'
  const cardBorderColor = darkMode ? 'border-gray-700' : 'border-gray-200'
  const cardHoverBorderColor = darkMode ? 'hover:border-pink-500/10' : 'hover:border-pink-500/50'
  const cardHoverShadowColor = darkMode ? 'hover:shadow-pink-500/10' : 'hover:shadow-pink-500/50'
  const iconColor = 'text-pink-500'
  const buttonBgColor = 'bg-pink-600'
  const buttonHoverBgColor = 'hover:bg-pink-700'
  const buttonFocusRingColor = 'focus:ring-yellow-400'

  const features = [
    { title: 'Digital campaigns', description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex ut quo possimus adipisci distinctio alias voluptatum blanditiis laudantium.' },
    { title: 'Email Marketing', description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex ut quo possimus adipisci distinctio alias voluptatum blanditiis laudantium.' },
    { title: 'SEO Optimization', description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex ut quo possimus adipisci distinctio alias voluptatum blanditiis laudantium.' },
    { title: 'Social Media Management', description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex ut quo possimus adipisci distinctio alias voluptatum blanditiis laudantium.' },
    { title: 'Content Creation', description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex ut quo possimus adipisci distinctio alias voluptatum blanditiis laudantium.' },
    { title: 'Analytics & Reporting', description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex ut quo possimus adipisci distinctio alias voluptatum blanditiis laudantium.' },
  ]

  return (
    <section className={`${bgColor} ${textColor}`}>
      <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
        <div className="mx-auto max-w-lg text-center">
          <h2 className="text-3xl font-bold sm:text-4xl">
            Kickstart your marketing
          </h2>

          <p className={`mt-4 ${subTextColor}`}>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit.
            Consequuntur aliquam doloribus nesciunt eos fugiat. Vitae aperiam
            fugit consequuntur saepe laborum.
          </p>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <a
              key={index}
              className={`block rounded-xl border ${cardBorderColor} ${cardBgColor} p-8 shadow-xl transition ${cardHoverBorderColor} ${cardHoverShadowColor}`}
              href="#"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`size-10 ${iconColor}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M12 14l9-5-9-5-9 5 9 5z" />
                <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"
                />
              </svg>

              <h2 className="mt-4 text-xl font-bold">
                {feature.title}
              </h2>

              <p className={`mt-1 text-sm ${subTextColor}`}>
                {feature.description}
              </p>
            </a>
          ))}
        </div>

        <div className="mt-12 text-center">
          <a
            href="#"
            className={`inline-block rounded ${buttonBgColor} px-12 py-3 text-sm font-medium text-white transition ${buttonHoverBgColor} focus:outline-none focus:ring ${buttonFocusRingColor}`}
          >
            Get Started Today
          </a>
        </div>
      </div>
    </section>
  )
}

export default Features