const ShimmerCards = () => {
  return (
    <div
      className="
        grid grid-rows-1 grid-flow-col
        lg:auto-cols-[320px]
        auto-cols-[200px]
        gap-6
        w-max
      "
    >
      {[...Array(5)].map((_, index) => (
        <div
          key={index}
          className="
            h-[90px]
            rounded-xl
            bg-gray-200
            animate-pulse
          "
        />
      ))}
    </div>
  );
};

export default ShimmerCards;
