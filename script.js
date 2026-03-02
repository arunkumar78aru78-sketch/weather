const defaultActivities = [
    { id: 1, name: "HTML Basics", description: "Learn HTML structure and tags", completed: false },
    { id: 2, name: "CSS Styling", description: "Learn colors, layout, and design", completed: false },
    { id: 3, name: "JavaScript Basics", description: "Learn variables and functions", completed: false },
    { id: 4, name: "DOM Manipulation", description: "Interact with webpage elements", completed: false },
    { id: 5, name: "Mini Project", description: "Build a simple webpage project", completed: false },
    { id: 6, name: "Final Review", description: "Revise all concepts", completed: false }
];

let activities = JSON.parse(localStorage.getItem("activities")) || defaultActivities;

const activityList = document.getElementById("activityList");
const progressText = document.getElementById("progressText");
const progressFill = document.getElementById("progressFill");

function renderActivities() {
    activityList.innerHTML = "";

    activities.forEach(activity => {
        const card = document.createElement("div");
        card.className = "activity-card";

        if (activity.completed) {
            card.classList.add("completed");
        }

        card.innerHTML = `
            <h3>${activity.name}</h3>
            <p>${activity.description}</p>
            <p class="status">Status: ${activity.completed ? "Completed" : "Pending"}</p>
            <button ${activity.completed ? "disabled" : ""} onclick="markCompleted(${activity.id})">
                Mark as Completed
            </button>
        `;

        activityList.appendChild(card);
    });

    updateProgress();
}

function markCompleted(id) {
    activities = activities.map(activity =>
        activity.id === id ? { ...activity, completed: true } : activity
    );

    localStorage.setItem("activities", JSON.stringify(activities));
    renderActivities();
}

function updateProgress() {
    const completedCount = activities.filter(a => a.completed).length;
    const total = activities.length;
    const percentage = (completedCount / total) * 100;

    progressText.textContent = `${completedCount} out of ${total} activities completed`;
    progressFill.style.width = percentage + "%";
}

renderActivities();
