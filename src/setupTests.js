import "regenerator-runtime/runtime";
import "@testing-library/jest-dom";
import "@testing-library/jest-dom/extend-expect";
import Enzyme from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";

// Configure Enzyme with React 17 adapter
Enzyme.configure({ adapter: new Adapter() });
