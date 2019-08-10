import React, { Component } from "react";
import { CircleSlider } from "react-circle-slider";
import './App.css';

class DeviceList extends Component {
  constructor(props) {
    super(props);
    this.state = { selected : 0 };
    this.deviceList = [
      {
        name: 'Noria AC',
        place: 'In Bedroom',
        image: 'assets/ac.png'
      },
      {
        name: 'Door Lock',
        place: 'In Home office',
        image: 'assets/lock.png'
      },
      {
        name: 'Thermostat',
        place: 'In Bedroom',
        image: 'assets/thermostat.png'
      },
      {
        name: 'LG TV',
        place: 'In  Living room',
        image: 'assets/tv.png'
      },
      {
        name: 'Bed Lamp',
        place: 'In Bedroom',
        image: 'assets/lamp.png'
      }
    ];
    if (this.props.setName) {
      this.props.setName(this.deviceList[0].name);
    }
  }

  makeActive = (event) => {
    let selectedIdx = event.currentTarget.dataset.idx;
    let selectedName = event.currentTarget.dataset.name;
    console.log(event.currentTarget.dataset);
    this.setState({ 'selected' : selectedIdx });

    if (this.props.setName) {
      this.props.setName(selectedName);
    }
  }

  renderAllDevices = (devList) => {
    return devList.map((device, index) => {
      return (<div id={'item' + index} className={"itemCont" + ((this.state.selected == index)? " active" : "")} data-idx={index} data-name={device.name} onClick={this.makeActive}>
          <div className="nameCont"> <span className="deviceName">{device.name}</span> <br/> <span className="devicePlace">{device.place}</span> </div>
          <div className="imageCont"> <img src={device.image} alt={'device' + index} /> </div>
          <div className="arrowCont"> <img src="assets/chevron-right.png" alt="chevron" /> </div>
      </div>)
    })
  }

  render() {
    const renderDevices = this.renderAllDevices(this.deviceList);

    return (
      <div id="deviceListWrap">
        {renderDevices}
      </div>
    )
  }
}

class DeviceDetail extends Component {
  constructor(props) {
    super(props);
    this.state = { colorIdx : 0, modeIdx : 0, power : 50, switch : true }
    this.colors = ['#FF4563', '#8245E6', '#4AC0E0', '#1089EB', '#C791CD'];
    this.modes = [
      {
        name : 'Morning',
        dk_image : 'assets/morning-dk.png',
        wh_image : 'assets/morning-wh.png',
        power : '50'
      },
      {
        name : 'Day',
        image : 'assets/day-dk.png',
        power : '30'
      },
      {
        name : 'Night',
        image : 'assets/night-dk.png',
        power : '100'
      }
    ];
  }

  selectColor = (event) => {
    let selectedIdx = event.currentTarget.dataset.idx;
    this.setState({ 'colorIdx' : selectedIdx });
  }

  selectMode = (event) => {
    let selectedIdx = event.currentTarget.dataset.idx;
    let selectedPower = event.currentTarget.dataset.power;
    this.setState({ 'modeIdx' : selectedIdx, 'power' : selectedPower });
  }

  triggerSwitch = (event) => {
    this.setState({ 'switch' : !this.state.switch });
  }

  renderAllColors = (colorList) => {
    return colorList.map((color, index) => {
      return (
        <label className="container"> <input type="checkbox" /> <span className={"checkmark" + ((this.state.colorIdx == index)? " clicked" : "")} style={{background: color}} data-idx={index} onClick={this.selectColor}></span> </label>
      )
    })
  }

  renderAllModes = (modeList) => {
    return modeList.map((mode, index) => {
      return ( 
        <div className={"modeCont" + ((this.state.modeIdx == index)? " selected" : "")} data-idx={index} data-power={mode.power} onClick={this.selectMode}> 
          <span className="modeImg">
            {mode.dk_image ? (<img className="black" src={mode.dk_image} alt={'mode' + index} />) : ''}
            {mode.wh_image ? (<img className="white" src={mode.wh_image} alt={'mode' + index} />) : ''}
            {mode.image ? (<img src={mode.image} alt={'mode' + index} />) : ''}
          </span>
          <span className="modeName">{mode.name}</span>
          <span className="modePower">{mode.power + '%'}</span>
          <span className="modeSelect">
            <img className="white" src="assets/tick-wh.png" alt="tick" />
            <img className="black" src="assets/tick-wh-lt.png" alt="tick" />
          </span>
        </div>
      )
    })
  }

  render() {
    let renderColors = this.renderAllColors(this.colors);
    let renderModes = this.renderAllModes(this.modes);

    return (
      <div id="deviceDescWrap" className={"clsDescWrap" + (this.state.switch ? "" : " disabled")}>
        <div id="titleWrap">
          <div id="devicesTitle" className="clsTitle">Devices</div>
          <div id="plusCont"> <img src="assets/plus-dk.png" alt="plus" /> </div>
        </div>

        <div id="nameWrap">
          <div id="deviceName" className="clsTitle">{this.props.deviceName}</div>
          <div id="switchCont" className={"clsSwitch" + (this.state.switch ? " active" : "")} onClick={this.triggerSwitch}> <div id="switchButton"></div> </div>
        </div>
        
        <div className="sectionWrap">
          <div className="sectionTitle">Shades</div>
          <div className="sectionCont colors"> {renderColors} </div>
        </div>
        
        <div className="sectionWrap">
            <div className="sectionTitle">Mode</div>
            <div className="sectionCont modes"> {renderModes} </div>
        </div>
        
        <div className="sectionWrap">
            <div className="sectionTitle">Intensity</div>
            <div className="sectionCont indensity">
                <CircleSlider
                  value={this.state.power}
                  size={160}
                  stepSize={2}
                  showTooltip={true}
                  gradientColorFrom="#AC6DFF"
                  gradientColorTo="#76B9F7"
                  knobColor="#AD6BFF"
                />              
            </div>
        </div>
      </div>
    )
  }
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {deviceName: ''};
  }

  selectDevice = (devName) => {
    this.setState({ 'deviceName' : devName });
  }

  render() {
    return (
      <div id="deviceWrapper">
        <div id="deviceList"> 
          <DeviceList setName={this.selectDevice} />
        </div>
        <div id="deviceDesc">
          <DeviceDetail deviceName={this.state.deviceName} />
        </div>
      </div>
    )
  }

}

export default App;
