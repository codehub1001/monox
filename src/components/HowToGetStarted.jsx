import { FaUserPlus, FaWallet, FaChartLine, FaUserTie } from "react-icons/fa";
import { motion } from "framer-motion";

const steps = [
  {
    id: 1,
    title: "Signup",
    icon: <FaUserPlus className="text-yellow-500 text-3xl" />,
    desc: "Create an account in minutes to start your trading journey."
  },
  {
    id: 2,
    title: "Fund your account",
    icon: <FaWallet className="text-yellow-500 text-3xl" />,
    desc: "Easily deposit funds using our secure payment gateways."
  },
  {
    id: 3,
    title: "Select a Trader",
    icon: <FaUserTie className="text-yellow-500 text-3xl" />,
    desc: "Choose from verified expert traders that suit your goals."
  },
  {
    id: 4,
    title: "Generate Profit",
    icon: <FaChartLine className="text-yellow-500 text-3xl" />,
    desc: "Sit back and watch your investment grow automatically."
  }
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.2, duration: 0.6, ease: "easeOut" },
  }),
};

export default function HowToGetStarted() {
  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white text-center" id="how-to-get-started">
      <div className="max-w-6xl mx-auto px-6">
        <motion.button
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-yellow-500 text-white px-6 py-2 rounded-lg font-medium mb-6 hover:scale-105 transition-transform duration-300 shadow-md"
        >
          How To Get Started
        </motion.button>

        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-12"
        >
          Monox Trades <span className="text-yellow-500">We Make Trading Easy</span>
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={step.id}
              custom={index}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="flex items-start gap-4 p-6 bg-white rounded-2xl shadow-md hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300 cursor-pointer"
            >
              <div className="bg-yellow-50 p-4 rounded-xl flex items-center justify-center shadow-inner">
                {step.icon}
              </div>
              <div className="text-left">
                <h3 className="font-bold text-lg mb-1 text-gray-900">{step.id}. {step.title}</h3>
                <p className="text-gray-600 text-sm">{step.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
