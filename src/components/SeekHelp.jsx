import React, { useEffect, useState, useCallback } from "react";

// ─── Reusable animated image + highlighted-list card ────────────────────────
function ServiceCard({ title, items, images, currentIndex, onItemClick }) {
  const [fadeKey, setFadeKey] = useState(currentIndex);
  const [isVisible, setIsVisible] = useState(true);

  // Smooth crossfade when the index changes
  useEffect(() => {
    setIsVisible(false); // start fade-out
    const timeout = setTimeout(() => {
      setFadeKey(currentIndex); // swap image
      setIsVisible(true); // fade-in
    }, 300);
    return () => clearTimeout(timeout);
  }, [currentIndex]);

  return (
    <div className="flex flex-col lg:flex-row gap-8 justify-between rounded-2xl shadow-lg p-8 lg:p-10 bg-white border border-rose-200 hover:shadow-xl transition-shadow duration-300">
      {/* Left — title + list */}
      <div className="flex flex-col gap-4 lg:gap-6 lg:w-1/2">
        <p className="text-3xl font-bold text-rose-500">{title}</p>

        <ul className="flex flex-col gap-2 text-lg tracking-wide">
          {items.map((item, idx) => {
            const isActive = idx === currentIndex;
            return (
              <li
                key={idx}
                onClick={() => onItemClick(idx)}
                className={`
                  px-4 py-2.5 rounded-lg cursor-pointer
                  transition-all duration-400 ease-in-out select-none
                  ${isActive
                    ? "bg-rose-50 text-rose-600 font-semibold shadow-sm"
                    : "text-gray-700 hover:bg-rose-50/60"
                  }
                `}
              >
                <span>{item}</span>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Right — image with crossfade */}
      <div className="lg:w-1/2 flex justify-center items-center relative">
        <div className="relative w-96 lg:h-72 h-80 rounded-xl overflow-hidden shadow-md">
          <img
            src={images[fadeKey]}
            alt={`${title} – ${items[fadeKey] || ""}`}
            className={`
              absolute inset-0 w-full h-full object-cover
              transition-opacity duration-500 ease-in-out
              ${isVisible ? "opacity-100" : "opacity-0"}
            `}
          />
          {/* Subtle gradient overlay at bottom */}
          <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black/20 to-transparent" />
        </div>
      </div>
    </div>
  );
}

// ─── Main component ─────────────────────────────────────────────────────────
function SeekHelp() {
  const childhelp = [
    "/homework-help.jpg",
    "/admin2.jpg",
    "/admin3.webp",
    "/admin4.jpg",
    "/admin6.jpg",
  ];

  const activities = [
    "/acti4.jpg",
    "/acti2.jpg",
    "/acti5.jpg",
    "/acti3.jpg",
    "/acti1.jpg",
  ];

  const senior = [
    "/hospital.jpg",
    "/reading.jpg",
    "/piano.jpg",
    "/mall.jpg",
    "/games.jpg",
  ];

  const adminImages = [
    "/admin1.jpg",
    "/admin2.jpg",
    "/admin3.webp",
    "/admin4.jpg",
    "/admin6.jpg",
  ];

  const childItems = [
    "Homework Support",
    "Project Assistance",
    "Exam Preparation",
    "Skill Enhancement",
  ];
  const activityItems = [
    "Chess / Board Games",
    "Story Sessions",
    "Creative Arts / Painting / Sculpture",
    "Creative Games / Lego / Builders / Writings",
    "Any Other",
  ];
  const seniorItems = [
    "Take them to hospital",
    "Spend time reading books and stories",
    "Engaging them in any activity they like",
    "Take them to mall / shopping",
    "Play games with elders",
  ];
  const homeAdminItems = [
    "Organise my party",
    "Organise games & fun activities",
    "Food / Bakery / Dessert",
  ];

  // Each card has its own independent index for auto-rotation
  const [childIdx, setChildIdx] = useState(0);
  const [activityIdx, setActivityIdx] = useState(0);
  const [seniorIdx, setSeniorIdx] = useState(0);
  const [adminIdx, setAdminIdx] = useState(0);

  // Auto-rotate with staggered timing for visual variety
  useEffect(() => {
    const t1 = setInterval(
      () => setChildIdx((i) => (i + 1) % childItems.length),
      3000
    );
    const t2 = setInterval(
      () => setActivityIdx((i) => (i + 1) % activityItems.length),
      3500
    );
    const t3 = setInterval(
      () => setSeniorIdx((i) => (i + 1) % seniorItems.length),
      4000
    );
    const t4 = setInterval(
      () => setAdminIdx((i) => (i + 1) % homeAdminItems.length),
      3200
    );
    return () => {
      clearInterval(t1);
      clearInterval(t2);
      clearInterval(t3);
      clearInterval(t4);
    };
  }, []);

  return (
    <div>
      {/* ── Hero Banner ────────────────────────────────────────────── */}
      <div className="relative">
        <img
          src="/our-vision.jpg"
          alt="About Us Banner"
          className="h-60 w-full object-cover object-center rounded-b-[100px]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-rose-600/70 to-pink-500/60 rounded-b-[100px]" />
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-white font-bold text-5xl md:text-6xl drop-shadow-lg">
            About Us
          </h1>
        </div>
      </div>

      {/* ── Our Mission ────────────────────────────────────────────── */}
      <section className="mt-12 mb-8">
        <p className="text-center font-bold text-4xl text-rose-500 tracking-wide mb-3">
          Our Mission
        </p>
        <div className="flex justify-center">
          <div className="w-20 h-1 bg-rose-500 rounded-full mb-6" />
        </div>
        <div className="bg-rose-400 rounded-2xl mx-6 md:mx-10">
          <div className="bg-pink-100 ml-4 flex flex-col py-10 px-5 text-base lg:text-lg tracking-wide rounded-2xl text-justify">
            Carenearn is about creating a platform of symbiotic relations, where
            the emptiness of the elders who are still active and have depth of
            knowledge and experience, the students for gig work and relatively
            free but highly educated people to contribute to needy families,
            with kids or elders to be looked after, in creative and meaningful
            ways.
          </div>
        </div>
      </section>

      {/* ── Why CareNearn ──────────────────────────────────────────── */}
      <section className="mb-8">
        <p className="text-center font-bold text-4xl text-rose-500 tracking-wide mb-3">
          Why CareNearn?
        </p>
        <div className="flex justify-center">
          <div className="w-20 h-1 bg-rose-500 rounded-full mb-6" />
        </div>
        <p className="px-6 md:px-20 pb-8 text-lg text-gray-700">
          We might have house help, probably an essential requirement but we are
          never sure if they are kind to our loved ones or if they are
          contributing to the cognitive behavioural well being of our child.
        </p>
        <div className="bg-rose-400 rounded-2xl mx-6 md:mx-10">
          <div className="bg-pink-100 ml-4 py-10 px-5 text-base lg:text-lg tracking-wide rounded-2xl text-justify">
            Let me quote the Nobel Laureates{" "}
            <span className="font-semibold underline underline-offset-4 decoration-2 decoration-pink-500 text-pink-600">
              David Hubel and Torsten Wiesel
            </span>
            , their research showed that kittens deprived of vision in one eye
            experienced limited development in the corresponding area of the
            brain.
          </div>
        </div>

        <p className="px-6 md:px-20 text-lg py-5 text-gray-700">
          This experiment shows the effect of providing children with
          stimulating experiences nurtures their cognitive abilities.
        </p>
      </section>

      {/* ── Brain Architecture Box ─────────────────────────────────── */}
      <div className="bg-rose-400 rounded-2xl mx-6 md:mx-10 mb-8">
        <div className="bg-pink-100 ml-4 flex flex-col py-10 px-6 text-base lg:text-lg tracking-wide rounded-2xl">
          <p className="font-semibold text-lg mb-4">
            Building Brain Architecture in Early Childhood:
          </p>
          <ul className="space-y-2 list-disc list-inside text-gray-800">
            <li>
              Over <strong>1 million</strong> new neural connections are formed
              every second in the early years.
            </li>
            <li>
              This rapid synapse formation supports high brain plasticity —
              crucial for learning.
            </li>
            <li>
              Stimulating environments enhance both cognitive development and
              emotional regulation.
            </li>
            <li>
              Non-vibrant surroundings may lead to impaired connectivity and
              learning difficulties.
            </li>
          </ul>
        </div>
      </div>

      <p className="px-6 md:px-20 text-lg text-gray-700 mb-12">
        We at CareNearn intend to enhance the life of our children by giving
        vibrant interaction which may include painting, story telling, building
        blocks and many activities. A story read to our parents or taking them
        to a mall may alleviate their mood and thus make a happier home as well
        as give some breathing space to you!
      </p>

      {/* ── Seek Help – Service Cards ─────────────────────────────── */}
      <p className="text-center font-bold text-4xl text-rose-500 tracking-wide mb-3">
        Seek Help
      </p>
      <div className="flex justify-center">
        <div className="w-20 h-1 bg-rose-500 rounded-full mb-8" />
      </div>

      <div className="grid grid-rows-1 gap-10 lg:gap-16 lg:px-20 px-6 md:px-10 pb-4">
        <ServiceCard
          title="Child Education"
          items={childItems}
          images={childhelp}
          currentIndex={childIdx}
          onItemClick={setChildIdx}
        />

        <ServiceCard
          title="Activities"
          items={activityItems}
          images={activities}
          currentIndex={activityIdx}
          onItemClick={setActivityIdx}
        />

        <ServiceCard
          title="Care of Loved Ones – The Seniors"
          items={seniorItems}
          images={senior}
          currentIndex={seniorIdx}
          onItemClick={setSeniorIdx}
        />

        <ServiceCard
          title="The Home Admin"
          items={homeAdminItems}
          images={adminImages}
          currentIndex={adminIdx}
          onItemClick={setAdminIdx}
        />
      </div>
    </div>
  );
}

export default SeekHelp;
