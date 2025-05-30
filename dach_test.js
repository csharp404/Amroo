// ====================
// Configuration & Utilities
// ====================
const API_BASE_URL = 'https://localhost:7133';

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  return parts.length === 2 ? parts.pop().split(';').shift() : null;
}

function getToken() {
  return localStorage.getItem('token') || getCookie('token');
}

function getAuthHeaders() {
  const token = getToken();
  return {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  };
}

function disableButtons(row) {
  row.querySelectorAll("button").forEach(btn => btn.disabled = true);
}

function updateCounts() {
  document.getElementById('count-graduation').textContent =
    document.querySelectorAll('#graduation tbody tr').length;

  document.getElementById('count-training').textContent =
    document.querySelectorAll('#training tbody tr').length;
}

function sanitize(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

// ====================
// Table Renderer Utility
// ====================
async function renderTable(endpoint, tbodyId, templateFn, sectionId = null) {
  const tbody = document.getElementById(tbodyId);
  tbody.innerHTML = '<tr><td colspan="5">جارٍ التحميل...</td></tr>';

  const data = await fetchData(endpoint);
  if (!data) return;

  const items = Array.isArray(data.$values) ? data.$values : data.$values ? [data] : [];

  tbody.innerHTML = '';
  if (items.length === 0) {
    tbody.innerHTML = '<tr><td colspan="5">لا توجد بيانات</td></tr>';
    return;
  }

  items.forEach(item => {
    const row = document.createElement('tr');
    row.innerHTML = templateFn(item);
    tbody.appendChild(row);
  });

  if (sectionId === 'graduation') updateCounts();
}

function fetchData(endpoint) {
  const url = `${API_BASE_URL}${endpoint}`;
  return fetch(url, {
    method: 'GET',
    headers: getAuthHeaders()
  })
    .then(response => {
      if (!response.ok) throw new Error(`فشل الاتصال: ${url}`);
      return response.json();
    })
    .catch(error => {
      console.error('Fetch error:', error);
      alert('حدث خطأ أثناء تحميل البيانات.');
      return null;
    });
}

// ====================
// Event Handlers
// ====================
function showSection(id) {
  document.querySelectorAll('.table-section').forEach(sec => sec.classList.remove('active'));

  if (id === 'details') {
    fetchStudentDetails().then(() => {
      document.getElementById(id).classList.add('active');
    });
  } else if (id === 'appointments') {
    fetchAppointments().then(() => {
      document.getElementById(id).classList.add('active');
    });
  } else if (id === 'graduation') {
    fetchGraduationProjects().then(() => {
      document.getElementById(id).classList.add('active');
      updateCounts();
    });
  } else {
    document.getElementById(id).classList.add('active');
  }
}

function saveNote() {
  const notes = document.getElementById("notes").value;
  const modal = document.getElementById("popup");
  const rowIndex = parseInt(modal.dataset.row);
  const status = parseInt(modal.dataset.status);
  const table = document.querySelector('.table-section.active table');
  const row = table.tBodies[0].rows[rowIndex];

  if (row) {
    const studentIdCell = row.cells[0];
    const studentId = studentIdCell ? studentIdCell.textContent.trim() : '';
    updateStatus({ closest: () => row }, status, studentId, notes);
    closePopup();
  }
}

function closePopup() {
  document.getElementById("popup").style.display = "none";
  document.getElementById("notes").value = "";
}

document.querySelector('button[onclick="showSection(\'training\')"]').addEventListener('click', function () {
  const submenu = document.getElementById('training-submenu');
  submenu.style.display = submenu.style.display === 'block' ? 'none' : 'block';
});

function showTrainingSection(type) {
  document.querySelectorAll('.table-section').forEach(sec => sec.classList.remove('active'));
  const section = type === 'reports' ? document.getElementById('training-reports') : document.getElementById('training-evaluations');
  section.classList.add('active');

  if (type === 'reports') {
    fetchTrainingReports();
  } else if (type === 'evaluations' && !section.dataset.loaded) {
    fetchTrainingRequestsByStudent();
    section.dataset.loaded = 'true';
  }
}

// ====================
// API Data Fetchers
// ====================
async function fetchTrainingReports() {
  renderTable('/api/Internship/Get-Internship-By-Doctor-ID', 'training-reports-body', internship => {
    const studentName = sanitize(internship.studentName || 'غير متوفر');
    const companyName = sanitize(internship.projectTitle || 'غير متوفر');
    const status = sanitize(internship.status || 'غير متوفر');
    const StudentId = internship.StudentId || '';

    return `
      <td>${studentName}</td>
      <td>${companyName}</td>
      <td><a href="request_inter.html?stdnum=${internship.studentId}" target="_blank">عرض التقرير</a></td>
      <td>${status}</td>
      <td class="actions">
        <button class="approve" onclick="updateStatus(this, 1, '${StudentId}')">مقبول</button>
        <button class="reject" onclick="updateStatus(this, 3, '${StudentId}')">مرفوض</button>
        <button class="modify" onclick="updateStatus(this, 2, '${StudentId}')">تعديل</button>
      </td>`;
  });
}

async function fetchTrainingRequestsByStudent() {
  renderTable('/api/Internship/Get-InternshipAcceptToDoctor-By-Doctor-ID', 'training-evaluations-body', internship => {
    const id = internship.studentId || 'غير متوفر';
    const company = sanitize(internship.companyName || 'غير متوفر');
    const type = sanitize(internship.typeOfInternship || 'غير متوفر');
    const status = sanitize(internship.statusDetails || 'غير متوفر');

    return `
      <td>${id}</td>
      <td>${company}</td>
      <td>${type}</td>
      <td>${status}</td>
      <td class="actions">
        <button class="approve" onclick="updateStatus(this, 1)">مقبول</button>
        <button class="reject" onclick="updateStatus(this, 3)">مرفوض</button>
        <button class="modify" onclick="updateStatus(this, 2)">تعديل</button>
      </td>`;
  });
}

async function fetchStudentDetails() {
  renderTable('/api/Internship/AllStudentByDoctorId', 'student-details-body', student => {
    const number = student.studentNumber || 'غير متوفر';
    const name = sanitize(student.studentName || 'غير متوفر');
    const project = sanitize(student.projectId || 'غير متوفر');
    const status = sanitize(student.project?.status || 'غير متوفر');

    return `
      <td>${number}</td>
      <td>${name}</td>
      <td>${project}</td>
      <td>${status}</td>
      <td class="actions">
        <button class="approve" onclick="updateStatus(this, 1)">مقبول</button>
        <button class="reject" onclick="updateStatus(this, 3)">مرفوض</button>
        <button class="modify" onclick="updateStatus(this, 2)">تعديل</button>
      </td>`;
  });
}

async function fetchAppointments() {
  renderTable('/api/Grad/Get-Appointment-asDoctor', 'appointments-body', appointment => {
    const name = sanitize(appointment.student?.studentName || 'غير متوفر');
    let date = 'غير متوفر';
    if (appointment.dateAppointment) {
      const d = new Date(appointment.dateAppointment);
      date = d.toLocaleDateString('ar-SA');
    }
    const time = appointment.timeAppointment || 'غير متوفر';
    const status = appointment.stauts || 'غير متوفر';

    return `
      <td>${name}</td>
      <td>${date}</td>
      <td>${time}</td>
      <td>${status}</td>
      <td class="actions">
        <button class="approve" onclick="updateStatus(this, 1)">مقبول</button>
        <button class="reject" onclick="updateStatus(this, 3)">مرفوض</button>
        <button class="modify" onclick="editAppointment(this)">تعديل</button>
      </td>`;
  });
}

async function fetchGraduationProjects() {
  renderTable('/api/Grad/Proposal-Get-By-DoctorId', 'graduation-body', project => {
    const studentName = sanitize(project.student?.$values?.[0]?.studentName || 'غير متوفر');
    const title = sanitize(project.title || 'غير متوفر');
    const status = sanitize(project.statusDetails || 'غير متوفر');

    return `
      <td>${studentName}</td>
      <td>${title}</td>
      <td><a href="proposal_readonly.html" target="_blank">عرض التقرير</a></td>
      <td>${status}</td>
      <td class="actions">
        <button class="approve" onclick="updateStatus(this, 1)">مقبول</button>
        <button class="reject" onclick="updateStatus(this, 3)">مرفوض</button>
        <button class="modify" onclick="updateStatus(this, 2)">تعديل</button>
      </td>`;
  }, 'graduation');
}

// ====================
// Status Update Function
// ====================
async function updateStatus(btn, status, studentId, details = '') {
  const row = btn.closest('tr');

  if (status === 2) {
    const modal = document.getElementById("popup");
    modal.style.display = "flex";
    modal.dataset.row = Array.from(row.parentNode.rows).indexOf(row);
    modal.dataset.status = status;
    return;
  }

  try {
    const isGraduation = row.closest('.table-section')?.id === 'graduation';
    const baseUrl = isGraduation
      ? '/api/Grad/Proposal-Update-Status'
      : '/api/Internship/internship-Update-Status';

    // Append studentId as query param
    const url = `${API_BASE_URL}${baseUrl}?studentId=${encodeURIComponent(studentId)}`;

    const payload = { status, details };

    const response = await fetch(url, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(payload)
    });

    if (!response.ok) throw new Error('فشل في تحديث الحالة');

    const result = await response.json();

    // Update UI
    const displayText = result.statusDetails || (
      status === 1 ? "مقبول" :
      status === 3 ? "مرفوض" : "تعديل مطلوب"
    );
    row.cells[3].textContent = displayText;
    disableButtons(row);

  } catch (error) {
    console.error('Error updating status:', error);
    alert('حدث خطأ أثناء تحديث الحالة.');
  }
}

function editAppointment(btn) {
  const row = btn.closest('tr');
  const currentStatus = row.cells[3].textContent;
  if (currentStatus === "Pending") {
    row.cells[3].textContent = "Scheduled";
    disableButtons(row);
  } else {
    alert("لا يمكن تعديل الموعد");
  }
}

// ====================
// Initialize on Load
// ====================
window.onload = function () {
  updateCounts();
  showSection('graduation'); // Default view
};