import Example from "./Prueba";

const LoadPage = () => {
  const storedUserData = localStorage.getItem("userData");

  const userData = JSON.parse(storedUserData);
  return (
    <div>
      <h1>Load Page</h1>

      <span>hello</span>

      <Example />
    </div>
  );
};

export default LoadPage;
