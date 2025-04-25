import React, { useEffect, useState } from "react";
import { Fragment } from "react";

function SeekHelp() {
  const images = [
    "/admin1.jpg",
    "/admin2.jpg",
    "/admin3.webp",
    "/admin4.jpg",
    "/admin5.jpg",
    "/admin6.jpg",
  ];

  const activities = [
    "/acti1.jpg",
    "/acti2.jpg",
    "/acti3.jpg",
    "/acti4.jpg",
    "/acti5.jpg",
    "/acti6.webp",
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
      <img
        src="/our-vision.jpg"
        alt=""
        className="h-60 w-[100%] rounded-b-[100px]"
      />

      <div>
        <p className="text-center font-bold text-4xl text-rose-500 tracking-wide mt-10 mb-3">
          Our Mission
        </p>

        <div className="flex justify-center">
          <div className="w-20 h-1 bg-rose-500 rounded-full mb-6"></div>
        </div>

        <div className="bg-rose-400 rounded-2xl mx-10">
          <div className="bg-pink-100 ml-4 flex flex-col py-10 px-5 text-base lg:text-lg tracking-wide rounded-2xl text-justify">
            {/* <p className="text-justify"> */}
            Carenearn is about creating a platform a symbiotic relations, where
            the emptiness of the elders who are still active and have depth of
            knowledge and experience, the students for gig work and relatively
            free but highly educated people to contribute to needy families,
            with kids or elders to be looked after, in creative and meaningful
            ways.
            {/* </p> */}
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

        <div className="bg-rose-400 rounded-2xl mx-10">
          <div className="bg-pink-100 ml-4 flex flex-col py-10 px-5 text-base lg:text-lg tracking-wide rounded-2xl">
            <div>
              {/* <p className="text-justify"> */}
              We might have house help, probably an essential requirement but we
              are never sure if there are kind to our loved ones or is she
              contributiong to the cognitive behavioural well being of our
              child.
              <br></br>
              <br></br>
              Let me quote the Nobel Laurettes{" "}
              <span className="font-semibold">
                David Hubel and Torsten Wiesel
              </span>
              , Their research showed that kittens deprived of vision in one eye
              experienced limited development in the corresponding area of the
              brain. Vice Versa, This experiment shows the effect of providing
              children with stimulating experiences nurtures their cognitive
              abilities.<br></br>
              <br></br>
              <span className="font-semibold">
                Building Brain Architecture in Early Childhood:
              </span>{" "}
              During the first years of life, over a
              <span className="font-semibold">
                {" "}
                million new neural connections
              </span>{" "}
              are formed every second. This rapid synapse(the junction between
              the nerve cells) formation supports{" "}
              <span className="font-semibold">high brain plasticity</span> in
              early childhood, crucial for learning.<br></br>
              <br></br> • Stimulating environments are essential for enhancing
              neural activity, supporting both cognitive learning and emotional
              regulation.<br></br>• A non-vibrant environment does not support
              with the{" "}
              <span className="font-semibold">
                formation of neural networks
              </span>
              , potentially causing them to disappear over time.{" "}
              <span className="font-semibold">
                This leads to Impaired Connectivity:
              </span>{" "}
              Poor connectivity between neurons can negatively impact{" "}
              <span className="font-semibold">
                cognitive, behavioural, and emotional functions,{" "}
              </span>
              affecting{" "}
              <span className="font-semibold">
                learning and emotional regulation
              </span>
              .<br></br>
              <br></br>
              We at carenearn intend to enhance the life of our child by giving
              a vibrant interaction which may include painting, story telling,
              building blocks and many activities by A story read to our parents
              or taking them to a mall may alleviate their mood and thus make a
              happier home as well give some breathing space to you!
              {/* </p> */}
            </div>
          </div>
        </div>
      </div>

      <p className="text-center font-bold text-4xl text-rose-500 tracking-wide mt-10 mb-3">
        Seek Help
      </p>

      <div className="flex justify-center">
        <div className="w-20 h-1 bg-rose-500 rounded-full mb-6"></div>
      </div>

      <div className="grid grid-rows-1 gap-10 lg:gap-20 lg:px-40 px-10">
        <div className="flex justify-between rounded-xl shadow-md px-5 py-10 transition-all duration-200 ease-in-out bg-white border hover:bg-rose-100 border-rose-500 hover:shadow-lg">
          <div className="flex flex-col gap-10 w-1/2">
            <div>
              <p className="text-3xl font-semibold text-rose-500">
                Child Education
              </p>
            </div>

            <div className="ml-5 list-disc flex flex-col gap-5 text-xl tracking-wide">
              <li>Homework Support</li>
              <li>Project Assistance</li>
              <li>Exam Preparation</li>
              <li>Skill Enhancement</li>
            </div>
          </div>

          <div className="md:w-1/2 flex justify-center items-center">
            <img
              src={images[currentImageIndex]}
              alt={`admin-${currentImageIndex + 1}`}
              className="rounded-lg shadow-md lg:w-96 lg:h-72 w-52 h-80 object-cover transition-all duration-500"
            />
          </div>
        </div>

        <div className="flex gap-3 justify-between items-center rounded-xl shadow-md px-5 py-10 transition-all duration-200 ease-in-out bg-white border hover:bg-rose-100 border-rose-500 hover:shadow-lg">
          <div className="flex flex-col gap-10">
            <>
              <p className="text-3xl font-semibold text-rose-500">
                Activities{" "}
              </p>
            </>
            <div className="ml-5 list-disc flex flex-col gap-5 text-xl tracking-wide">
              <li>Chess / Board Games</li>
              <li>Story Sessions</li>
              <li>Any Other</li>
              <li>Creative Arts / Painting / Sculpture</li>
              <li>Creative Games / Lego / Builders / Writings</li>
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

        <div className="flex justify-center items-center gap-3 rounded-xl shadow-md px-5 py-10 transition-all duration-200 ease-in-out bg-white border hover:bg-rose-100 border-rose-500 hover:shadow-lg">
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
              src={images[currentImageIndex]}
              alt={`admin-${currentImageIndex + 1}`}
              className="rounded-lg shadow-md lg:w-96 lg:h-72 w-52 h-80 object-cover transition-all duration-500"
            />
          </div>
        </div>

        <div className="flex justify-center items-center gap-3 rounded-xl shadow-md px-5 py-10 transition-all duration-200 ease-in-out bg-white border hover:bg-rose-100 border-rose-500 hover:shadow-lg">
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
              src={images[currentImageIndex]}
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
