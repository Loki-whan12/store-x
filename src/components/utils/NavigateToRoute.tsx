import { useNavigate } from "react-router-dom";

const navigateToRoute = () => {
  const navigate = useNavigate();

  return (path: string) => {
    navigate(path);
  };
};

export default navigateToRoute;
