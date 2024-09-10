import { useNavigate } from "react-router-dom";

interface Props {
  title: string;
  message: string;
  buttonText: string;
  route: string;
}

// This component is responsible or to be used when
// 1. The user has already logged in
// 2. The user tries to access a route but aren't logged in
// 3. To display any additional info you want when they user tries to do something they
// aren't supposed to do
const Already = (props: Props) => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate(props.route);
  };

  return (
    <div className="already-account-container">
      <h5>{props.title}</h5>
      <p>{props.message}</p>
      <button className="already-button" onClick={handleLoginClick}>
        {props.buttonText}
      </button>
    </div>
  );
};

export default Already;
