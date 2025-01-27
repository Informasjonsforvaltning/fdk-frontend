export const print = (str?: string) => {
	return str || '[undefined]';
}

export const sumArrayLengths = (...arrays: any[][]) => {
    return arrays.reduce((sum, array) => sum + (array?.length || 0), 0);
}
