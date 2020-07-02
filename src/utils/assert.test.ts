import { assertIsDefined } from './assert';

describe('assert', () => {

	test('assertIsDefined', () => {
		let value: string | undefined;
		const message = 'value is undefined';

		expect(() => assertIsDefined(value, message)).toThrowError(message);
	})

})
