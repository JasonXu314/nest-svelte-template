export function fi<T>(): T {
	return undefined as T;
}

export function dateReplacer(_: any, value: any): string {
	if (value instanceof Date) {
		return `new Date(${value.toISOString()})`;
	} else {
		return JSON.stringify(value);
	}
}
