export default function HowItWorks() {
  const steps = [
    {
      number: '01',
      title: 'Register Your School',
      description: 'Sign up with your school details in just a few seconds. Verify your email and you\'re all set.',
      icon: '📝',
    },
    {
      number: '02',
      title: 'Add Your Details',
      description: 'Customize your school information, upload logo, add photos, and configure your preferences.',
      icon: '⚙️',
    },
    {
      number: '03',
      title: 'Your Website is Ready',
      description: 'Your professional school website is live! Share it with parents, students, and the community.',
      icon: '🚀',
    },
  ];

  return (
    <section id="how-it-works" className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            How It Works
          </h2>
          <p className="text-xl text-gray-600">
            Get your school website live in three simple steps
          </p>
        </div>

        {/* Steps */}
        <div className="grid md:grid-cols-3 gap-8 relative">
          {/* Connection Line */}
          <div className="hidden md:block absolute top-32 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 via-blue-400 to-transparent"></div>

          {steps.map((step, index) => (
            <div key={index} className="relative">
              {/* Step Card */}
              <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition duration-300 h-full relative z-10">
                <div className="flex items-center justify-between mb-6">
                  <div className="text-5xl">{step.icon}</div>
                  <div className="text-4xl font-bold text-blue-600 opacity-30">{step.number}</div>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">{step.title}</h3>
                <p className="text-gray-600 leading-relaxed">{step.description}</p>

                {/* Step Indicator */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-32 -right-4 w-8 h-8 bg-blue-600 rounded-full text-white font-bold flex items-center justify-center text-sm">
                    →
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <p className="text-lg text-gray-600 mb-6">
            Ready to transform your school's online presence?
          </p>
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-10 rounded-lg transition duration-200 transform hover:scale-105 shadow-lg text-lg">
            Get Started for Free
          </button>
        </div>
      </div>
    </section>
  );
}
