import React from 'react';
import { FaTruck, FaShieldAlt, FaSync, FaHeadset } from 'react-icons/fa';

const Features = () => {
  const features = [
    {
      icon: FaTruck,
      title: 'Free Delivery',
      description: 'Free shipping on orders above ₹500'
    },
    {
      icon: FaShieldAlt,
      title: '100% Authentic',
      description: 'Certified authentic sarees from verified sellers'
    },
    {
      icon: FaSync,
      title: 'Easy Returns',
      description: '7-day return policy, no questions asked'
    },
    {
      icon: FaHeadset,
      title: '24/7 Support',
      description: 'Dedicated customer support team'
    }
  ];

  return (
    <section className="bg-cream py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <div key={idx} className="text-center">
                <div className="text-4xl text-olive-dark mb-4 flex justify-center">
                  <Icon />
                </div>
                <h3 className="font-bold text-lg mb-2 text-olive-dark">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Features;
