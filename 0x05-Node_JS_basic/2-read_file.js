const fs = require('fs');

function countStudents(path) {
  try {
    // Read the file synchronously
    const data = fs.readFileSync(path, 'utf8');

    // Split the file into lines and filter out empty lines
    const lines = data.split('\n').filter((line) => line.trim() !== '');

    if (lines.length <= 1) {
      throw new Error('Cannot load the database');
    }

    // Extract the header and the student data
    const header = lines[0].split(',');
    const students = lines.slice(1);

    // Initialize a structure to hold the field counts and student names
    const fields = {};

    students.forEach((student) => {
      const studentData = student.split(',');
      const field = studentData[3];
      const firstName = studentData[0];

      if (!fields[field]) {
        fields[field] = [];
      }
      fields[field].push(firstName);
    });

    console.log(`Number of students: ${students.length}`);
    for (const field in fields) {
      if (fields.hasOwnProperty(field)) {
        console.log(`Number of students in ${field}: ${fields[field].length}. List: ${fields[field].join(', ')}`);
      }
    }
  } catch (error) {
    throw new Error('Cannot load the database');
  }
}

module.exports = countStudents;


