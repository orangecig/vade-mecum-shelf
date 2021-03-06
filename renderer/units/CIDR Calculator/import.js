//
const unit = document.getElementById ('cidr-calculator-unit');
//
const cidrInput = unit.querySelector ('.cidr-input');
const cidrSample = unit.querySelector ('.cidr-sample');
const ipRangeOutput = unit.querySelector ('.ip-range-output');
//
const ipRangeInput = unit.querySelector ('.ip-range-input');
const ipRangeSample = unit.querySelector ('.ip-range-sample');
const cidrListOutput = unit.querySelector ('.cidr-list-output');
//
module.exports.start = function (context)
{
    const defaultPrefs =
    {
        cidrInput: "",
        ipRangeInput: ""
    };
    let prefs = context.getPrefs (defaultPrefs);
    //
    const cidr = require ('./cidr.js');
    //
    function getIpRange (string)
    {
        let ips = cidr.cidrToIps (string.trim ());
        ipRangeOutput.value = ips ? ips.join (' - ') : "";
    }
    cidrSample.textContent = "192.0.0.1/25";
    getIpRange (cidrInput.value = prefs.cidrInput);
    cidrInput.addEventListener ('input', (event) => { getIpRange (event.target.value); });
    //
    function getCidrList (string)
    {
        let cidrs = cidr.ipRangeToCidrs (string.trim ());
        cidrListOutput.value = cidrs ? cidrs.join ('\n') : "";
    }
    ipRangeSample.textContent = "192.168.1.1 - 192.168.1.12";
    getCidrList (ipRangeInput.value = prefs.ipRangeInput);
    ipRangeInput.addEventListener ('input', (event) => { getCidrList (event.target.value) });
};
//
module.exports.stop = function (context)
{
    context.setPrefs ({ cidrInput: cidrInput.value, ipRangeInput: ipRangeInput.value });
};
//
