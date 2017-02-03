document.addEventListener('DOMContentLoaded',function() {
	const defaultDiary = [
		"Internet is a daily need",
		"Self-Esteem and Body Image",
		"Stress","Bullying",
		"Depression",
		"Drinking & Smoking",
		"Peer-Pressure",
		"Competition",
		"Suicide",
		"Violence",
		"Drugs",
	];
	const diaryContent = JSON.parse(localStorage.getItem('diaryContent')) || defaultDiary;
	const diary = document.getElementById('diary');

	function renderProblems() {
		diaryContent.forEach(function(problem) {
			const li = document.createElement('li');
			li.innerHTML = problem;
			diary.appendChild(li);
		});
	}

	renderProblems();

	diary.addEventListener('input', function() {
		const arr = this.innerText.split('\n')
								.filter(function(el) {
									return el.trim() !== "";
								});
								console.log(arr);
		localStorage.setItem('diaryContent', JSON.stringify(arr));
	});

});
