
import { Astrologer } from 'astrologer';

const astrologer = new Astrologer();
const birthData = {
  year: 1990,
  month: 5,
  date: 15,
  hours: 14,
  minutes: 30,
  seconds: 0,
  latitude: 41.0082, // Istanbul
  longitude: 28.9784,
  timezone: 3,
  chartType: 'tropical'
};

try {
  const natalChart = astrologer.generateNatalChartData(birthData);
  console.log(JSON.stringify(natalChart, null, 2));
} catch (error) {
  console.error(error);
}
