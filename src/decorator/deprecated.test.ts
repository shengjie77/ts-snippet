import { deprecated } from './deprecated';

describe('deprecated', () => {

	test('method', () => {
		const fn = jest.fn();

		class Foo {
			@deprecated()
			public test(...args: any[]) {
				fn(...args);
			}
		}

		const logger = jest.fn();
		const arg1 = 1;
		const arg2 = "2";
		replaceWarn(logger, () => {
			const foo = new Foo();
			foo.test(arg1, arg2);
		})
		expect(fn).toBeCalledWith(arg1, arg2);
		expect(logger).toBeCalledWith('Deprecated: test is deprecated. ');
	})

	test('method(with message)', () => {
		const fn = jest.fn();

		const msg = 'Use another api.';
		class Foo {
			@deprecated(msg)
			public test(...args: any[]) {
				fn(...args);
			}
		}

		const logger = jest.fn();
		replaceWarn(logger, () => {
			const foo = new Foo();
			foo.test();
		})
		expect(logger).toBeCalledWith(`Deprecated: test is deprecated. ${msg}`);
	})

})

type Logger = (message?: any, ...optionalParams: any[]) => void;

function replaceWarn(logger: Logger, fn: () => void) {
	const warn = console.warn;

	console.warn = logger;
	fn();

	console.warn = warn;
}
