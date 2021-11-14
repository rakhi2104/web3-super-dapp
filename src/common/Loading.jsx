import { Loader } from "./components";

const Loading = ({ isLoading }) => {
  if (!isLoading) return null;
  return (
    <>
      <Loader />
    </>
  );
};

export default Loading;
