type LoadingProps = {
  length: number;
}

const Loading = ({ length }: LoadingProps) => {
  const numberOfItems = length;

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
      {Array
        .from({ length: numberOfItems })
        .map((_, index) => (
          <div
            key={index}
            className="border p-2 flex justify-center items-center rounded-md animate-pulse h-[58px]"
          >
            <div className="bg-gray-200 w-[100px] h-3 rounded" />
          </div>
        ))}
    </div>
  );
}

export default Loading;