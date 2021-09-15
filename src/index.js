import React from "react";
import ReactDOM from "react-dom";

// Component: React.createElement
const titleEL = React.createElement("h1", null, "Hello colleague");

// Component React.Component
class HeaderText extends React.Component {
  render() {
    return <p> How are you doing? </p>;
  }
}

// Component React.PureComponent
class BodyText extends React.PureComponent {
  render() {
    return <p>We are from the same city, aren't we?</p>;
  }
}

// Functional component
const FooterText = () => <p>Let's keep in touch</p>;

const rootElement = document.getElementById("root");
ReactDOM.render(
  <>
    {titleEL}
    <HeaderText />
    <BodyText />
    <FooterText />
  </>,
  rootElement
);
