export function buildKeyboard(layout, keyboardElement, handleClick) {
	layout.forEach((row) => {
		const rowDiv = document.createElement('div');
		rowDiv.classList.add('row');

		row.forEach((key) => {
			const btn = document.createElement('button');
			btn.classList.add('key');

			if (
				[
					'Esc',
					'Shift',
					'\\',
					'Tab',
					'Space',
					'Enter',
					'⟵',
					'CapsLock',
				].includes(key)
			) {
				btn.classList.add('extra-wide');
			}

			if (['Space', 'Enter', '⟵', 'CapsLock', 'Shift'].includes(key)) {
				const actionMap = {
					Space: 'space',
					Enter: 'enter',
					'⟵': 'backspace',
					CapsLock: 'capslock',
					Shift: 'shift',
				};
				btn.dataset.action = actionMap[key];
			}

			btn.textContent = key;
			if (key.length === 1) {
				btn.dataset.base = key;
			}

			rowDiv.appendChild(btn);
		});

		keyboardElement.appendChild(rowDiv);
	});

	keyboardElement.addEventListener('click', handleClick);
}
