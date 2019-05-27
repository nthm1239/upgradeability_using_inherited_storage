var Registry = artifacts.require("Registry");
var BusinessContract = artifacts.require("BusinessContract");
var UpgradeabilityProxy = artifacts.require("UpgradeabilityProxy");

module.exports = function(deployer, network, accounts) {
  deployer.then(async () => {
    // 1. Deploy a Registry contract
    console.log("===  1. Deploy a Registry contract" )
    let registry = await deployer.deploy(Registry);
    console.log("success.")
    
    // 2. Deploy an initial version of your contract (v1). Make sure it inherits the Upgradeable contract
    console.log("===  2. Deploy an initial version of your contract (v1). Make sure it inherits the Upgradeable contract" )
    let business = await deployer.deploy(BusinessContract);
    console.log("success.")

    // 3. Register the address of your initial version to the Registry
    console.log("===  3. Register the address of your initial version to the Registry" )
    await registry.addVersion("v1",business.address)
    console.log("success.")

    // 4. Ask the Registry contract to create an UpgradeabilityProxy instance
    console.log("===  4. Ask the Registry contract to create an UpgradeabilityProxy instance" )
    let txLog = await registry.createProxy("v1")
    let proxyAddr = txLog.logs[0].args.proxy
    console.log("success.")
    console.log(`Proxy Contract : ${proxyAddr}`)

    /*
    await BusinessContract.at(proxyAddr).addActivity(accounts[0],1);

    // get point from proxy
    var result = await web3.eth.call({
      to: proxyAddr, 
      data: "0x89c82e85000000000000000000000000627306090abab3a6e1400e9345bc60c78a8bef57"
    });
    console.log(result);

    // get point from business
    var result2 = await web3.eth.call({
      to: business.address, 
      data: "0x89c82e85000000000000000000000000627306090abab3a6e1400e9345bc60c78a8bef57"
    });
    console.log(result2);
*/
  });
};
