import { useState } from 'react';

import { sum } from './utils/sum.js';

function App() {
	const [number1, setNumber1] = useState('');
	const [number2, setNumber2] = useState('');
	const [result, setResult] = useState();

	function handleCalculate() {
		const a = parseFloat(number1);
		const b = parseFloat(number2);

		if (isNaN(a) || isNaN(b)) {
			alert('Please enter valid numbers!');

			return;
		}

		const calculatedResult = sum(a, b);

		setResult(calculatedResult);
	}

	function handleReset() {
		setNumber1('');
		setNumber2('');
		setResult(undefined);
	}

	return (
		<div className="min-h-screen bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center p-8">
			<div className="w-full max-w-md bg-white rounded-2xl p-8 shadow-xl">
				<h1 className="text-3xl font-semibold text-gray-800 mb-8 text-center">Sum Calculator</h1>

				<div className="space-y-4">
					<div className="flex gap-4">
						<input
							type="number"
							className="w-1/2 flex-1 px-3 py-3 border-2 border-gray-200 rounded-lg text-base transition-colors focus:outline-none focus:border-indigo-500"
							placeholder="First number"
							value={number1}
							onChange={(e) => setNumber1(e.target.value)}
						/>
						<input
							type="number"
							className="w-1/2 flex-1 px-3 py-3 border-2 border-gray-200 rounded-lg text-base transition-colors focus:outline-none focus:border-indigo-500"
							placeholder="Second number"
							value={number2}
							onChange={(e) => setNumber2(e.target.value)}
						/>
					</div>

					<div className="flex gap-4">
						<button
							className="flex-1 bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-8 py-3 rounded-lg font-semibold cursor-pointer transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0"
							onClick={handleCalculate}
						>
							Calculate Sum
						</button>
						<button
							className="flex-1 bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-8 py-3 rounded-lg font-semibold cursor-pointer transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0"
							onClick={handleReset}
						>
							Reset
						</button>
					</div>

					{result !== undefined && (
						<div className="mt-8 p-4 bg-gray-50 rounded-lg border-l-4 border-indigo-500">
							<div className="text-xl font-semibold text-gray-800">Result:</div>
							<div className="text-3xl font-bold text-indigo-500 mt-2">{result}</div>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}

export default App;
