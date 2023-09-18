// eslint-disable-next-line react/prop-types
const Error = ({ children }) => {
  return (
    <div className="bg-red-800 text-white text-center mb-3 rounded-md p-3">
      <p className="font-bold uppercase">{children}</p>
    </div>
  );
};

export default Error;
