import React from 'react';

const getSocialIconPath = (social) => {
  switch (social) {
    case 'github':
      return "M12 0.5C5.73 0.5 0.5 5.73 0.5 12c0 5.08 3.29 9.38 7.86 10.91.57.1.78-.25.78-.55v-2.1c-3.2.7-3.87-1.54-3.87-1.54-.52-1.32-1.28-1.67-1.28-1.67-1.05-.72.08-.71.08-.71 1.16.08 1.77 1.19 1.77 1.19 1.03 1.76 2.7 1.25 3.36.96.1-.75.4-1.25.72-1.54-2.56-.29-5.26-1.28-5.26-5.7 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.04 0 0 .97-.31 3.18 1.18a11.1 11.1 0 012.9-.39c.98.01 1.97.13 2.9.39 2.2-1.49 3.17-1.18 3.17-1.18.63 1.58.23 2.75.11 3.04.74.81 1.19 1.84 1.19 3.1 0 4.43-2.7 5.41-5.27 5.7.41.35.77 1.04.77 2.1v3.12c0 .31.21.66.79.55A11.5 11.5 0 0023.5 12c0-6.27-5.23-11.5-11.5-11.5z";
    case 'linkedin':
      return "M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z M2 4a2 2 0 114 0 2 2 0 01-4 0";
    default:
      return "";
  }
};

const SocialMediaLinks = ({ links, iconColor }) => {
  return (
    <div className="flex justify-center mt-4 space-x-4">
      {links.map((link) => (
        <a key={link.name} href={link.url} className={`${iconColor} hover:text-blue-700 transition-colors duration-300`} target="_blank" rel="noopener noreferrer">
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d={getSocialIconPath(link.name)} />
          </svg>
        </a>
      ))}
    </div>
  );
};

const AboutUs = ({ darkMode }) => {
  const bgColor = darkMode ? 'bg-gray-800' : 'bg-white';
  const textColor = darkMode ? 'text-gray-100' : 'text-gray-800';
  const headingColor = darkMode ? 'text-gray-100' : 'text-gray-800';
  const subHeadingColor = darkMode ? 'text-gray-300' : 'text-gray-600';
  const cardBgColor = darkMode ? 'bg-gray-700' : 'bg-white';
  const cardTextColor = darkMode ? 'text-gray-300' : 'text-gray-600';
  const iconColor = darkMode ? 'text-blue-400' : 'text-blue-600';

  const teamMembers = [
    {
      name: 'Omer Nasir',
      role: ' Assistant AI Engineer',
      image: 'https://tailone.tailwindtemplate.net/src/img/dummy/avatar1.png',
      socialLinks: [
        { name: 'github', url: 'https://github.com/derex-cmd' },
        { name: 'linkedin', url: 'https://www.linkedin.com/in/omer-nasir-derex-cmd/' },
      ],
    },
    {
      name: 'Kynat Mansha',
      role: 'Backend Developer',
      image: 'https://tailone.tailwindtemplate.net/src/img/dummy/avatar3.png',
      socialLinks: [
        { name: 'github', url: 'https://github.com/Kynat-Mansha03' },
        { name: 'linkedin', url: 'https://www.linkedin.com/in/kynat-mansha-7b54252b1/' },
      ],
    },
    {
      name: 'Hassaan Farooq ',
      role: 'UI/UX Designer',
      image: 'https://tailone.tailwindtemplate.net/src/img/dummy/avatar2.png',
      socialLinks: [
        { name: 'github', url: 'https://github.com/' },
        { name: 'linkedin', url: 'https://www.linkedin.com/in/hassaan-farooq-844541148/' },
      ],
    },
    {
      name: 'Muhammad Yahya ',
      role: 'Senior AI Engineer',
      image: 'https://tailone.tailwindtemplate.net/src/img/dummy/avatar4.png',
      socialLinks: [
        { name: 'github', url: 'https://github.com/dotyahya' },
        { name: 'linkedin', url: 'https://www.linkedin.com/in/myahyanaeem/' },
      ],
    },
  ];

  return (
    <section id="team" className={`${bgColor} ${textColor} py-20`}>
      <div className="container mx-auto px-4">
        <header className="text-center mb-12">
          <h2 className={`text-3xl sm:text-4xl font-bold mb-2 ${headingColor}`}>
            <span className="font-light">Our</span> Team
          </h2>
          <svg className="w-16 h-8 mx-auto" viewBox="0 0 100 60">
            <circle cx="50.1" cy="30.4" r="5" className={`stroke-current ${iconColor} fill-transparent stroke-2`} />
            <line x1="55.1" y1="30.4" x2="100" y2="30.4" className={`stroke-current ${iconColor} stroke-2`} />
            <line x1="45.1" y1="30.4" x2="0" y2="30.4" className={`stroke-current ${iconColor} stroke-2`} />
          </svg>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <div key={index} className={`${cardBgColor} rounded-lg overflow-hidden shadow-lg transition-transform duration-300 hover:scale-105`}>
              <div className="p-6">
                <img src={member.image} alt={member.name} className="w-32 h-32 rounded-full mx-auto mb-4" />
                <h3 className={`text-xl font-bold text-center ${headingColor}`}>{member.name}</h3>
                <p className={`text-center ${subHeadingColor}`}>{member.role}</p>
                <SocialMediaLinks links={member.socialLinks} iconColor={iconColor} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutUs;