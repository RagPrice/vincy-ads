const About = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">About Vincy Ads</h1>
      
      <div className="prose lg:prose-xl">
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Your Local Marketplace</h2>
          <p>
            Vincy Ads is the premier online marketplace for Saint Vincent and the Grenadines,
            connecting local buyers and sellers in a safe, easy-to-use platform.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
          <p>
            We aim to create a vibrant online community where Vincentians can easily buy,
            sell, and discover items and services. Our platform is designed to support
            local commerce and make transactions simple and secure.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Features</h2>
          <ul className="list-disc pl-6">
            <li>Easy listing creation</li>
            <li>Secure messaging system</li>
            <li>Local categories and search</li>
            <li>Mobile-friendly design</li>
            <li>Community reviews and ratings</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
          <p>
            Have questions or suggestions? We'd love to hear from you!
            Email us at: support@vincyads.com
          </p>
        </section>
      </div>
    </div>
  );
};

export default About;
