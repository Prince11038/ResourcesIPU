// Get references to DOM elements
const courseForm = document.getElementById('gpa-form');
const coursesDiv = document.getElementById('courses');
const calculateButton = document.getElementById('calculate-gpa');
const gpaResult = document.getElementById('gpa-result');

// Array to store course data
let courses = [];

// Add event listener to handle form submission
courseForm.addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent default form submission

    // Get course details from form fields
    const courseName = document.getElementById('course-name').value;
    const credits = parseFloat(document.getElementById('course-credits').value);
    const grade = parseFloat(document.getElementById('course-grade').value);

    // Validate input (optional)
    if (isNaN(credits) || credits < 1) {
        alert("Please enter a valid number of credits (minimum 1).");
        return;
    }

    if (grade < 4 || grade > 10) {
        alert("Please enter a valid grade point between 4 and 10.");
        return;
    }

    // Create a course object to store course details
    const course = {
        name: courseName,
        credits: credits,
        grade: grade
    };

    // Add the new course to the courses array
    courses.push(course);

    // Display added course (optional)
    coursesDiv.innerHTML += `<p>Course: ${courseName}, Credits: ${credits}, Grade Point: ${grade}</p>`;

    // Clear form fields after successful submission
    courseForm.reset();
});

// Add event listener to handle calculate GPA button click
calculateButton.addEventListener('click', function () {
    if (courses.length === 0) {
        alert("Please add at least one course before calculating GPA.");
        return;
    }

    // Initialize variables to store total quality points and credits
    let totalQualityPoints = 0;
    let totalCredits = 0;

    // Loop through each course in the courses array
    for (const course of courses) {
        // Calculate quality points for the current course (credits * grade)
        let qualityPoints = course.credits * course.grade;
        totalQualityPoints += qualityPoints;
        totalCredits += course.credits;
    }

    // Calculate GPA (total quality points / total credits)
    let gpa;
    if (totalCredits > 0) {
        gpa = totalQualityPoints / totalCredits;
    } else {
        gpa = 0; // Handle case of no courses with valid credits
    }

    // Display GPA with two decimal places
    gpaResult.textContent = `Your GPA is: ${gpa.toFixed(2)}`;
});
