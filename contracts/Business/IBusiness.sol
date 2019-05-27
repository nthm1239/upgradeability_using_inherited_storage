pragma solidity >=0.4.0 <0.6.0;

interface IBusiness {
  function addActivity(address _address, uint _type) external;
  function getTotalPoint(address _address) view external returns(uint totalPoint);
}