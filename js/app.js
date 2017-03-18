document.addEventListener('DOMContentLoaded',function() {
	function setDiaryProblems(Problems) {
		localStorage.setItem('Problems', JSON.stringify(Problems));
	}

	function getDiaryProblems() {
		var data = JSON.parse(localStorage.getItem('Problems'));
		if(data && data.length)
			return data;
		return undefined;
	}

	function setDiarySolutions(Solutions) {
		localStorage.setItem('Solutions', JSON.stringify(Solutions));
	}

	function getDiarySolutions() {
		var data = JSON.parse(localStorage.getItem('Solutions'));
		if(data && data.length)
			return data;
		return undefined;
	}

	var defaultDiaryProblems = [
		"Internet is a daily need",
		"Self-Esteem and Body Image",
		"Stress",
		"Bullying",
		"Depression",
		"Drinking & Smoking",
		"Peer-Pressure",
		"Competition",
		"Suicide",
		"Violence",
		"Drugs",
	];

	var defaultDiarySolutions = [
		"Don't over use the Internet. Use it as long as its necessary.",
		"Forgive yourself. Everyone makes mistakes — and mistakes aren't permanent reflections on you as a person. Stop the negative self talk. Surround yourself with people that have healthy relationships with their bodies and healthy relationships with food.",
		"Focus as much as possible on doing one thing at a time. Clear your desk of distractions. Pick something to work on.",
		"Stand up for people who are bullied. Bullies often want an audience and approval.",
		"Avoid caffeine, which reduces serotonin levels. Expose yourself to sunlight, which can boost mood and increase Vitamin D levels.",
		"Avoid places where people smoke or drink. Being near places where smoking and drinking are encouraged can be dangerous when you are trying to quit. Avoid bars and other places where alcohol and tobacco are likely to be used.Take a break from people who regularly drink/smoke.",
		"Use a strong voice, stand up tall, and look the peers in the eye",
		"Take in your surroundings and know who your competitors are, both near and far. & beat them up",
		"You're not alone; many of us have had suicidal thoughts at some point in our lives. Feeling suicidal is not a character defect, and it doesn't mean that you are crazy, or weak, or flawed. It only means that you have more pain than you can cope with right now. This pain seems overwhelming and permanent at the moment. But with time and support, you can overcome your problems and the pain and suicidal feelings will pass.",
		"Work together for peace, justice, and reconciliation at all levels - local, regional, and global. To embrace creative approaches to peace building which are consonant with the spirit of the gospel.",
		"Stop the addictive behavior as planned. When the big day arrives, keep your promise to yourself and quit.",
	];

	var Problems = getDiaryProblems() || defaultDiaryProblems;
	var Solutions = getDiarySolutions() || defaultDiarySolutions;
	var diary = document.getElementById('diary');

	function renderProblems() {
		Problems.forEach(function(problem,index) {
			var li = document.createElement('li');
			var span = document.createElement('span');
			span.innerHTML = '<span class="problem" id="' + index + '" contenteditable>' + problem + '</span>' +
											'<span id="buttons">' +
											'<button class="view bttn-success bttn-fill bttn-sm">View Solution</button>' +
											' <button class="edit bttn-primary bttn-simple bttn-sm">Edit Solution</button> ' +
											'<button class="delete bttn-danger bttn-fill bttn-sm">Delete Problem</button>'
											'</span>';
			li.appendChild(span);
			diary.appendChild(li);
		});
		setDiaryProblems(Problems);
		setDiarySolutions(Solutions);
	}

	renderProblems();

	diary.querySelectorAll('.view').forEach(function (viewBtn) {
		viewBtn.addEventListener('click', function() {
			var parent = this.parentElement;
			var index = Problems.indexOf(parent.parentNode.firstChild.innerText);
			swal(
			  Problems[index],
			  Solutions[index]
			);
		});
	});

	diary.querySelectorAll('.edit').forEach(function (editBtn) {
		editBtn.addEventListener('click', function() {
			var parent = this.parentElement;
			var index = Problems.indexOf(parent.parentNode.firstChild.innerText);
			swal({
			  title: Problems[index],
			  html: "<i><b>Previous Solution:</b></i><br/>" + Solutions[index],
			  input: 'text',
			  showCancelButton: true,
			  confirmButtonText: 'Submit',
			  showLoaderOnConfirm: true,
			  allowOutsideClick: false
			}).then(function (text) {
			  swal({
			    type: 'success',
			    title: 'Edit Solution!',
			    html: 'Submitted solution: ' + text
			  });
			  Solutions[index] = text;
			  setDiarySolutions(Solutions);
			});
		});
	});

	diary.querySelectorAll('.delete').forEach(function (deleteBtn) {
		deleteBtn.addEventListener('click', function() {
			var parent = this.parentElement;
			var li = parent.parentNode.parentNode;
			var index = Problems.indexOf(parent.parentNode.firstChild.innerText);
			li.parentNode.removeChild(li);
			Problems.splice(index,1);
			Solutions.splice(index,1);
			setDiaryProblems(Problems);
			setDiarySolutions(Solutions);
		});
	});

	diary.querySelectorAll('.problem').forEach(function (problem) {
		problem.addEventListener('input', function() {
			if(this.innerText.trim() == '')
				Problems.splice(+this.parentElement.firstChild.id,1);
			else
				Problems[+this.id] = this.innerText;
			setDiaryProblems(Problems);
		});
	});

});
