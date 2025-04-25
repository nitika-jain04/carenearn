import React from "react";
import { Link } from "react-router";

const Services = () => {
  return (
    <div className="my-10 mx-10 flex flex-col gap-20">
      <div className="flex flex-col text-center gap-5">
        <p className="text-rose-500 text-4xl font-bold">Our Services</p>

        <div className="flex justify-center">
          <div className="w-20 h-1 bg-rose-500 rounded-full mb-6"></div>
        </div>

        <p className="px-10">
          CareNearn is an Indian-based care-giving platform offering trusted
          respite care for children and young individuals aged 3-21 with special
          needs. We help families and primary care-givers take well-deserved
          breaks by providing compassionate, in-home support. Our trained care
          providers engage individuals in meaningful activities like baking,
          sensory play and art along with assured company to doctor appointments
          and community outings. With a focus on enhancing social and life
          skills, CareNearn ensures comfort, safety and personal growth
          <span className="font-medium">
            {" "}
            services start at 500-1200 per hour
          </span>
          , with flexible monthly plans available. We proudly serve families
          across India with care that feels like family.
        </p>
      </div>

      <div className="flex flex-col text-center gap-5">
        <p className="text-rose-500 text-4xl font-bold">About Us</p>

        <div className="flex justify-center">
          <div className="w-20 h-1 bg-rose-500 rounded-full mb-6"></div>
        </div>

        <p className="px-10 lg:px-72">
          Carenearn is about creating a platform a symbiotic relations, where
          the emptiness of the elders who are still active but totally free, the
          students for gig work and relatively free but highly educated people
          to contribute to needy families, with kids or elders to be looked
          after, in creative and meaningful ways.{" "}
          <span className="text-blue-600 font-semibold tracking-tight">
            <Link to="/about-us"> LEARN MORE&gt;</Link>
          </span>
        </p>
      </div>
    </div>
  );
};

export default Services;
