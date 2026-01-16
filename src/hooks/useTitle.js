import { useEffect } from "react";

const useTitle = (title) => {
  useEffect(() => {
    document.title = `${title} | Rick and Morty App`;
  }, [title]);
};

export default useTitle;
