export default function DeveloperProfile() {
  return (
    <section className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900 py-20 transition-colors duration-300">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-4">
            About the Developer
          </h1>
          <div className="h-1 w-20 bg-blue-600 dark:bg-blue-500 mx-auto rounded-full"></div>
        </div>

        {/* Main Content */}
        <div className="grid md:grid-cols-3 gap-12 items-center">
          {/* Profile Image */}
          <div className="flex justify-center md:col-span-1">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-400 rounded-2xl transform rotate-6 blur-xl opacity-30"></div>
            <div className="relative bg-white dark:bg-gray-800 p-2 rounded-2xl shadow-2xl dark:shadow-gray-700/50">
                <img
                  src="https://edunetfoundation.org/wp-content/uploads/2026/01/Majid-Yaseen-Qurashi.webp"
                  alt="Majid Yaseen Qurashi"
                  className="w-full h-auto rounded-xl object-cover max-w-sm"
                />
              </div>
            </div>
          </div>

          {/* About Content */}
          <div className="md:col-span-2">
            {/* Name and Title */}
            <div className="mb-8">
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">Majid Yaseen Qurashi</h2>
              <p className="text-xl text-blue-600 dark:text-blue-400 font-semibold">Full Stack Developer & Tech Entrepreneur</p>
            </div>

            {/* About Text */}
            <div className="space-y-6 text-gray-700 dark:text-gray-300 leading-relaxed">
              <p className="text-lg">
                I am <span className="font-semibold text-gray-900 dark:text-white">Majid Yaseen Qurashi</span>, a passionate final-year BTech student specializing in 
                <span className="font-semibold text-gray-900 dark:text-white"> Computer Science & Engineering</span> at 
                <span className="font-semibold text-gray-900 dark:text-white"> Government College of Engineering & Technology (GCET)</span>, Safapora, Kashmir.
              </p>

              <p>
                With a keen interest in web development and emerging technologies, I am dedicated to building innovative solutions 
                that solve real-world problems. My academic journey has equipped me with strong fundamentals in data structures, 
                algorithms, and software engineering principles.
              </p>

              <p>
                <span className="font-semibold text-gray-900 dark:text-white">School Website Builder</span> is a project I am leading to gain practical 
                experience in full-stack development, product design, and project management. This project demonstrates my ability to 
                translate ideas into functional web applications using modern technologies like React, Next.js, TypeScript, and Tailwind CSS.
              </p>

              <p>
                Through this initiative, I aim to:
              </p>

              <ul className="space-y-3 ml-4">
                <li className="flex gap-3">
                  <span className="text-blue-600 dark:text-blue-400 font-bold">✓</span>
                  <span>Develop practical skills in modern web development frameworks and tools</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-blue-600 dark:text-blue-400 font-bold">✓</span>
                  <span>Create a valuable product that benefits the education sector</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-blue-600 dark:text-blue-400 font-bold">✓</span>
                  <span>Build a portfolio showcasing real-world project experience</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-blue-600 dark:text-blue-400 font-bold">✓</span>
                  <span>Contribute to the digital transformation of educational institutions</span>
                </li>
              </ul>
            </div>

            {/* Skills Section */}
            <div className="mt-10">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Technical Skills</h3>
              <div className="flex flex-wrap gap-3">
                {['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'JavaScript', 'Python', 'HTML/CSS', 'Git', 'Node.js', 'SQL'].map(
                  (skill) => (
                    <div
                      key={skill}
                      className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full font-semibold text-sm hover:bg-blue-200 transition"
                    >
                      {skill}
                    </div>
                  )
                )}
              </div>
            </div>

            {/* Connect Section */}
            <div className="mt-10 p-6 bg-blue-50 rounded-xl border border-blue-200">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Let's Connect</h3>
              <p className="text-gray-700 mb-4">
                I'm always interested in discussing web development, tech innovations, and potential opportunities. Feel free to reach out!
              </p>
              <div className="flex flex-wrap gap-4">
                <a
                  href="mailto:majid_cse_220365@gcetkashmir.ac.in"
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition"
                >
                  Send Email
                </a>
                <a
                  href="https://in.linkedin.com/in/majidqurashi"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border-2 border-blue-600 text-blue-600 hover:bg-blue-50 font-semibold py-2 px-6 rounded-lg transition"
                >
                  LinkedIn
                </a>
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border-2 border-blue-600 text-blue-600 hover:bg-blue-50 font-semibold py-2 px-6 rounded-lg transition"
                >
                  GitHub
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-20 text-center">
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl p-10 text-white">
            <h2 className="text-3xl font-bold mb-4">Back to School Website Builder</h2>
            <p className="text-blue-100 mb-6 text-lg">
              Ready to build your school's website? Let's get started!
            </p>
            <a
              href="/"
              className="inline-block bg-white hover:bg-gray-100 text-blue-600 font-bold py-3 px-8 rounded-lg transition"
            >
              Go to Home Page
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
