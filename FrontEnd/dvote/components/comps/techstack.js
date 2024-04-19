import React from "react";

function TechStack() {
  return (
    <section className="text-gray-600 body-font font-mono mt-6">
      <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-col text-center w-full mb-4">
          <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">
            Built Using
          </h1>
        </div>
        <div className="flex flex-row -m-2">
          <div className="p-2 lg:w-1/3 md:w-1/2 w-full">
            <div className="h-full flex flex-col items-center justify-center border-gray-200 border p-4 rounded-lg">
              <img
                alt="team"
                className="w-16 h-16 bg-gray-100 object-fit object-center flex-shrink-0 rounded-full "
                src="/sol.svg"
              />
              <div className="mt-2 text-center text-gray-900 text-xl font-mono font-bold">
                Solidity
              </div>
            </div>
          </div>
          <div className="p-2 lg:w-1/3 md:w-1/2 w-full">
            <div className="h-full flex flex-col items-center justify-center border-gray-200 border p-4 rounded-lg">
              <img
                alt="team"
                className="w-16 h-16 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full "
                src="/next1.svg"
              />
              <div className="mt-2 text-center text-gray-900 text-xl font-mono font-bold">
                Next.Js
              </div>
            </div>
          </div>
          <div className="p-2 lg:w-1/3 md:w-1/2 w-full">
            <div className="h-full flex flex-col items-center justify-center border-gray-200 border p-4 rounded-lg">
              <img
                alt="team"
                className="w-16 h-16 bg-gray-100 object-fit object-center flex-shrink-0 rounded-full "
                src="/js.svg"
              />
              <div className="mt-2 text-center text-gray-900 text-xl font-mono font-bold">
                JavaScript
              </div>
            </div>
          </div>
          <div className="p-2 lg:w-1/3 md:w-1/2 w-full">
            <div className="h-full flex flex-col items-center justify-center border-gray-200 border p-4 rounded-lg">
              <img
                alt="team"
                className="w-16 h-16 bg-black object-cover object-center flex-shrink-0 rounded-full "
                src="/hederaLogo.png"
              />
              <div className="mt-2 text-center text-gray-900 text-xl font-mono font-bold">
                Hedera
              </div>
            </div>
          </div>
        </div>
        <p className=" mx-auto leading-relaxed text-base mt-4">
          Blockchain technology offers a revolutionary solution for secure and
          transparent voting systems. Its decentralized nature ensures
          tamper-proof records, enhancing trust in electoral processes. With
          blockchain, voting becomes more accessible, resilient to fraud, and
          fosters greater civic participation.
        </p>
      </div>
    </section>
  );
}

export default TechStack;
