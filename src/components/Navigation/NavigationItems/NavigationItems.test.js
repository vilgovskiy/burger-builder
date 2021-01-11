import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import React from "react";

import NavigarionItems from "./NavigationItems";
import NavigationItem from "./NavigationItem/NavigationItem";

configure({ adapter: new Adapter() });
describe("<NavigarionItems/>", () => {
  it("should render 2 <NavigationItem/> elems if not Authenticated", () => {
    const wrapper = shallow(<NavigarionItems />);
    expect(wrapper.find(NavigationItem)).toHaveLength(2);
  });

  it("should render 3 <NavigationItem/> elems if not Authenticated", () => {
    const wrapper = shallow(<NavigarionItems isAuth />);
    expect(wrapper.find(NavigationItem)).toHaveLength(3);
  });

  it("Check if logout is there when loged in", () => {
    const wrapper = shallow(<NavigarionItems isAuth />);
    expect(wrapper.contains(<NavigationItem link="/logout">Log Out</NavigationItem>)).toEqual(true);
  });
});
