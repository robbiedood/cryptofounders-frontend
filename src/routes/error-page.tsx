import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error:any = useRouteError();
  console.error(error);

  return (
    <div id="error-page" className="flex flex-col justify-center items-center min-h-screen min-w-screen space-y-8 text-secondary">
      <h1 className="text-2xl font-bold">Oops!</h1>
      <p className="text-xl">Sorry, an unexpected error has occurred.</p>
      <i className="text-gray-400">{`${error.statusText || error.message}`}</i>
    </div>
  );
}