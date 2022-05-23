function deg2rad(deg) {
  return deg * (Math.PI / 180);
}

// number to local currency
const numberToCurrency = (number) => {
  const price = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
  }).format(number);
  return price;
};

// calculate distance between two points in meters
//  https://stackoverflow.com/questions/18883601/function-to-calculate-distance-between-two-coordinatesx
const calculateDistance = (lat1, lng1, lat2, lng2) => {
  const R = 6371e3; // Radius of the earth in meters
  const dLat = deg2rad(lat2 - lat1); // deg2rad function above
  const dLon = deg2rad(lng2 - lng1);
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2)
    + Math.cos(deg2rad(lat1))
      * Math.cos(deg2rad(lat2))
      * Math.sin(dLon / 2)
      * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c; // Distance in meters
  return d;
};

// capitalize first letter of string
const capitalizeFirstLetter = (string) => string.charAt(0).toUpperCase() + string.slice(1);

export {
  numberToCurrency,
  calculateDistance,
  capitalizeFirstLetter,
};
