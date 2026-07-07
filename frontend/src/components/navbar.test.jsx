import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { Authenticator } from "@aws-amplify/ui-react";
import Navbar from "./navbar";

test("shows navbar links", () => {
  render(
    <Authenticator.Provider>
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>
    </Authenticator.Provider>
  );

  expect(screen.getByText(/home/i)).toBeInTheDocument();
});