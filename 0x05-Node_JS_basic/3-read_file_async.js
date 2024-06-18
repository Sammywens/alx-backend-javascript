const fs = require('fs');

/**
 * Counts the students in a CSV data file.
 * @param {String} dataPath The path to the CSV data file.
 */
const countStudents = (dataPath) => new Promise((resolve, reject) => {
  fs.readFile(dataPath, 'utf-8', (err, data) => {
    if (err) {
      reject(new Error('Cannot load the database'));
      return;
    }
    if (data) {
      const fileLines = data.trim().split('\n');
      const studentGroups = {};
      const dbFieldNames = fileLines[0].split(',');
      const studentPropNames = dbFieldNames.slice(0, -1);

      for (const line of fileLines.slice(1)) {
        const studentRecord = line.split(',');
        const studentPropValues = studentRecord.slice(0, -1);
        const field = studentRecord[studentRecord.length - 1];
        if (!studentGroups[field]) {
          studentGroups[field] = [];
        }
        const studentEntry = Object.fromEntries(
          studentPropNames.map((propName, idx) => [propName, studentPropValues[idx]])
        );
        studentGroups[field].push(studentEntry);
      }

      const totalStudents = Object.values(studentGroups).reduce(
        (pre, cur) => pre + cur.length,
        0
      );

      console.log(`Number of students: ${totalStudents}`);

      for (const [field, group] of Object.entries(studentGroups)) {
        const studentNames = group.map(student => student.firstname).join(', ');
        console.log(`Number of students in ${field}: ${group.length}. List: ${studentNames}`);
      }
      resolve(true);
    }
  });
});

module.exports = countStudents;
