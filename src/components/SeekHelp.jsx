import React from "react";
import { Fragment } from "react";

function SeekHelp() {
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
          <div className="bg-pink-100 ml-4 flex flex-col py-10 px-5 text-lg lg:text-xl tracking-wide rounded-2xl text-justify">
            {/* <p className="text-justify"> */}
            CareNearn is about creating a platform of symbiotic relations, where
            the emptiness of the elders who are still active but totally free,
            the students for gig work and relatively free but highly educated
            people to contribute to needy families, with kids or elders to be
            looked after, in creative and meaningful ways.
            {/* </p> */}
          </div>
        </div>
      </div>

      <p className="text-center font-bold text-4xl text-rose-500 tracking-wide mt-10 mb-3">
        Seek Help
      </p>

      <div className="flex justify-center">
        <div className="w-20 h-1 bg-rose-500 rounded-full mb-6"></div>
      </div>

      <div className="grid grid-rows-1 lg:grid-cols-3 gap-10 lg:gap-20 px-10">
        <div className="flex flex-col gap-10 rounded-xl shadow-md px-5 py-10 transition-all duration-200 ease-in-out bg-white border border-white hover:bg-rose-100 hover:border-rose-500 hover:shadow-lg">
          <Fragment>
            <p className="text-3xl font-semibold text-rose-500">
              Child Education
            </p>
          </Fragment>

          <div className="ml-5 list-disc flex flex-col gap-5 text-xl tracking-wide">
            <li>Homework Support</li>
            <li>Project Assistance</li>
            <li>Exam Preparation</li>
            <li>Skill Enhancement</li>
          </div>
        </div>

        <div className="flex flex-col gap-10 rounded-xl shadow-md px-5 py-10 transition-all duration-200 ease-in-out bg-white border border-white hover:bg-rose-100 hover:border-rose-500 hover:shadow-lg">
          <Fragment>
            <p className="text-3xl font-semibold text-rose-500">Activities </p>
          </Fragment>

          <div className="ml-5 list-disc flex flex-col gap-5 text-xl tracking-wide">
            <li>Chess / Board Games</li>
            <li>Art / Painting / Sculpture</li>
            <li>Creative Writing / Lego</li>
            <li>Story Sessions</li>
          </div>
        </div>

        <div className="flex flex-col gap-10 rounded-xl shadow-md px-5 py-10 transition-all duration-200 ease-in-out bg-white border border-white hover:bg-rose-100 hover:border-rose-500 hover:shadow-lg">
          <Fragment>
            <p className="text-3xl font-semibold text-rose-500">
              Care for Seniors
            </p>
          </Fragment>

          <div className="ml-5 list-disc flex flex-col gap-5 text-xl tracking-wide">
            <li>Hospital Visits</li>
            <li>Reading Sessions</li>
            <li>Engaging in Hobbies</li>
            <li>Mall / Shopping visits</li>
          </div>
        </div>

        <div className="flex flex-col gap-10 rounded-xl shadow-md px-5 py-10 transition-all duration-200 ease-in-out bg-white border border-white hover:bg-rose-100 hover:border-rose-500 hover:shadow-lg">
          <Fragment>
            <p className="text-3xl font-semibold text-rose-500">Home Admin</p>
          </Fragment>

          <div className="ml-5 list-disc flex flex-col gap-5 text-xl tracking-wide">
            <li>Party Organisation</li>
            <li>Games & Fun Activities</li>
            <li>Food / Bakery / Desserts</li>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SeekHelp;
