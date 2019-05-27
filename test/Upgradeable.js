const Business = artifacts.require('BusinessContract')
const Business_v2 = artifacts.require('BusinessContract_v2')
const IBusiness = artifacts.require('IBusiness')

const Registry = artifacts.require('Registry')
const Proxy = artifacts.require('UpgradeabilityProxy')

contract('Upgradeable', function (accounts) {

  it('Business_v1', async function () {

    const business = await Business.new()
    const business_v2 = await Business_v2.new()

    const registry = await Registry.new()
    await registry.addVersion("1.0", business.address)

    const {logs} = await registry.createProxy("1.0")

    const {proxy} = logs.find(l => l.event === 'ProxyCreated').args

    await IBusiness.at(proxy).addActivity(accounts[0],1);

    // get point from proxy
    var result_from_proxy = await Business.at(proxy).getTotalPoint(accounts[0]);
    assert.equal(result_from_proxy, 10, "エラー：Proxyにデータが登録されていない")

    // get point from business
    var result_from_business = await business.getTotalPoint(accounts[0]);
    assert.equal(result_from_business, 0, "エラー：Businessにデータが登録されている")

    // ==========================================

    // Upgrade
    await registry.addVersion("2.0", business_v2.address)
    await Proxy.at(proxy).upgradeTo("2.0")

    await IBusiness.at(proxy).addActivity(accounts[0],1);

    // get point from proxy
    var result_from_proxy = await Business.at(proxy).getTotalPoint(accounts[0]);
    assert.equal(result_from_proxy, 110, "エラー：Proxyにデータが登録されていない")

    // get point from business
    var result_from_business = await business.getTotalPoint(accounts[0]);
    assert.equal(result_from_business, 0, "エラー：Businessにデータが登録されている")
  
  })

})
