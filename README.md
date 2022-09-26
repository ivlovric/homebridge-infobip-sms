
<p align="center">
<img src="https://github.com/homebridge/branding/raw/master/logos/homebridge-wordmark-logo-vertical.png" width="150">
</p>
<p align="center">
<img src="https://www.infobip.com/wp-content/themes/infobip/static/ui/infobip-logo.svg" width="230">
</p>


# Homebridge plugin for Infobip SMS platform

This is a Homebridge https://homebridge.io/ accessory plugin for Infobip SMS platform that enables sending of SMS to specified number with specific message. It can be trigerred manually or by automating and trigering by other Homekit devices or sensors for enhanced home automation flows.

<img width="1594" alt="Screenshot 2022-09-26 at 09 57 38" src="https://user-images.githubusercontent.com/37185376/192244713-1c986bfb-0964-4d1f-bc05-e52a70818ae9.png">

It is forked from generic switch plugin https://github.com/nfarina/homebridge-dummy 

## Get infobip subscription

Infobip offers trial accout that can be created freely with fair ammount of credits for many types of Voice, SMS or OTT services.

Getting started with Infobip APIs - https://www.infobip.com/docs/api

Trial account registration page - https://www.infobip.com/signup

## Install

### Manual
Using a terminal, navigate to the project folder and run this command to install the development dependencies:

```
npm install
```

### Using Homebridge Plugin search pane
<img width="508" alt="Screenshot 2022-06-29 at 14 36 07" src="https://user-images.githubusercontent.com/37185376/176437732-04c27790-bbae-42ae-90ae-0fab52719ea2.png">

## Configure

Configuration can be done by UI in homebridge-config-ui interface.
Example:
<img width="855" alt="Screenshot 2022-09-26 at 11 22 32" src="https://user-images.githubusercontent.com/37185376/192244656-84e505c6-762c-435a-8127-11c9c6dadf9e.png">


![Screenshot 2022-09-26 at 11 22 49](https://user-images.githubusercontent.com/37185376/192244548-76f74ef8-b43e-4a7d-924b-2c5cedff2d6c.jpg)



## Build Plugin

TypeScript needs to be compiled into JavaScript before it can run. The following command will compile the contents of your [`src`](./src) directory and put the resulting code into the `dist` folder.

```
npm run build
```

## Link To Homebridge

Run this command so your global install of Homebridge can discover the plugin in your development environment:

```
npm link
```

You can now start Homebridge, use the `-D` flag so you can see debug log messages in your plugin:

```
homebridge -D
```

## Watch For Changes and Build Automatically

If you want to have your code compile automatically as you make changes, and restart Homebridge automatically between changes you can run:

```
npm run watch
```

This will launch an instance of Homebridge in debug mode which will restart every time you make a change to the source code. It will load the config stored in the default location under `~/.homebridge`. You may need to stop other running instances of Homebridge while using this command to prevent conflicts. You can adjust the Homebridge startup command in the [`nodemon.json`](./nodemon.json) file.
