import React, { useState } from 'react';

type Measurements = {
  bust: number | null;
  waist: number | null;
  hips: number | null;
};

type NonNullMeasurements = {
  bust: number;
  waist: number;
  hips: number;
};

const SizeCalculator = () => {
  const [measurements, setMeasurements] = useState<Measurements>({ bust: null, waist: null, hips: null });
  const [showResults, setShowResults] = useState(false);
  const [waistError, setWaistError] = useState('');
  const [bustError, setBustError] = useState('');
  const [hipsError, setHipsError] = useState('');

  // Smallest and largest measurements from the data
  const smallestWaist = 25; // Smallest waist size from Zara's data
  const largestWaist = 45.5; // Largest waist size from J Crew's data
  const smallestBust = 32.25; // Smallest bust size from Zara's data
  const largestBust = 53.5; // Largest bust size from J Crew's data
  const smallestHips = 35; // Smallest hips size from J Crew's data
  const largestHips = 55.5; // Largest hips size from J Crew's data

  // Size chart data
  const sizeCharts = {
    'Zara': [
      { size: '2', bust: 32.25, waist: 25.25, hips: 35.5 },
      { size: '4', bust: 33.75, waist: 26, hips: 37 },
      { size: '6', bust: 35.5, waist: 27.5, hips: 38.5 },
      { size: '8', bust: 37, waist: 29, hips: 40.5 },
      { size: '10', bust: 38.5, waist: 30.75, hips: 41.75 },
      { size: '12', bust: 40.25, waist: 32.25, hips: 43.25 },
      { size: '14', bust: 41.75, waist: 33.75, hips: 45 },
    ],
    'Talbots': [
      { size: '2', bust: 33, waist: 26, hips: 36 },
      { size: '4', bust: 34, waist: 27, hips: 37 },
      { size: '6', bust: 35, waist: 28, hips: 38 },
      { size: '8', bust: 36, waist: 29, hips: 39 },
      { size: '10', bust: 37, waist: 30, hips: 40 },
      { size: '12', bust: 38.5, waist: 31.5, hips: 41.5 },
      { size: '14', bust: 40, waist: 33, hips: 43 },
      { size: '16', bust: 41.5, waist: 34.5, hips: 44.5 },
      { size: '18', bust: 43.5, waist: 36.5, hips: 46.5 },
    ],
    'Banana Republic': [
      { size: '0', bust: 32.5, waist: 26, hips: 35.5 },
      { size: '2', bust: 33.5, waist: 27, hips: 36.5 },
      { size: '4', bust: 34.5, waist: 28, hips: 37.5 },
      { size: '6', bust: 35.5, waist: 29, hips: 38.5 },
      { size: '8', bust: 36.5, waist: 30, hips: 39.5 },
      { size: '10', bust: 37.5, waist: 31, hips: 40.5 },
      { size: '12', bust: 39, waist: 32.5, hips: 42 },
      { size: '14', bust: 40.5, waist: 34, hips: 43.5 },
      { size: '16', bust: 42.5, waist: 36, hips: 45.5 },
      { size: '18', bust: 44.5, waist: 38, hips: 47.5 },
      { size: '20', bust: 46.5, waist: 40, hips: 49.5 },
    ],
    'J Crew': [
      { size: '0', bust: 33, waist: 25, hips: 35 },
      { size: '2', bust: 34, waist: 26, hips: 36 },
      { size: '4', bust: 35, waist: 27, hips: 37 },
      { size: '6', bust: 36, waist: 28, hips: 38 },
      { size: '8', bust: 37, waist: 29, hips: 39 },
      { size: '10', bust: 38, waist: 30, hips: 40 },
      { size: '12', bust: 39.5, waist: 31.5, hips: 41.5 },
      { size: '14', bust: 41, waist: 33, hips: 43 },
      { size: '16', bust: 43.5, waist: 35.5, hips: 45.5 },
      { size: '18', bust: 46, waist: 38, hips: 48 },
      { size: '20', bust: 48.5, waist: 40.5, hips: 50.5 },
    ],
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const numValue = value === '' ? null : parseFloat(value);
    setMeasurements(prev => ({ ...prev, [name]: numValue }));
  
    if (numValue !== null) {
      switch (name) {
        case 'waist':
          checkWaistMeasurement(numValue);
          break;
        case 'bust':
          checkBustMeasurement(numValue);
          break;
        case 'hips':
          checkHipsMeasurement(numValue);
          break;
      }
    } else {
      // Clear error when input is empty
      switch (name) {
        case 'waist':
          setWaistError('');
          break;
        case 'bust':
          setBustError('');
          break;
        case 'hips':
          setHipsError('');
          break;
      }
    }
  };

  const checkWaistMeasurement = (waist: number) => {
    if (waist <= smallestWaist - 1) {
      setWaistError("Your waist measurement is too small for this size calculator.");
    } else if (waist >= largestWaist + 1) {
      setWaistError("Your waist measurement is too large for this size calculator.");
    } else {
      setWaistError('');
    }
  };

  const checkBustMeasurement = (bust: number) => {
    if (bust <= smallestBust - 1) {
      setBustError("Your bust measurement is too small for this size calculator.");
    } else if (bust >= largestBust + 1) {
      setBustError("Your bust measurement is too large for this size calculator.");
    } else {
      setBustError('');
    }
  };

  const checkHipsMeasurement = (hips: number) => {
    if (hips <= smallestHips - 1) {
      setHipsError("Your hips measurement is too small for this size calculator.");
    } else if (hips >= largestHips + 1) {
      setHipsError("Your hips measurement is too large for this size calculator.");
    } else {
      setHipsError('');
    }
  };

  const handleSeeMySizes = () => {
    if (!waistError && !bustError && !hipsError) {
      setShowResults(true);
    }
  };

  const calculateSizes = () => {
    if (!showResults || measurements.bust === null || measurements.waist === null || measurements.hips === null) return null;
  
    const validMeasurements: Required<Measurements> = measurements as Required<Measurements>;
  
    return Object.entries(sizeCharts).map(([brand, sizes]) => {
      const closestSize = sizes.reduce((closest, current) => {
        const currentDiff = 
          Math.abs(current.bust - validMeasurements.bust) +
          Math.abs(current.waist - validMeasurements.waist) +
          Math.abs(current.hips - validMeasurements.hips);
        const closestDiff = 
          Math.abs(closest.bust - validMeasurements.bust) +
          Math.abs(closest.waist - validMeasurements.waist) +
          Math.abs(closest.hips - validMeasurements.hips);
        return currentDiff < closestDiff ? current : closest;
      });
  
      const bustDiff = (validMeasurements.bust - closestSize.bust).toFixed(2);
      const waistDiff = (validMeasurements.waist - closestSize.waist).toFixed(2);
      const hipsDiff = (validMeasurements.hips - closestSize.hips).toFixed(2);

      return (
        <li key={brand} className="p-3 bg-white rounded-lg shadow mb-4">
          <span className="font-semibold text-lg text-pink-600">{brand}</span>
          <span className="block text-3xl font-bold text-gray-800 mt-1">Size {closestSize.size}</span>
          <div className="mt-2 text-sm text-gray-600">
            <p>Bust: {closestSize.bust}" (Difference: {bustDiff}")</p>
            <p>Waist: {closestSize.waist}" (Difference: {waistDiff}")</p>
            <p>Hips: {closestSize.hips}" (Difference: {hipsDiff}")</p>
          </div>
        </li>
      );
    });
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-gray-100 rounded-lg shadow-xl">
      <h1 className="text-4xl font-bold mb-8 text-gray-800 text-center">Women's Size Calculator</h1>
      <div className="space-y-4">
        <div>
          <label htmlFor="bust" className="block text-lg font-bold text-gray-700 mb-1">Bust (inches)</label>
          <input
            type="number"
            id="bust"
            name="bust"
            value={measurements.bust ?? ''}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 bg-white text-black"
          />
          {bustError && (
            <p className="mt-2 text-sm text-red-600">{bustError}</p>
          )}
        </div>
        <div>
          <label htmlFor="waist" className="block text-lg font-bold text-gray-700 mb-1">Waist (inches)</label>
          <input
            type="number"
            id="waist"
            name="waist"
            value={measurements.bust ?? ''}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 bg-white text-black"
          />
          {waistError && (
            <p className="mt-2 text-sm text-red-600">{waistError}</p>
          )}
        </div>
        <div>
          <label htmlFor="hips" className="block text-lg font-bold text-gray-700 mb-1">Hips (inches)</label>
          <input
            type="number"
            id="hips"
            name="hips"
            value={measurements.bust ?? ''}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 bg-white text-black"
          />
          {hipsError && (
            <p className="mt-2 text-sm text-red-600">{hipsError}</p>
          )}
        </div>
      </div>
      <div className="mt-6">
        <button
          onClick={handleSeeMySizes}
          disabled={!!waistError || !!bustError || !!hipsError}
          className={`w-full py-3 px-4 border border-transparent rounded-md shadow-sm text-lg font-bold ${
            waistError || bustError || hipsError
              ? 'bg-pink-300 text-gray-500 cursor-not-allowed'
              : 'text-white bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500'
          }`}
        >
          See my sizes
        </button>
      </div>
      {showResults && (
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Closest Size Matches:</h2>
          <div className="bg-pink-100 rounded-lg shadow-md p-4">
            <ul className="space-y-2">{calculateSizes()}</ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default SizeCalculator;