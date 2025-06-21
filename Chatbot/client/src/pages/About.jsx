const About = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2 className="text-base text-blue-600 font-semibold tracking-wide uppercase">
            About Us
          </h2>
          <p className="mt-2 text-3xl leading-8 font-bold tracking-tight text-gray-900 sm:text-4xl">
            Making a difference in children's lives
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
            Learn about our mission, vision, and the impact we're making in the
            community.
          </p>
        </div>

        <div className="mt-16">
          <div className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
            <div className="bg-white shadow overflow-hidden sm:rounded-lg">
              <div className="px-4 py-5 sm:px-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  Our Mission
                </h3>
                <p className="mt-4 text-gray-600">
                  To provide comprehensive support and care for underprivileged
                  children, ensuring they have access to education, healthcare,
                  and a nurturing environment to thrive.
                </p>
              </div>
            </div>

            <div className="bg-white shadow overflow-hidden sm:rounded-lg">
              <div className="px-4 py-5 sm:px-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  Our Vision
                </h3>
                <p className="mt-4 text-gray-600">
                  A world where every child has equal opportunities to grow,
                  learn, and succeed, regardless of their circumstances.
                </p>
              </div>
            </div>

            <div className="bg-white shadow overflow-hidden sm:rounded-lg md:col-span-2">
              <div className="px-4 py-5 sm:px-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  Our Impact
                </h3>
                <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-blue-600">5000+</p>
                    <p className="text-gray-600">Children Supported</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-blue-600">20+</p>
                    <p className="text-gray-600">Programs</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-blue-600">15</p>
                    <p className="text-gray-600">Years of Service</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
