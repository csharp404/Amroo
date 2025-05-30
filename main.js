// Function to set language
function setLanguage(lang) {
    const translations = {
        arabic: {
            q1: 'س: ما المهارات التي يمكنني اكتسابها من التدريب؟',
            q2: 'س: لماذا يعتبر التدريب مهمًا للطلاب؟',
            q3: 'س: ما هي الفكرة الرئيسية للمشروع؟',
            q4: 'س: ما هو الجدول الزمني للمشروع؟',
            q5: 'س: هل يمكن أن يؤدي التدريب إلى الحصول على عرض عمل؟',
            q6: 'س: ماذا يجب أن أدرج في طلب التدريب الخاص بي؟',
            q7: 'س: كيف يمكنني تحقيق أقصى استفادة من فترة تدريبي؟',
            q8: 'س: ماذا يجب أن أفعل بعد الانتهاء من التدريب؟',
            q9: 'س: كيف أختار موضوع جيد لمشروع تخرجي؟',
            q10: 'س: كيف أضمن جودة مشروعي؟',
            a1: 'ج: التدريبات تساعد في تطوير المهارات التقنية، المعرفة الصناعية، الاتصال، حل المشكلات، العمل الجماعي، إدارة الوقت، وغالبًا ما توفر فهماً عملياً للبيئة المهنية.',
            a2: 'ج: التدريبات توفر تجربة عملية، مما يساعد الطلاب على تطبيق المعرفة النظرية في سيناريوهات العالم الحقيقي. تعزز المهارات التقنية وقد تؤدي إلى عروض عمل.',
            a3: 'ج: الفكرة الرئيسية للمشروع هي تقديم نظرة عامة مفصلة عن المشكلة التي يتم معالجتها، منهج الحل، وأهداف المشروع. يجب أن يوضح الهدف من المشروع ونتائجه المتوقعة.',
            a4: 'ج: الجدول الزمني للمشروع يحدد المعالم الرئيسية والمواعيد النهائية، بما في ذلك تخطيط المشروع، البحث، التطوير، الاختبار، وتواريخ التقديم. يساعد في تتبع التقدم وضمان الإنجاز في الوقت المحدد.',
            a5: 'ج: نعم، تعمل العديد من برامج التدريب المهني كمسار للحصول على وظيفة بدوام كامل. غالبًا ما تقوم الشركات بتوظيف المتدربين ذوي الأداء الأفضل بعد تخرجهم، لأنهم على دراية بثقافة الشركة وعملها.',
            a6: 'ج: يجب أن يتضمن طلب التدريب الخاص بك سيرتك الذاتية المحدثة، وخطاب تقديمي مصمم خصيصًا للمنصب، وأي مستندات داعمة مثل السجلات أو المراجع.',
            a7: 'ج: كن استباقيًا، واطرح الأسئلة، واطلب الملاحظات، وتواصل مع الزملاء والموجهين. اغتنم كل فرصة للتعلم والمساهمة في الفريق.',
            a8: 'ج: بعد الانتهاء من التدريب، تأكد من إرسال رسالة شكر، والتفكير في التجربة، والبقاء على اتصال مع مرشديك وزملائك. يمكن أن يساعدك هذا في بناء علاقات مهنية طويلة الأمد.',
            a9: 'ج: اختر موضوعًا يتماشى مع اهتماماتك ونقاط قوتك وأهدافك المهنية. يجب أن يكون الموضوع ذا صلة وقابلاً للتنفيذ ويسمح بالقدر الكافي من البحث والتطوير.',
            a10: 'ج: ركز على البحث الشامل، وتحليل البيانات بدقة، والكتابة الواضحة، والهيكل المنظم جيدًا. راجع عملك ونقحه بانتظام، واطلب الملاحظات من المشرف الخاص بك.',
            commonQuestionsTitle: 'الأسئلة الشائعة والأجوبة',
            chatHeader: 'اسأل استاذك',
            chatPlaceholder: 'اكتب رسالتك هنا...',
            chatWelcome: 'مرحبا! كيف يمكنني مساعدتك اليوم؟',
            chatNotification: 'هل لديك أي أسئلة حول التدريب أو مشاريع التخرج؟ أنا هنا لمساعدتك!',
            chatResponseInternship: 'التدريبات وسيلة رائعة لاكتساب خبرة عملية. هل ترغب في مزيد من المعلومات حول برامج التدريب لدينا؟',
            chatResponseProject: 'لدينا موارد تساعدك في مشروع تخرجك. هل تحتاج مساعدة في كتابة الاقتراح، الوثائق، أو التنفيذ؟',
            chatResponseHello: 'مرحبا! كيف يمكنني مساعدتك اليوم فيما يتعلق بالتدريب أو مشاريع التخرج؟',
            chatResponseDefault: 'شكراً لرسالتك. سيتواصل معك أحد أساتذتنا قريباً.',
            footerContent: '© 2023 أنظمة إدارة المشاريع والتدريب الميداني. كل الحقوق محفوظة.'
        },
        english: {
            q1: 'Q: What skills can I gain from an internship?',
            q2: 'Q: Why is an internship important for students?',
            q3: 'Q: What is the main idea of the project?',
            q4: 'Q: What is the project timeline?',
            q5: 'Q: Can an internship lead to a job offer?',
            q6: 'Q: What should I include in my internship application?',
            q7: 'Q: How can I make the most out of my internship?',
            q8: 'Q: What should I do after completing an internship?',
            q9: 'Q: How do I choose a good topic for my graduation project?',
            q10: 'Q: How do I ensure the quality of my project?',
            a1: 'A: Internships help develop technical skills, industry knowledge, communication, problem-solving, teamwork, time management, and often provide a practical understanding of the job environment.',
            a2: 'A: Internships provide hands-on experience, helping students apply theoretical knowledge in real-world scenarios. They enhance technical skills and can lead to job offers.',
            a3: 'A: The main idea of the project is to provide a detailed overview of the problem being addressed, the solution approach, and the project\'s objectives. It should clearly state the purpose of the project and its expected outcome.',
            a4: 'A: The project timeline outlines the major milestones and deadlines, including project planning, research, development, testing, and submission dates. It helps track progress and ensures timely completion.',
            a5: 'A: Yes, many internships serve as a pathway to full-time employment. Companies often hire top-performing interns after they graduate, as they are already familiar with the company\'s culture and work.',
            a6: 'A: Your internship application should include your updated resume, a cover letter tailored to the position, and any supporting documents like transcripts or references.',
            a7: 'A: Be proactive, ask questions, seek feedback, and network with colleagues and mentors. Take every opportunity to learn and contribute to the team.',
            a8: 'A: After completing an internship, be sure to follow up with a thank-you note, reflect on the experience, and stay in touch with your mentors and colleagues. This can help you build long-term professional relationships.',
            a9: 'A: Choose a topic that aligns with your interests, strengths, and career goals. It should be relevant, feasible, and allow for enough research and development.',
            a10: 'A: Focus on thorough research, accurate data analysis, clear writing, and a well-organized structure. Regularly review and revise your work, and seek feedback from your supervisor.',
            commonQuestionsTitle: 'Common Questions & Answers',
            chatHeader: 'Ask Your Professor',
            chatPlaceholder: 'Type your message here...',
            chatWelcome: 'Hello! How can I help you today?',
            chatNotification: 'Do you have any questions about internships or graduation projects? I\'m here to help!',
            chatResponseInternship: 'Internships are a great way to gain practical experience. Would you like me to provide more information about our internship programs?',
            chatResponseProject: 'We have resources to help with your graduation project. Do you need assistance with proposal writing, documentation, or implementation?',
            chatResponseHello: 'Hello! How can I assist you today with internships or graduation projects?',
            chatResponseDefault: 'Thank you for your message. One of our professors will get back to you shortly.',
            footerContent: '© 2023 Project management systems and field training. All rights reserved.'
        }
    };

    if (lang === 'arabic') {
        document.body.classList.remove('ltr');
        document.documentElement.lang = 'ar';
    } else {
        document.body.classList.add('ltr');
        document.documentElement.lang = 'en';
    }

    for (const key in translations[lang]) {
        document.getElementById(key).innerText = translations[lang][key];
    }
}

// Set default language to Arabic on page load
window.onload = function() {
    setLanguage('arabic');
};

// دوال الشات الجديدة
let chatOpen = false;

function toggleChat() {
    chatOpen = !chatOpen;
    document.getElementById('chatWindow').style.display = chatOpen ? 'flex' : 'none';

    // إخفاء إشارة التنبيه عند فتح الشات
    if (chatOpen) {
        document.getElementById('notificationBadge').style.display = 'none';
    }
}

function sendMessage() {
    const messageInput = document.getElementById('userMessage');
    const message = messageInput.value.trim();

    if (message !== '') {
        // إضافة رسالة المستخدم
        addMessage(message, 'user');

        // مسح حقل الإدخال
        messageInput.value = '';

        // محاكاة رد الدكتور (بعد 1 ثانية)
        setTimeout(() => {
            simulateDoctorResponse(message);
        }, 1000);
    }
}

function handleKeyPress(event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
}

function addMessage(text, sender) {
    const chatMessages = document.getElementById('chatMessages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}-message`;
    messageDiv.textContent = text;
    chatMessages.appendChild(messageDiv);

    // تمرير للأسفل لعرض أحدث رسالة
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function simulateDoctorResponse(userMessage) {
    const translations = {
        arabic: {
            internship: 'التدريبات وسيلة رائعة لاكتساب خبرة عملية. هل ترغب في مزيد من المعلومات حول برامج التدريب لدينا؟',
            project: 'لدينا موارد تساعدك في مشروع تخرجك. هل تحتاج مساعدة في كتابة الاقتراح، الوثائق، أو التنفيذ؟',
            hello: 'مرحبا! كيف يمكنني مساعدتك اليوم فيما يتعلق بالتدريب أو مشاريع التخرج؟',
            default: 'شكراً لرسالتك. سيتواصل معك أحد أساتذتنا قريباً.'
        },
        english: {
            internship: 'Internships are a great way to gain practical experience. Would you like me to provide more information about our internship programs?',
            project: 'We have resources to help with your graduation project. Do you need assistance with proposal writing, documentation, or implementation?',
            hello: 'Hello! How can I assist you today with internships or graduation projects?',
            default: 'Thank you for your message. One of our professors will get back to you shortly.'
        }
    };

    const lang = document.documentElement.lang;
    let response = translations[lang].default;

    if (userMessage.toLowerCase().includes('internship')) {
        response = translations[lang].internship;
    } else if (userMessage.toLowerCase().includes('project')) {
        response = translations[lang].project;
    } else if (userMessage.toLowerCase().includes('hello') || userMessage.toLowerCase().includes('hi')) {
        response = translations[lang].hello;
    }

    // إضافة رد الدكتور
    addMessage(response, 'doctor');
}

// محاكاة استلام رسالة جديدة بعد 30 ثانية
setTimeout(() => {
    if (!chatOpen) {
        document.getElementById('notificationBadge').style.display = 'flex';
        // إضافة رسالة في الشات (ستظهر عند فتح الشات)
        addMessage(document.documentElement.lang === 'ar' ? 'هل لديك أي أسئلة حول التدريب أو مشاريع التخرج؟ أنا هنا لمساعدتك!' : 'Do you have any questions about internships or graduation projects? I\'m here to help!', 'doctor');
    }
}, 30000);
function toggleChat() {
    const chatWindow = document.getElementById('chatWindow');
    const overlay = document.querySelector('.overlay');
    if (chatWindow.style.display === 'none') {
        chatWindow.style.display = 'flex';
        overlay.style.display = 'block';
    } else {
        chatWindow.style.display = 'none';
        overlay.style.display = 'none';
    }
}

function sendMessage() {
    const userMessage = document.getElementById('userMessage').value;
    if (userMessage.trim() !== '') {
        const chatMessages = document.getElementById('chatMessages');
        const messageDiv = document.createElement('div');
        messageDiv.className = 'message user-message';
        messageDiv.textContent = userMessage;
        chatMessages.appendChild(messageDiv);
        document.getElementById('userMessage').value = '';
        chatMessages.scrollTop = chatMessages.scrollHeight;

        // Simulate doctor's response
        setTimeout(() => {
            const doctorMessageDiv = document.createElement('div');
            doctorMessageDiv.className = 'message doctor-message';
            doctorMessageDiv.textContent = 'شكرًا لرسالتك! سأعود لك قريبًا.';
            chatMessages.appendChild(doctorMessageDiv);
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }, 1000);
    }
}

function handleKeyPress(event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
}

function setLanguage(language) {
    if (language === 'english') {
        document.documentElement.lang = 'en';
        document.querySelectorAll('[data-ar]').forEach(element => {
            element.textContent = element.getAttribute('data-en');
        });
    } else if (language === 'arabic') {
        document.documentElement.lang = 'ar';
        document.querySelectorAll('[data-en]').forEach(element => {
            element.textContent = element.getAttribute('data-ar');
        });
    }
}

function logout() {
    window.location.href = 'index.html';
}

