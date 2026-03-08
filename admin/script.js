import { API_BASE } from "../config.js";

// container elements where rendered data will be inserted
let pending_events_section = document.getElementById("pending-events");
let approved_events_section = document.getElementById("approved-events")

const pending_event_template = `<div class="event-card">
					<p class="event-community" title='{{community-name}}'>{{community-name}}</p>
					<a href='{{event-url}}'><h1 class="event-title">{{event-title}}</h1></a>
					<div class="event-info">
						<p class="event-location">
							{{event-location}}
						</p>
						<p class="event-date">
							<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3" id="date-icon">
								<path d="M580-240q-42 0-71-29t-29-71q0-42 29-71t71-29q42 0 71 29t29 71q0 42-29 71t-71 29ZM200-80q-33 0-56.5-23.5T120-160v-560q0-33 23.5-56.5T200-800h40v-80h80v80h320v-80h80v80h40q33 0 56.5 23.5T840-720v560q0 33-23.5 56.5T760-80H200Zm0-80h560v-400H200v400Zm0-480h560v-80H200v80Zm0 0v-80 80Z"/>
							</svg>
							{{event-date}}
						</p>
						<p class="event-time">
							<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3" id="time-icon">
								<path d="m612-292 56-56-148-148v-184h-80v216l172 172ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-400Zm0 320q133 0 226.5-93.5T800-480q0-133-93.5-226.5T480-800q-133 0-226.5 93.5T160-480q0 133 93.5 226.5T480-160Z"/>
							</svg>
							{{event-time}}
						</p>
					</div>
					<div id="location-info">
						<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3" id="location-icon">
							<path d="M480-480q33 0 56.5-23.5T560-560q0-33-23.5-56.5T480-640q-33 0-56.5 23.5T400-560q0 33 23.5 56.5T480-480Zm0 294q122-112 181-203.5T720-552q0-109-69.5-178.5T480-800q-101 0-170.5 69.5T240-552q0 71 59 162.5T480-186Zm0 106Q319-217 239.5-334.5T160-552q0-150 96.5-239T480-880q127 0 223.5 89T800-552q0 100-79.5 217.5T480-80Zm0-480Z"/>
						</svg>
						<p class="location" title='{{event-venue}}'>{{event-venue}}</p>
					</div>
					<div id="options-btn-group">
			      <button id="approve-btn" onclick="approveEvent({{event-id}})">
									<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#7bee5e"><path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z"/></svg>
									Approve</button>
					  <button id="delete-btn" onclick="deleteEvent({{event-id}})">
							<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e23838"><path d="m336-280-56-56 144-144-144-143 56-56 144 144 143-144 56 56-144 143 144 144-56 56-143-144-144 144Z"/></svg>
							    delete</button>
					</div>
					<a class="external-icon" href='{{event-url}}'><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#444444" >
						<path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h560v-280h80v280q0 33-23.5 56.5T760-120H200Zm188-212-56-56 372-372H560v-80h280v280h-80v-144L388-332Z"/>
					</svg></a>
				</div>`;

const approved_event_template = `<div class="event-card">
					<p class="event-community" title='{{community-name}}'>{{community-name}}</p>
					<a href='{{event-url}}'><h1 class="event-title">{{event-title}}</h1></a>
					<div class="event-info">
						<p class="event-location">
							{{event-location}}
						</p>
						<p class="event-date">
							<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3" id="date-icon">
								<path d="M580-240q-42 0-71-29t-29-71q0-42 29-71t71-29q42 0 71 29t29 71q0 42-29 71t-71 29ZM200-80q-33 0-56.5-23.5T120-160v-560q0-33 23.5-56.5T200-800h40v-80h80v80h320v-80h80v80h40q33 0 56.5 23.5T840-720v560q0 33-23.5 56.5T760-80H200Zm0-80h560v-400H200v400Zm0-480h560v-80H200v80Zm0 0v-80 80Z"/>
							</svg>
							{{event-date}}
						</p>
						<p class="event-time">
							<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3" id="time-icon">
								<path d="m612-292 56-56-148-148v-184h-80v216l172 172ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-400Zm0 320q133 0 226.5-93.5T800-480q0-133-93.5-226.5T480-800q-133 0-226.5 93.5T160-480q0 133 93.5 226.5T480-160Z"/>
							</svg>
							{{event-time}}
						</p>
					</div>
					<div id="location-info">
						<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3" id="location-icon">
							<path d="M480-480q33 0 56.5-23.5T560-560q0-33-23.5-56.5T480-640q-33 0-56.5 23.5T400-560q0 33 23.5 56.5T480-480Zm0 294q122-112 181-203.5T720-552q0-109-69.5-178.5T480-800q-101 0-170.5 69.5T240-552q0 71 59 162.5T480-186Zm0 106Q319-217 239.5-334.5T160-552q0-150 96.5-239T480-880q127 0 223.5 89T800-552q0 100-79.5 217.5T480-80Zm0-480Z"/>
						</svg>
						<p class="location" title='{{event-venue}}'>{{event-venue}}</p>
					</div>
					<div id="options-btn-group">
					  <button id="delete-btn" onclick="deleteEvent({{event-id}})">
							<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e23838"><path d="m336-280-56-56 144-144-144-143 56-56 144 144 143-144 56 56-144 143 144 144-56 56-143-144-144 144Z"/></svg>
							delete</button>
					</div>
					<a class="external-icon" href='{{event-url}}'><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#444444">
						<path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h560v-280h80v280q0 33-23.5 56.5T760-120H200Zm188-212-56-56 372-372H560v-80h280v280h-80v-144L388-332Z"/>
					</svg></a>
				</div>`;

const token = sessionStorage.getItem("admin_token");

if (!token) {
    window.location.href = "../login/";
}

// Logout
document.getElementById("logoutBtn").addEventListener("click", function () {
    sessionStorage.removeItem("admin_token");
    window.location.href = "../login/";
});

async function loadEvents() {
  const messageDiv = document.getElementById("message");
  messageDiv.textContent = "";
  messageDiv.style.display = "none";

    try {
        const response = await fetch(API_BASE + "/admin/events", {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + token,
            },
        });

        if (response.status === 401) {
            messageDiv.textContent = "Session expired. Please login again.";
            messageDiv.style.display = "block";
            sessionStorage.removeItem("admin_token");
            setTimeout(function () {
                window.location.href = "../login/";
            }, 2000);
            return;
        }

        const events = await response.json();
        // const events = [
        //   {
        //     id:1,
        //     eventName:"hello",
        //     eventDescription:"desc",
        //     eventDate:"2026-05-03",
        //     eventTime:"09:00am",
        //     eventVenue:";laskdfjlsakd askdjfsjd ksjdhfksjdh fkjsdhfkjhsfd adasds asd ",
        //     communityName:"sudoers",
        //     eventLink:"http://localhos:8080/",
        //     location:"Chennai",
        //     email:"alksdjlasjd@laksjdlkas.com",
        //     approved:true,
        //     created_at:"2026-01-03T09:00IST"
        //   },
        //   {
        //     id:2,
        //     eventName:"hello",
        //     eventDescription:"desc",
        //     eventDate:"2026-05-03",
        //     eventTime:"09:00am",
        //     eventLink:"http://localhost:8080/",
        //     eventVenue:"Chennai",
        //     communityName:"sudoers",
        //     location:"Vellore",
        //     email:"alksdjlasjd@laksjdlkas.com",
        //     approved:false,
        //     created_at:"2026-01-03T09:00IST"
        //   },
        // ]
        if (!response.ok) {
            messageDiv.textContent = "Error: " + (data.detail || "Failed to load events");
            messageDiv.style.display = "block";
            return;
        }

        // render(events);
       	let rendered = "";
       	if (events.length === 0) {
            rendered = "<h1>No events known.</h1>"; // fallback message
            return;
        } else {
            let pending_events = [];
            let approved_events = [];
            events.map((event) => {
              if (event.approved) {
                approved_events.push(event);
              } else {
                pending_events.push(event);
              }
            })
          pending_events.map(({ id, communityName, eventName, location, eventVenue, eventDate, eventTime, eventLink }) => {
           	rendered += pending_event_template
      								  .replaceAll("{{event-id}}", id)
        								.replaceAll("{{community-name}}", communityName) // replace fields of template string with data
        								.replace("{{event-title}}", eventName)
        								.replace("{{event-location}}",location)
        								.replace("{{event-date}}", eventDate.split("-").reverse().join("-"))
        								.replace("{{event-time}}", eventTime)
        								.replaceAll("{{event-venue}}", eventVenue)   // replaceAll for replacing the string within the title attr.
        								.replace("{{event-url}}", eventLink);
          });
       	// renders this month events
       	pending_events_section.innerHTML = rendered;

        rendered = ""
        approved_events.map(({ id, communityName, eventName, location, eventVenue, eventDate, eventTime, eventLink }) => {
         	rendered += approved_event_template
  								    .replaceAll("{{event-id}}", id)
      								.replaceAll("{{community-name}}", communityName) // replace fields of template string with data
      								.replace("{{event-title}}", eventName)
      								.replace("{{event-location}}",location)
      								.replace("{{event-date}}", eventDate.split("-").reverse().join("-"))
      								.replace("{{event-time}}", eventTime)
      								.replaceAll("{{event-venue}}", eventVenue)   // replaceAll for replacing the string within the title attr.
      								.replace("{{event-url}}", eventLink);
        });
     	// renders this month events
     	approved_events_section.innerHTML = rendered;
     	}
    } catch (err) {
        messageDiv.style.display = "block";
        messageDiv.textContent = "Network error: " + err.message;
    }
}

async function approveEvent(eventId) {
    const messageDiv = document.getElementById("message");
    messageDiv.textContent = "";
    //     messageDiv.style.display = "none";

    try {
        const response = await fetch(API_BASE + "/admin/approve", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token,
            },
            body: JSON.stringify({ id: eventId }),
        });

        const data = await response.json();

        if (!response.ok) {
            messageDiv.textContent = "Error: " + (data.detail || "Approve failed");
            messageDiv.style.display = "block";
            return;
        }

        messageDiv.style.display = "block";
        messageDiv.textContent = data.message;
        loadEvents();

    } catch (err) {
        messageDiv.style.display = "block";
        messageDiv.textContent = "Network error: " + err.message;
    }
}

async function deleteEvent(eventId, eventName) {
    if (!confirm("Are you sure you want to delete event: " + eventName + "?")) {
        return;
    }

    const messageDiv = document.getElementById("message");
    messageDiv.textContent = "";
    messageDiv.style.display = "none";

    try {
        const response = await fetch(API_BASE + "/admin/delete", {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token,
            },
            body: JSON.stringify({ id: eventId }),
        });

        const data = await response.json();

        if (!response.ok) {
            messageDiv.style.display = "block";
            messageDiv.textContent = "Error: " + (data.detail || "Delete failed");
            return;
        }

        messageDiv.style.display = "block";
        messageDiv.textContent = data.message;
        loadEvents();

    } catch (err) {
        messageDiv.style.display = "block";
        messageDiv.textContent = "Network error: " + err.message;
    }
}

loadEvents().then();