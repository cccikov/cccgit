var student = require('student.js');
var teacher = require('./teacher');

teacher.add('Scott');

function add(teacherName,students){
	teacher.add();

	students.forEach(function(item,index){
		student.add(item);
	});
}

exports.add = add;//等价于module.exports.add = add
