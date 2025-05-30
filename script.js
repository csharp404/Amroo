function getToken() {
  const cookieToken = getCookie('token');
  const localStorageToken = localStorage.getItem('token');
  return cookieToken || localStorageToken;
}
function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}
    const token = getToken();
const tasks = [];
const gantt = document.getElementById("gantt");
const timeline = document.getElementById("timeline");

function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function addTask() {
    const name = document.getElementById("taskName").value;
    const start = document.getElementById("startDate").value;
    const end = document.getElementById("endDate").value;
    const description = document.getElementById("taskDescription").value;

    if (!name || !start || !end || !description) {
        alert("يرجى ملء جميع الحقول!");
        return;
    }

    if (new Date(end) < new Date(start)) {
        alert("تاريخ الانتهاء يجب أن يكون بعد تاريخ البدء!");
        return;
    }

    tasks.push({ name, start, end, description });
    document.getElementById("taskName").value = '';
    document.getElementById("startDate").value = '';
    document.getElementById("endDate").value = '';
    document.getElementById("taskDescription").value = '';
    renderChart();
}

function renderChart() {
    gantt.innerHTML = "";
    timeline.innerHTML = "";

    if (tasks.length === 0) return;

    const allDates = tasks.flatMap(t => [new Date(t.start), new Date(t.end)]);
    const minDate = new Date(Math.min(...allDates));
    const maxDate = new Date(Math.max(...allDates));
    const totalDays = (maxDate - minDate) / (1000 * 60 * 60 * 24);

    for (let i = 0; i <= totalDays; i++) {
        const date = new Date(minDate);
        date.setDate(minDate.getDate() + i);
        const div = document.createElement("div");
        div.textContent = date.toISOString().split('T')[0];
        div.style.flex = "1";
        div.style.minWidth = "50px";
        timeline.appendChild(div);
    }

    tasks.forEach((task, index) => {
        const bar = document.createElement("div");
        bar.className = "task-bar";
        bar.textContent = task.name;
        bar.setAttribute("data-description", task.description);

        const startOffset = (new Date(task.start) - minDate) / (1000 * 60 * 60 * 24);
        const duration = (new Date(task.end) - new Date(task.start)) / (1000 * 60 * 60 * 24) + 1;

        const leftPercent = (startOffset / totalDays) * 100;
        const widthPercent = (duration / totalDays) * 100;
        bar.style.top = `${index * 40}px`;
        bar.style.left = `${Math.min(leftPercent, 100)}%`;
        bar.style.width = `${Math.min(widthPercent, 100 - leftPercent)}%`;
        bar.style.backgroundColor = getRandomColor();

        gantt.appendChild(bar);
    });
}

// Department selection message handler
document.getElementById("department-1").addEventListener("change", function() {
    const departmentId = this.value;
    const messageDiv = document.getElementById("department-message");

    if (departmentId === "22222222-2222-2222-2222-222222222222") {
        messageDiv.textContent = "هذا الاختيار يشمل جميع تخصصات النظم";
        messageDiv.style.display = "block";
    } else if (departmentId === "11111111-1111-1111-1111-111111111111") {
        messageDiv.textContent = "هذا الاختيار يشمل جميع تخصصات علم الحاسوب";
        messageDiv.style.display = "block";
    } else {
        messageDiv.textContent = "";
        messageDiv.style.display = "none";
    }
});

// Form submission handler
document.getElementById("proposalForm").addEventListener("submit", async function(event) {
    event.preventDefault();

    // Collect student information
    const students = [];
    for (let i = 1; i <= 4; i++) {
        const name = document.getElementById(`student-name-${i}`).value.trim();
        const number = document.getElementById(`student-id-${i}`).value.trim();
        if (name && number) {
            students.push({ name, number });
        }
    }

    if (students.length === 0) {
        alert("يرجى إدخال اسم ورقم طالب واحد على الأقل.");
        return;
    }

    // Collect other form data
    const departmentId = document.getElementById("department-1").value;
    const doctorId = document.getElementById("department-2").value;
    const title = document.getElementById("project-title").value;
    const number = document.getElementById("project-number").value;
    const description = document.getElementById("description").value;
    const objective = document.getElementById("objectives").value;
    const timeLine = document.getElementById("timeline").value;

    // Prepare the payload
    const payload = {
        students,
        doctorId,
        departmentId,
        title,
        description,
        number,
        objective,
        timeLine,
        tasks: tasks.map(task => ({
            title: task.name,
            description: task.description,
            starTime: new Date(task.start).toISOString(), // Convert to ISO 8601
            endTime: new Date(task.end).toISOString()    // Convert to ISO 8601
        }))
    };

    try {
        
        const response = await fetch("https://localhost:7133/api/Grad/Create-Proposal", {
            method: "POST",
            headers: {
                'Authorization':`Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        });
        if (response.ok) {
            alert("تم إرسال الاقتراح بنجاح!");
            window.location.href = "dashborad.html"; // Redirect to dashboard
        } else {
            const errorText = await response.text();
            alert(`خطأ في إرسال الاقتراح: ${errorText}`);
        }
    } catch (error) {
        console.error("خطأ في الإرسال:", error);
        alert("حدث خطأ أثناء إرسال الاقتراح.");
    }
});