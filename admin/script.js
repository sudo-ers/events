import { API_BASE } from "../config.js";

// container elements where rendered data will be inserted
let pending_events_section = document.getElementById("pending-events");
let approved_events_section = document.getElementById("approved-events");

const pending_event_template = `<div class="event-card">
					<p class="event-community" title='{{community-name}}'>{{community-name}}</p>
					<a href='{{event-url}}'><h1 class="event-title">{{event-title}}</h1></a>
					<div class="event-location">
					<div class="triangle"></div>
						<p>{{event-location}}</p>
					</div>
					<div class="event-info">
						<p class="event-date">
							<svg xmlns="http://www.w3.org/2000/svg" class="date-icon" width="24" height="24" fill="var(--text)" viewBox="0 0 256 256">
								<path d="M208,32H184V24a8,8,0,0,0-16,0v8H88V24a8,8,0,0,0-16,0v8H48A16,16,0,0,0,32,48V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V48A16,16,0,0,0,208,32ZM72,48v8a8,8,0,0,0,16,0V48h80v8a8,8,0,0,0,16,0V48h24V80H48V48ZM208,208H48V96H208V208Zm-68-76a12,12,0,1,1-12-12A12,12,0,0,1,140,132Zm44,0a12,12,0,1,1-12-12A12,12,0,0,1,184,132ZM96,172a12,12,0,1,1-12-12A12,12,0,0,1,96,172Zm44,0a12,12,0,1,1-12-12A12,12,0,0,1,140,172Zm44,0a12,12,0,1,1-12-12A12,12,0,0,1,184,172Z"></path>
							</svg>
							{{event-date}}
						</p>						
						<p class="event-time">
							<svg xmlns="http://www.w3.org/2000/svg" class="time-icon" width="24" height="24" fill="var(--text)" viewBox="0 0 256 256">
								<path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Zm64-88a8,8,0,0,1-8,8H128a8,8,0,0,1-8-8V72a8,8,0,0,1,16,0v48h48A8,8,0,0,1,192,128Z"></path>
							</svg>
							{{event-time}}
						</p>						
					</div>
					<div class="location-info">
						<svg xmlns="http://www.w3.org/2000/svg" class="location-icon" width="24" height="24" fill="var(--text)" viewBox="0 0 256 256">
							<path d="M128,64a40,40,0,1,0,40,40A40,40,0,0,0,128,64Zm0,64a24,24,0,1,1,24-24A24,24,0,0,1,128,128Zm0-112a88.1,88.1,0,0,0-88,88c0,31.4,14.51,64.68,42,96.25a254.19,254.19,0,0,0,41.45,38.3,8,8,0,0,0,9.18,0A254.19,254.19,0,0,0,174,200.25c27.45-31.57,42-64.85,42-96.25A88.1,88.1,0,0,0,128,16Zm0,206c-16.53-13-72-60.75-72-118a72,72,0,0,1,144,0C200,161.23,144.53,209,128,222Z"></path>
						</svg>
						<p class="location" title='{{event-venue}}'>{{event-venue}}</p>
					</div>
					<div class="options-btn-group">
			      <button class="approve-btn" key={{event-id}}>
									<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="var(--primary)" viewBox="0 0 256 256"><path d="M229.66,77.66l-128,128a8,8,0,0,1-11.32,0l-56-56a8,8,0,0,1,11.32-11.32L96,188.69,218.34,66.34a8,8,0,0,1,11.32,11.32Z"></path></svg>
									Approve</button>
					  <button class="delete-btn" key={{event-id}} eventname='{{event-title}}'>
							<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="var(--error)" viewBox="0 0 256 256"><path d="M205.66,194.34a8,8,0,0,1-11.32,11.32L128,139.31,61.66,205.66a8,8,0,0,1-11.32-11.32L116.69,128,50.34,61.66A8,8,0,0,1,61.66,50.34L128,116.69l66.34-66.35a8,8,0,0,1,11.32,11.32L139.31,128Z"></path></svg>    
							Delete</button>
							<div class="seperator"></div>
					</div>
				</div>`;

const approved_event_template = `<div class="event-card">
					<p class="event-community" title='{{community-name}}'>{{community-name}}</p>
					<a href='{{event-url}}'><h1 class="event-title">{{event-title}}</h1></a>
					<div class="event-location">
					<div class="triangle"></div>
						<p>{{event-location}}</p>
					</div>
					<div class="event-info">
						<p class="event-date">
							<svg xmlns="http://www.w3.org/2000/svg" class="date-icon" width="24" height="24" fill="var(--text)" viewBox="0 0 256 256">
								<path d="M208,32H184V24a8,8,0,0,0-16,0v8H88V24a8,8,0,0,0-16,0v8H48A16,16,0,0,0,32,48V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V48A16,16,0,0,0,208,32ZM72,48v8a8,8,0,0,0,16,0V48h80v8a8,8,0,0,0,16,0V48h24V80H48V48ZM208,208H48V96H208V208Zm-68-76a12,12,0,1,1-12-12A12,12,0,0,1,140,132Zm44,0a12,12,0,1,1-12-12A12,12,0,0,1,184,132ZM96,172a12,12,0,1,1-12-12A12,12,0,0,1,96,172Zm44,0a12,12,0,1,1-12-12A12,12,0,0,1,140,172Zm44,0a12,12,0,1,1-12-12A12,12,0,0,1,184,172Z"></path>
							</svg>
							{{event-date}}
						</p>						
						<p class="event-time">
							<svg xmlns="http://www.w3.org/2000/svg" class="time-icon" width="24" height="24" fill="var(--text)" viewBox="0 0 256 256">
								<path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Zm64-88a8,8,0,0,1-8,8H128a8,8,0,0,1-8-8V72a8,8,0,0,1,16,0v48h48A8,8,0,0,1,192,128Z"></path>
							</svg>
							{{event-time}}
						</p>						
					</div>
					<div class="location-info">
						<svg xmlns="http://www.w3.org/2000/svg" class="location-icon" width="24" height="24" fill="var(--text)" viewBox="0 0 256 256">
							<path d="M128,64a40,40,0,1,0,40,40A40,40,0,0,0,128,64Zm0,64a24,24,0,1,1,24-24A24,24,0,0,1,128,128Zm0-112a88.1,88.1,0,0,0-88,88c0,31.4,14.51,64.68,42,96.25a254.19,254.19,0,0,0,41.45,38.3,8,8,0,0,0,9.18,0A254.19,254.19,0,0,0,174,200.25c27.45-31.57,42-64.85,42-96.25A88.1,88.1,0,0,0,128,16Zm0,206c-16.53-13-72-60.75-72-118a72,72,0,0,1,144,0C200,161.23,144.53,209,128,222Z"></path>
						</svg>
						<p class="location" title='{{event-venue}}'>{{event-venue}}</p>
					</div>
					<div class="options-btn-group">
					  <button class="delete-btn" key={{event-id}} eventname='{{event-title}}'>
							<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="var(--error)" viewBox="0 0 256 256"><path d="M205.66,194.34a8,8,0,0,1-11.32,11.32L128,139.31,61.66,205.66a8,8,0,0,1-11.32-11.32L116.69,128,50.34,61.66A8,8,0,0,1,61.66,50.34L128,116.69l66.34-66.35a8,8,0,0,1,11.32,11.32L139.31,128Z"></path></svg>    
							Delete</button>
					</div>
				</div>`;

const token = sessionStorage.getItem("admin_token");

if (!token) {
	// window.location.href = "../login/";
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
				Authorization: "Bearer " + token,
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
			messageDiv.textContent =
				"Error: " + (data.detail || "Failed to load events");
			messageDiv.style.display = "block";
			return;
		}

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
			});
			pending_events.map(
				({
					id,
					communityName,
					eventName,
					location,
					eventVenue,
					eventDate,
					eventTime,
					eventLink,
				}) => {
					rendered += pending_event_template
						.replaceAll("{{event-id}}", id)
						.replaceAll("{{community-name}}", communityName) // replace fields of template string with data
						.replaceAll("{{event-title}}", eventName)
						.replace("{{event-location}}", location)
						.replace("{{event-date}}", eventDate.split("-").reverse().join("-"))
						.replace("{{event-time}}", eventTime)
						.replaceAll("{{event-venue}}", eventVenue) // replaceAll for replacing the string within the title attr.
						.replace("{{event-url}}", eventLink);
				},
			);
			// renders this month events
			pending_events_section.innerHTML = rendered;

			rendered = "";
			approved_events.map(
				({
					id,
					communityName,
					eventName,
					location,
					eventVenue,
					eventDate,
					eventTime,
					eventLink,
				}) => {
					rendered += approved_event_template
						.replaceAll("{{event-id}}", id)
						.replaceAll("{{community-name}}", communityName) // replace fields of template string with data
						.replaceAll("{{event-title}}", eventName)
						.replace("{{event-location}}", location)
						.replace("{{event-date}}", eventDate.split("-").reverse().join("-"))
						.replace("{{event-time}}", eventTime)
						.replaceAll("{{event-venue}}", eventVenue) // replaceAll for replacing the string within the title attr.
						.replace("{{event-url}}", eventLink);
				},
			);

			approved_events_section.innerHTML = rendered;
			
			// add approve button functionalities
			let approve_btns = document.getElementsByClassName("approve-btn");
			for (let i = 0; i < approve_btns.length; i++) {
				let approve_btn = approve_btns.item(i);
				approve_btn.addEventListener("click", (e) => {
					e.preventDefault();
					approveEvent(approve_btn.getAttribute("key"));
				});
			}
			
			// add delete button functionalities
			let delete_btns = document.getElementsByClassName("delete-btn");
			for (let i = 0; i < delete_btns.length; i++) {
				let delete_btn = delete_btns.item(i);
				delete_btn.addEventListener("click", (e) => {
					e.preventDefault();
					deleteEvent(delete_btn.getAttribute("key"),delete_btn.getAttribute("eventname"));
				});
			}
		}
	} catch (err) {
		messageDiv.style.display = "block";
		messageDiv.textContent = "Network error: " + err.message;
	}
}

async function approveEvent(eventId) {
	const messageDiv = document.getElementById("message");
	messageDiv.textContent = "";
	messageDiv.style.display = "none";
	console.log(eventId);
	try {
		const response = await fetch(API_BASE + "/admin/approve", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: "Bearer " + token,
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
	if (!confirm("Are you sure you want to delete event: " + eventName + " ?")) {
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
				Authorization: "Bearer " + token,
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
