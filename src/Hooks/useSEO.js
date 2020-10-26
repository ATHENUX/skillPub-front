import { useEffect } from "react";

const useSEO = ({ title, description }) => {
  useEffect(() => {
    document.title = `SkillPub | ${title}`;
  }, [title]);

  useEffect(() => {
    const metaDescription = document.querySelector("meta[name='description']");
    metaDescription?.setAttribute("content", description);
  }, [description]);
};

export default useSEO;
