pragma solidity >=0.4.0 <0.6.0;

import '../Upgradeable.sol';
import './IBusiness.sol';

contract BusinessContract_v2 is IBusiness, Upgradeable {
  struct Activity {
    address _address;
    uint _type;
  }

  Activity[] activities;
  mapping (address => uint256) points;

  function addActivity(address _address, uint _type) external {
    activities.push(Activity(_address, _type));
    points[_address] = points[_address] + 100;
  }

  function getTotalPoint(address _address) view external returns(uint totalPoint) {
    return points[_address];
  }
}
