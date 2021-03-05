import React, { useState, useCallback } from 'react';

function useInput({ initialValue = null }) {
	const [value, setValue] = useState(initialValue);

	// 함수를 캐싱하기 위해 useCallback 훅을 사용한다.
	const handler = useCallback((e) => {
		setValue(e.target.value);
	}, []);

	return [value, handler];
}

export default useInput;
