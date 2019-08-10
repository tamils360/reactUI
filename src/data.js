const devices = [
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

const colors = ['#FF4563', '#8245E6', '#4AC0E0', '#1089EB', '#C791CD'];

const modes = [
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

export { devices, colors, modes };