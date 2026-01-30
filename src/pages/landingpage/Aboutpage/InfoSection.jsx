import React from "react";

const InfoSection = () => {
  return (
    <section className="max-w-7xl mx-auto px-6 py-16">
      {/* Top Content */}
      <div className="grid md:grid-cols-2 gap-10 items-start mb-12">
        <h2 className="text-3xl md:text-4xl font-semibold text-black leading-snug">
          Et nunc ut tempus duis nisl sed massa
        </h2>

        <p className="text-gray-600 text-sm leading-relaxed">
          Nunc sed a nisl purus. Nibh dis faucibus proin lacus tristique. Sit
          congue non vitae odio sit erat in. Felis eu ultrices a sed massa.
          Commodo fringilla sed tempor risus laoreet ultrices ipsum. Habitasse
          morbi faucibus in iaculis lectus. Nisi enim feugiat enim volutpat. Sem
          quis viverra viverra odio mauris nunc.
        </p>
      </div>

      {/* Blurred Image Box */}
      <div className="relative w-full h-[300px] md:h-[450px] rounded-2xl overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f"
          alt="dummy"
          className="w-full h-full object-cover blur-lg scale-110 opacity-80"
        />
      </div>
    </section>
  );
};

export default InfoSection;
