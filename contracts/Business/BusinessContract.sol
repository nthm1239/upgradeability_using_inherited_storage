pragma solidity ^0.5.0;

import '../Upgradeable.sol';

contract BusinessContract is Upgradeable {
  struct Activity {
    address _address;
    uint _type;
  }

  struct Point {
    uint totalPoint;
    mapping (uint => uint) kindPoint;
  }

  Activity[] activities;
  mapping (address => Point) point;

  function initialize(address sender) public {
    super.initialize(sender);
  }

  function addActivity(address _address, uint _type) external {
    activities.push(Activity(_address, _type));
    point[_address].totalPoint = point[_address].totalPoint + 1;
    point[_address].kindPoint[_type] = point[_address].kindPoint[_type] + 1;
  }

  function getTotalPoint(address _address) view external returns(uint totalPoint) {
    return point[_address].totalPoint;
  }

}
