"use strict";

var Service, Characteristic, HomebridgeAPI;
const { HomebridgeDummyVersion } = require('./package.json');

const request = require('request');

module.exports = function(homebridge) {
  Service = homebridge.hap.Service;
  Characteristic = homebridge.hap.Characteristic;
  HomebridgeAPI = homebridge;
  homebridge.registerAccessory("homebridge-infobip-sms", "InfobipSMS", InfobipSMS);
}

function InfobipSMS(log, config) {
  this.log = log;
  this.name = config.name;
  this.stateful = config.stateful;
  this.time = config.time ? config.time : 1000;
  this.APIKey = config.APIKey;
  this.BaseURL = config.BaseURL;
  this.SMStoNumber = config.SMStoNumber;
  this.SMSfromNumber = config.SMSfromNumber;
  this.SMSText = config.SMSText;

  this.timer = null;
  this._service = new Service.Switch(this.name);
  
  this.informationService = new Service.AccessoryInformation();
  this.informationService
      .setCharacteristic(Characteristic.Manufacturer, 'Homebridge')
      .setCharacteristic(Characteristic.Model, 'Infobip SMS Switch')
      .setCharacteristic(Characteristic.FirmwareRevision, HomebridgeDummyVersion)
      .setCharacteristic(Characteristic.SerialNumber, 'Infobip-' + this.name.replace(/\s/g, '-'));
  
  this.cacheDirectory = HomebridgeAPI.user.persistPath();
  this.storage = require('node-persist');
  this.storage.initSync({dir:this.cacheDirectory, forgiveParseErrors: true});
  
  this._service.getCharacteristic(Characteristic.On)
    .on('set', this._setOn.bind(this));

  if (this.reverse) this._service.setCharacteristic(Characteristic.On, true);

  if (this.stateful) {
	var cachedState = this.storage.getItemSync(this.name);
	if((cachedState === undefined) || (cachedState === false)) {
		this._service.setCharacteristic(Characteristic.On, false);
	} else {
		this._service.setCharacteristic(Characteristic.On, true);
	}
  }
}

InfobipSMS.prototype.getServices = function() {
  return [this.informationService, this._service];
}

InfobipSMS.prototype._setOn = function(on, callback) {

  this.log("Setting switch to " + on);

  if (on && !this.reverse && !this.stateful) {
    if (this.resettable) {
      clearTimeout(this.timer);
    }
    this.timer = setTimeout(function() {
      this._service.setCharacteristic(Characteristic.On, false);
    }.bind(this), this.time);

    this.log.info('Sending Infobip API request.');

 //var url = "http://10.116.118.127:8000";
 var url = this.BaseURL + "/sms/2/text/advanced";

var JSONObject = {
  "messages": [
    {
        "destinations": 
    [
                {
                    "to": this.SMStoNumber
                }
    ],
            "from": this.SMSfromNumber,
            "text": this.SMSText
        }
    ]
};

request({
  url: url,
  method: "POST",
  json: true,
  headers: {
    'Authorization': "App " + this.APIKey
  },
  body: JSONObject
}, function (error, response, body){
  if(error) { 
    console.error("-->X Error while communicating with Infobip API:  " + error);
  }
  console.error("-->V Sending Infobip API request successful");
  console.log(body);
  //console.log(response.statusCode);
});

  } else if (!on && this.reverse && !this.stateful) {
    if (this.resettable) {
      clearTimeout(this.timer);
    }
    this.timer = setTimeout(function() {
      this._service.setCharacteristic(Characteristic.On, true);
    }.bind(this), this.time);
  }
  
  if (this.stateful) {
	this.storage.setItemSync(this.name, on);
  }
  
  callback();
}
