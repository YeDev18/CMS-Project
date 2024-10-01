const TonnagesGraph = () => {
  return (
    <>
      <h2 className="text-xl font-semibold">Tonages des differents navires</h2>
      <div className=" flex w-full  flex-col justify-between gap-2">
        <div className="flex flex-col gap-2">
          <div className="h-8 w-full rounded-md bg-black opacity-5"></div>
          <div className="h-8 w-full rounded-md bg-black opacity-5"></div>
          <div className="h-8 w-full rounded-md bg-black opacity-5"></div>
          <div className="h-8 w-full rounded-md bg-black opacity-5"></div>
          <div className="h-8 w-full rounded-md bg-black opacity-5"></div>
        </div>
        <div className="flex flex-col gap-2">
          <div className="h-8 w-full rounded-md bg-black opacity-5"></div>
          <div className="h-8 w-full rounded-md bg-black opacity-5"></div>
          <div className="h-8 w-full rounded-md bg-black opacity-5"></div>
          <div className="h-8 w-full rounded-md bg-black opacity-5"></div>
          <div className="h-8 w-full rounded-md bg-black opacity-5"></div>
        </div>
      </div>
    </>
  );
};

export default TonnagesGraph;
