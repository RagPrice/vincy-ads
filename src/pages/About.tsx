const About = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-blue-600">About Vincy Ads</h1>
      
      <div className="prose lg:prose-xl">
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Your Local Marketplace</h2>
          <p className="text-gray-700">
            Welcome to Vincy Ads - the premier online marketplace for Saint Vincent and the Grenadines!
            We connect local buyers and sellers in a safe, easy-to-use platform designed specifically
            for our community.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
          <p className="text-gray-700">
            Our mission is to create a vibrant online community where Vincentians can easily buy,
            sell, and discover items and services. We're committed to supporting local commerce
            and making transactions simple, secure, and enjoyable.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Features</h2>
          <ul className="list-disc pl-6 text-gray-700">
            <li>Quick and easy listing creation</li>
            <li>Secure messaging system</li>
            <li>Local categories tailored to SVG</li>
            <li>Mobile-friendly design</li>
            <li>Community reviews and ratings</li>
            <li>Real-time search functionality</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
          <p className="text-gray-700">
            Have questions or suggestions? We'd love to hear from you!<br />
            Email us at: <a href="mailto:support@vincyads.com" className="text-blue-600 hover:text-blue-800">support@vincyads.com</a>
          </p>
        </section>
      </div>
    </div>
  );
};

export default About;
