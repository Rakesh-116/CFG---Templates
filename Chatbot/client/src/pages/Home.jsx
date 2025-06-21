const Home = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl md:text-6xl">
            Welcome to Caring Hearts
          </h1>
          <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            Dedicated to providing support and care for underprivileged children
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {/* Service Cards */}
          <ServiceCard
            title="Educational Support"
            description="Providing academic tutoring, school supplies, and scholarship programs."
            icon="📚"
          />
          <ServiceCard
            title="Healthcare"
            description="Offering regular health check-ups and nutritious meal programs."
            icon="🏥"
          />
          <ServiceCard
            title="Safe Housing"
            description="Emergency shelter services and foster care coordination."
            icon="🏠"
          />
          <ServiceCard
            title="Counseling"
            description="Professional mental health support and family therapy."
            icon="🤝"
          />
          <ServiceCard
            title="Skill Development"
            description="Life skills training and creative arts programs."
            icon="🎨"
          />
          <ServiceCard
            title="Community Support"
            description="Building a supportive community for children in need."
            icon="👥"
          />
        </div>
      </div>
    </div>
  );
};

const ServiceCard = ({ title, description, icon }) => {
  return (
    <div className="bg-white overflow-hidden shadow rounded-lg">
      <div className="p-6">
        <div className="text-3xl mb-3">{icon}</div>
        <h3 className="text-lg font-medium text-gray-900">{title}</h3>
        <p className="mt-2 text-base text-gray-500">{description}</p>
      </div>
    </div>
  );
};

export default Home;
