// عند تحميل الصفحة يتم جلب المواعيد
document.addEventListener('DOMContentLoaded', function () {
    fetchAppointments();
});
function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}
function getToken() {
  const cookieToken = getCookie('token');
  const localStorageToken = localStorage.getItem('token');
  return cookieToken || localStorageToken;
}
    const token = getToken();

// 1. جلب المواعيد من الـ API
function fetchAppointments() {
   
    console.log("جارٍ جلب المواعيد...");
    fetch('https://localhost:7133/api/Grad/Get-Appointment', {
        method: 'GET',
        headers: {
            'Authorization':`Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    })
        .then(response => {
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            return response.json();
        })
        .then(data => {
            console.log("المواعيد المستلمة:", data);
            const appointments = data.$values || [];
            displayAppointments(appointments);
        })
        .catch(error => {
            console.error('Error fetching appointments:', error);
            alert('فشل في تحميل المواعيد. يرجى التأكد من تشغيل الخادم.');
        });
}

// 2. عرض المواعيد في الجدول
function displayAppointments(appointments) {
    const tableBody = document.getElementById('appointmentTableBody');
    tableBody.innerHTML = ''; // مسح البيانات القديمة

    appointments.forEach(appt => {
        const newRow = document.createElement('tr');
        newRow.innerHTML = `
            <td>${appt.dateAppointment}</td>
            <td>${appt.timeAppointment}</td>
            <td>${appt.student?.studentName || 'غير معروف'}</td>
            <td>د. سامي</td>
            <td>${appt.stauts || 'Pending'}</td>
        
        `;
        tableBody.appendChild(newRow);
    });
 }
//   <td>
//                 <button onclick="updateStatus(this, 'Accepted')">Accept</button>
//                 <button onclick="updateStatus(this, 'Rejected')">Reject</button>
//             </td>
// 3. إضافة موعد جديد
document.getElementById('appointmentForm').addEventListener('submit', function (event) {
    event.preventDefault();
    addAppointment();
});

function addAppointment() {
    const dateInput = document.getElementById('date').value;

    if (!dateInput) {
        alert('يرجى اختيار التاريخ');
        return;
    }

    const time = "10:00"; // وقت ثابت مؤقت
    const appointmentData = {
        date: new Date(`${dateInput}T${time}:00`).toISOString(),
        time: new Date(`${dateInput}T${time}:00`).toISOString()
    };

    console.log("جارٍ إرسال الموعد الجديد...", appointmentData);


    fetch('https://localhost:7133/api/Grad/Create-Appointment', {
        method: 'POST',
        headers: {
            'Authorization':`Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(appointmentData)
    })
        .then(response => {
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            return response.text();
        })
        .then(message => {
            console.log("الرد من الخادم:", message);
            alert(message);

            const newRow = document.createElement('tr');
            newRow.innerHTML = `
                <td>${dateInput}</td>
                <td>${time}</td>
                <td>أحمد محمد</td>
                <td>د. سامي</td>
                <td>Pending</td>
                <td>
                    <button onclick="updateStatus(this, 'Accepted')">Accept</button>
                    <button onclick="updateStatus(this, 'Rejected')">Reject</button>
                </td>
            `;
            document.getElementById('appointmentTableBody').appendChild(newRow);
            document.getElementById('appointmentForm').reset();
        })
        .catch(error => {
            console.error('Error adding appointment:', error);
            alert('حدث خطأ أثناء إضافة الموعد. تأكد من تشغيل الخادم.');
        });
}

// 4. تحديث حالة الموعد
function updateStatus(button, newStatus) {
    const id = prompt("أدخل معرف الموعد (ID) لتحديث الحالة", "");

    if (!id) {
        alert("يجب إدخال المعرف");
        return;
    }

    const updateData = { id, status: newStatus };


    fetch('https://localhost:7133/api/Grad/Update-Appointment', {
        method: 'POST',
        headers: {
            'Authorization':`Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(updateData)
    })
        .then(response => {
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            return response.text();
        })
        .then(message => {
            alert(message);
            fetchAppointments(); // إعادة تحميل المواعيد بعد التحديث
        })
        .catch(error => {
            console.error('Error updating status:', error);
            alert('حدث خطأ أثناء تحديث الحالة');
        });
}