let students = [
    { name: "Piyush", rollNumber: 31, marks: 80 },
    { name: "Jenny", rollNumber: 15, marks: 69 },
    { name: "Kaushal", rollNumber: 16, marks: 35 },
    { name: "Dilpreet", rollNumber: 7, marks: 55 },
  ];
  
  // Q1 - Return only the names of students in capital

  // Q2 - we want to get the details of students who scored more than 60 marks.

let names = students.filter(stu => stu.marks > 60);
console.log(names);


// Q3 - Get the details of students who scored more than 60 marks and have rollNumber greater than 15.

let names = students.filter(stu => stu.marks > 60 && stu.rollNumber > 20)
console.log(names);


// Q4 - Sum total of the marks of the students

let totalMarks = students.reduce( ((acc,emp) => acc+emp.marks), 0)
console.log(totalMarks);


// Q5 - Get only the names of the students who scored more than 60 marks

let names = students.filter(stu => stu.marks > 50).map(stu => stu.name)
console.log(names);


// Q6 - print the total marks of the students with marks greater than 60 after 20 marks has been added to those students who scored less than 60.

let totalMarks = studentRecords.map(function(stu){ 
    if(stu.marks < 60){
        stu.marks += 20;}
    return stu;
}).filter(stu => stu.marks > 60).reduce((acc,curr) => acc+curr.marks, 0);