import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import React from "react";

import { BurgerBuilder } from "./BurgerBuilder";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";

configure({ adapter: new Adapter() });

describe("<BurgerBuilder />", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<BurgerBuilder />);
  });

  it('Should render <BuildControls /> when receiving ingredients', () => {
      wrapper.setProps({ingredients: {salad: 0}})
      expect(wrapper.find(BuildControls)).toHaveLength(1)
  })
});
