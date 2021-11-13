import { Loader } from "./common/components";

const Loading = ({ isLoading }) => {
  if (!isLoading) return null;
  return (
    <>
      <Loader />
    </>
  );
};

export default Loading;
