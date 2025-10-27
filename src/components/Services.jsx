import React from 'react';
import { motion } from 'framer-motion';

const services = [
  {
    title: 'Business Planning Services',
    description: 'Strategic business plans, growth roadmaps and market entry support.',
  },
  {
    title: 'Long-Term Care Planning Services',
    description: 'Insurance, care coordination and future-cost modeling for peace of mind.',
  },
  {
    title: 'Financial Planning Services',
    description: 'Cashflow, budgeting and investment strategies tailored to your goals.',
  },
  {
    title: 'Estate Planning Services',
    description: 'Wills, trusts and legacy planning to protect what matters most.',
  },
  {
    title: 'Retirement Planning Services',
    description: 'Retirement income modeling, tax-efficient withdrawals and timeline planning.',
  },
  {
    title: 'Tax Planning Services',
    description: 'Tax optimization strategies, compliance and year-round tax support.',
  },
];

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

const PlanningServices = () => {
  return (
    <section className="bg-gradient-to-b from-gray-50 to-white py-20">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl sm:text-5xl font-bold text-gray-900"
        >
          Planning Services
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-4 text-gray-600 max-w-2xl mx-auto text-lg"
        >
          Dive Deep Into Our Expertise — Explore All Our Planning Services
        </motion.p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-14">
          {services.map((service, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-2 transform transition-all duration-300 border border-gray-100 group relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10">
                <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-yellow-500 transition-colors duration-300">
                  {service.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">{service.description}</p>
              </div>
              <motion.div
                whileHover={{ x: 5 }}
                className="mt-6 inline-flex items-center text-yellow-500 text-sm font-medium group-hover:gap-2 transition-all duration-300 cursor-pointer"
              >
                Learn more
                <svg
                  className="w-4 h-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5 12h14M12 5l7 7-7 7"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </motion.div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-16 flex flex-col sm:flex-row justify-center gap-4"
        >
          <button className="px-8 py-3 rounded-full bg-yellow-500 text-white font-medium shadow-md hover:shadow-lg hover:scale-105 transition-transform duration-300">
            Get a Consultation
          </button>
          <button className="px-8 py-3 rounded-full border border-yellow-500 text-yellow-500 bg-white hover:bg-yellow-50 hover:scale-105 transition-transform duration-300">
            View All Services
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default PlanningServices;
