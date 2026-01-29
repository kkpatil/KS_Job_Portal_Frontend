import React from "react";
import { FaStar } from "react-icons/fa";

const testimonials = [
  {
    title: "Amazing services",
    text: `Metus faucibus sed turpis lectus feugiat tincidunt.
    Rhoncus sed tristique in dolor. Mus etiam et vestibulum venenatis`,
    name: "Marco Kihn",
    role: "Happy Client",
    image: "https://i.pravatar.cc/100?img=12",
  },
  {
    title: "Everything simple",
    text: `Mus etiam et vestibulum venenatis viverra ut.
    Elit morbi bibendum ullamcorper augue faucibus`,
    name: "Kristin Hester",
    role: "Happy Client",
    image: "https://i.pravatar.cc/100?img=32",
  },
  {
    title: "Awesome, thank you!",
    text: `Rhoncus sed tristique in dolor. Mus etiam et
    vestibulum venenatis viverra ut. Elit morbi bibendum ullamcorper`,
    name: "Zion Cisneros",
    role: "Happy Client",
    image: "https://i.pravatar.cc/100?img=45",
  },
];

function Testimonials() {
  return (
    <section className="bg-[#eef7f6] py-24">
      <div className="max-w-7xl mx-auto px-6">
        {/* Heading */}
        <div className="text-center mb-16 animate-[fadeDown_0.8s_ease-out]">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Testimonials from Our Customers
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto">
            At eu lobortis pretium tincidunt amet lacus ut aenean aliquet.
            Blandit a massa elementum id.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((item, index) => (
            <div
              key={index}
              className="
                group
                bg-white
                rounded-2xl
                p-8
                shadow
                transition-all
                duration-300
                hover:shadow-2xl
                hover:-translate-y-2
                animate-[fadeUp_1s_ease-out]
              "
            >
              {/* Stars */}
              <div className="flex gap-1 mb-4 text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} />
                ))}
              </div>

              {/* Title */}
              <h3 className="text-lg font-semibold mb-3">{item.title}</h3>

              {/* Text */}
              <p className="text-gray-500 text-sm leading-relaxed mb-8">
                {item.text}
              </p>

              {/* Footer */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="text-sm font-semibold">{item.name}</h4>
                    <p className="text-xs text-gray-400">{item.role}</p>
                  </div>
                </div>

                {/* Quote Icon */}
                <span className="text-[#309689] text-4xl leading-none">“</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Testimonials;
