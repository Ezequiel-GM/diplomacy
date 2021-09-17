import { ReactElement } from "react";
import { Redirect, RouteComponentProps, Router } from "@reach/router";
import { useAuthState } from "react-firebase-hooks/auth";

import Error from "./pages/Error";
import Games from "./pages/Games";
import Loading from "./pages/Loading";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";

import { auth } from "./firebase";

interface RouteProps extends RouteComponentProps {
  page: ReactElement;
}

const PageRoute = (props: RouteProps) => props.page;

export default function AuthRouter() {
  const [user, loading, error] = useAuthState(auth);

  if (error) return <Error error={error} />;

  if (loading) return <Loading />;

  if (!user) return <Login />;

  return (
    <Router>
      <Redirect from="/" to="/games" noThrow />
      <PageRoute page={<Games />} path="/games" />
      <PageRoute page={<NotFound />} default />
    </Router>
  );
}
