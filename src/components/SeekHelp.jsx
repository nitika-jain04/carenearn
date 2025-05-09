import React, { useEffect, useState } from "react";
import { Fragment } from "react";

function SeekHelp() {
  const images = [
    "/admin1.jpg",
    "/admin2.jpg",
    "/admin3.webp",
    "/admin4.jpg",
    // "/admin5.jpg",
    // "/admin6.jpg",
  ];

  const activities = [
    "/acti1.jpg",
    "/acti2.jpg",
    "/acti3.jpg",
    "/acti4.jpg",
    "/acti5.jpg",
    // "/acti6.webp",
  ];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % activities.length);
    }, 2000); // Change image every 3 seconds

    return () => clearInterval(interval); // Cleanup
  }, []);

  return (
    <div className="">
      <div className="relative">
        <img
          src="/our-vision.jpg"
          alt=""
          className="h-60 w-full object-center rounded-b-[100px]"
        />
        <div className="absolute top-0 left-0 w-full h-full bg-rose-500 opacity-70 rounded-b-[100px]"></div>

        <div className="absolute top-[40%] left-[43%] text-white font-bold text-5xl">
          <p>About Us</p>
        </div>
      </div>

      <div>
        <p className="text-center font-bold text-4xl text-rose-500 tracking-wide mt-10 mb-3">
          Our Mission
        </p>

        <div className="flex justify-center">
          <div className="w-20 h-1 bg-rose-500 rounded-full mb-6"></div>
        </div>

        <div className="bg-rose-400 rounded-2xl mx-10">
          <div className="bg-pink-100 ml-4 flex flex-col py-10 px-5 text-base lg:text-lg tracking-wide rounded-2xl text-justify">
            Carenearn is about creating a platform a symbiotic relations, where
            the emptiness of the elders who are still active and have depth of
            knowledge and experience, the students for gig work and relatively
            free but highly educated people to contribute to needy families,
            with kids or elders to be looked after, in creative and meaningful
            ways.
          </div>
        </div>
      </div>

      <div>
        <p className="text-center font-bold text-4xl text-rose-500 tracking-wide mt-10 mb-3">
          Why careNearn?
        </p>
        <div className="flex justify-center">
          <div className="w-20 h-1 bg-rose-500 rounded-full mb-6"></div>
        </div>
        <p className="px-20 pb-10 text-lg">
          We might have house help, probably an essential requirement but we are
          never sure if there are kind to our loved ones or is she contributiong
          to the cognitive behavioural well being of our child.
        </p>
        <div className="bg-rose-400 rounded-2xl mx-10">
          <div className="bg-pink-100 ml-4 flex flex-col py-10 px-5 text-base lg:text-lg tracking-wide rounded-2xl text-justify">
            <div>
              {/* <p className="text-justify"> */}
              Let me quote the Nobel Laurettes{" "}
              <span className="font-semibold underline underline-offset-2 decoration-pink-500 text-pink-500">
                David Hubel and Torsten Wiesel
              </span>
              , their research showed that kittens deprived of vision in one eye
              experienced limited development in the corresponding area of the
              brain.
            </div>
          </div>
        </div>

        <div className="px-20 text-lg py-5">
          This experiment shows the effect of providing children with
          stimulating experiences nurtures their cognitive abilities.
        </div>
      </div>

      <div className="bg-rose-400 rounded-2xl mx-10">
        <div className="bg-pink-100 ml-4 flex flex-col py-10 px-5 text-base lg:text-lg tracking-wide rounded-2xl">
          <div>
            <span className="font-semibold">
              Building Brain Architecture in Early Childhood:
            </span>{" "}
            <br></br>
            <br></br>• Over 1 million new neural connections are formed every
            second in the early years.<br></br>• This rapid synapse formation
            supports high brain plasticity - crucial for learning. <br></br>•
            Stimulating environments are enhance both cognitive development and
            emotional regulation.
            <br></br>• Non-vibrant surroundings may lead to impaired
            connectivity and learning difficulties.
          </div>
        </div>
      </div>

      <div className="px-20 mt-10 text-lg">
        {" "}
        We at carenearn intend to enhance the life of our child by giving a
        vibrant interaction which may include painting, story telling, building
        blocks and many activities by A story read to our parents or taking them
        to a mall may alleviate their mood and thus make a happier home as well
        give some breathing space to you!
      </div>

      <p className="text-center font-bold text-4xl text-rose-500 tracking-wide mt-10 mb-3">
        Seek Help
      </p>

      <div className="flex justify-center">
        <div className="w-20 h-1 bg-rose-500 rounded-full mb-6"></div>
      </div>

      <div className="grid grid-rows-1 gap-10 lg:gap-20 lg:px-40 px-10">
        <div className="flex justify-between rounded-xl shadow-md p-10 transition-all duration-200 ease-in-out bg-white border hover:bg-rose-100 border-rose-500 hover:shadow-lg">
          <div className="flex flex-col gap-10 w-1/2">
            <div>
              <p className="text-3xl font-semibold text-rose-500">
                Child Education
              </p>
            </div>

            <div className="ml-5 list-disc flex flex-col gap-5 text-xl tracking-wide">
              <li
                className={`${currentImageIndex === 0 ? "font-semibold" : ""}`}
              >
                Homework Support
              </li>
              <li
                className={`${currentImageIndex === 1 ? "font-semibold" : ""}`}
              >
                Project Assistance
              </li>
              <li
                className={`${currentImageIndex === 2 ? "font-semibold" : ""}`}
              >
                Exam Preparation
              </li>
              <li
                className={`${currentImageIndex === 3 ? "font-semibold" : ""}`}
              >
                Skill Enhancement
              </li>
            </div>
          </div>

          <div className="md:w-1/2 flex justify-center items-center">
            <img
              src={activities[currentImageIndex]}
              alt={`admin-${currentImageIndex + 1}`}
              className="rounded-lg shadow-md lg:w-96 lg:h-72 w-52 h-80 object-cover transition-all duration-500"
            />
          </div>
        </div>

        <div className="flex gap-3 justify-between items-center rounded-xl shadow-md p-10 transition-all duration-200 ease-in-out bg-white border hover:bg-rose-100 border-rose-500 hover:shadow-lg">
          <div className="flex flex-col gap-10">
            <>
              <p className="text-3xl font-semibold text-rose-500">
                Activities{" "}
              </p>
            </>
            <div className="ml-5 list-disc flex flex-col gap-5 text-xl tracking-wide">
              <li
                className={`${currentImageIndex === 0 ? "font-semibold" : ""}`}
              >
                Chess / Board Games
              </li>
              <li
                className={`${currentImageIndex === 1 ? "font-semibold" : ""}`}
              >
                Story Sessions
              </li>
              <li
                className={`${currentImageIndex === 2 ? "font-semibold" : ""}`}
              >
                Any Other
              </li>
              <li
                className={`${currentImageIndex === 3 ? "font-semibold" : ""}`}
              >
                Creative Arts / Painting / Sculpture
              </li>
              <li
                className={`${currentImageIndex === 4 ? "font-semibold" : ""}`}
              >
                Creative Games / Lego / Builders / Writings
              </li>
            </div>
          </div>

          <div className="md:w-1/2 flex justify-center items-center">
            <img
              src={activities[currentImageIndex]}
              alt={`admin-${currentImageIndex + 1}`}
              className="rounded-lg shadow-md lg:w-96 lg:h-72 w-52 h-80 object-cover transition-all duration-500"
            />
          </div>
        </div>

        <div className="flex gap-3 justify-between items-center rounded-xl shadow-md p-10 transition-all duration-200 ease-in-out bg-white border hover:bg-rose-100 border-rose-500 hover:shadow-lg">
          <div className="flex flex-col gap-10">
            <Fragment>
              <p className="text-3xl font-semibold text-rose-500">
                Care of Loved Ones - The Seniors
              </p>
            </Fragment>

            <div className="ml-5 list-disc flex flex-col gap-5 text-xl tracking-wide">
              <li>Take them to hospital</li>
              <li>Spend time reading books and stories</li>
              <li>Engaging them in any acivity they like</li>
              <li>Tale them to mall / shopping</li>
            </div>
          </div>

          <div className="md:w-1/2 flex justify-center items-center">
            <img
              src={activities[currentImageIndex]}
              alt={`admin-${currentImageIndex + 1}`}
              className="rounded-lg shadow-md lg:w-96 lg:h-72 w-52 h-80 object-cover transition-all duration-500"
            />
          </div>
        </div>

        <div className="flex gap-3 justify-between items-center rounded-xl shadow-md p-10 transition-all duration-200 ease-in-out bg-white border hover:bg-rose-100 border-rose-500 hover:shadow-lg">
          <div className="flex flex-col gap-10">
            <>
              <p className="text-3xl font-semibold text-rose-500">
                The Home Admin
              </p>
            </>

            <div className="ml-5 list-disc flex flex-col gap-5 text-xl tracking-wide">
              <li>Organise my party</li>
              <li>Organise games & fun activities</li>
              <li>Food / Bakery / Dessert</li>
            </div>
          </div>

          <div className="md:w-1/2 flex justify-center items-center">
            <img
              src={activities[currentImageIndex]}
              alt={`admin-${currentImageIndex + 1}`}
              className="rounded-lg shadow-md lg:w-96 lg:h-72 w-52 h-80 object-cover transition-all duration-500"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default SeekHelp;
