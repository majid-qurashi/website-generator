export default function Features() {
  const features = [
    {
      icon: '📊',
      title: 'Easy Dashboard',
      description: 'Intuitive control panel for managing all aspects of your school website. Simple, powerful, and designed for educators.',
    },
    {
      icon: '🎨',
      title: 'Ready Templates',
      description: 'Choose from professionally designed templates built specifically for educational institutions. Get started in seconds.',
    },
    {
      icon: '⚡',
      title: 'Fast Setup',
      description: 'Complete setup process in under 5 minutes. No technical knowledge required. Get your school online today.',
    },
    {
      icon: '🔒',
      title: 'Secure Data',
      description: 'Enterprise-grade security with SSL encryption and data backup. Keep your school information safe and protected.',
    },
  ];

  return (
    <section id="features" className="py-20 bg-white dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Powerful Features for Your School
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Everything you need to create and manage your school's online presence
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-gray-50 dark:bg-gray-800 p-8 rounded-xl hover:shadow-lg dark:hover:shadow-gray-700/50 transition duration-300 transform hover:scale-105"
            >
              <div className="text-5xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{feature.title}</h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
