interface LoadingProps {
  length: number,
}

const Loading = ({ length }: LoadingProps) => {
  return (
    <div className="grid md:grid-cols-2 gap-2">
      {Array
        .from({ length })
        .map((_, index) => (
          <div key={index} className="border p-2 flex justify-between items-center rounded-md animate-pulse">
            <div className="bg-gray-200 w-[100px] lg:w-[300px] h-3 rounded" />
            <div className="w-9 h-9 bg-gray-200 rounded-md" />
          </div>
        ))}
    </div>
  );
}

export default Loading;