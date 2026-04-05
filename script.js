import { API_BASE } from "./config.js";

// container elements where rendered data will be inserted
let this_month_events_section = document.getElementById("this-month-events");
let upcoming_events_section = document.getElementById("upcoming-events");
let past_events_section = document.getElementById("past-events");

// functionality for context menu
let selected_card = null;
let context_menu = document.getElementById("contextmenu");
let save_btn = document.getElementById("save-as-image");
let copy_btn = document.getElementById("copy-url");
let open_in_newtab = document.getElementById("open-in-new-tab");

// show context menu
document.addEventListener("contextmenu", function (e) {
	const card = e.target.closest(".event-card");
	if (!card) return;

	e.preventDefault();
	selected_card = card;

	// enable/disable button based on if URL is available or not
	if (selected_card?.href) {
		open_in_newtab.classList.remove("disabled");
		copy_btn.classList.remove("disabled");
	} else {
		open_in_newtab.classList.add("disabled");
		copy_btn.classList.add("disabled");
	}

	// sets contextmenu visibility and position
	context_menu.style.display = "flex";
	context_menu.style.left = e.pageX + "px";
	context_menu.style.top = e.pageY + "px";
});

// hide menu on click
document.addEventListener("click", function () {
	context_menu.style.display = "none";
});

// save the event card as image
// dont have any critical purpose, 
// i just thought it would be cool to add this feature
save_btn.onclick = function () {
	if (!selected_card) return;

	// this function will convert a html element into a canvas
	// then we create a <a> tag with that to download it as image
	// then click the link programmatically
	html2canvas(selected_card).then(canvas => {
		const link = document.createElement("a");
		link.download = "event-card.png";
		link.href = canvas.toDataURL();
		link.click();
	});
};

// this will copy the url of the event to clipboard
copy_btn.onclick = function () {
	if (!selected_card) return;
	const url = selected_card?.href;

	navigator.clipboard.writeText(url)
};

// this will open the link in new tab
open_in_newtab.onclick = function () {
	if (!selected_card) return;
	const url = selected_card?.href;

	window.open(url, "_blank");
}

// template string
// used for rendering cards in a react component style
// ( it will be used replace the placeholders {{...}} with actual data)
const template = `<a href='{{event-url}}' class="event-card">
					<p class="event-community" title='{{community-name}}'>{{community-name}}</p>
					<h1 class="event-title">{{event-title}}</h1>
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

				</a>`;

// template for past event cards, this one has custom classname and don't have the register button
const past_events_template = `<div class="past event-card">
					<p class="past event-community" title='{{community-name}}'>{{community-name}}</p>
					<h1 class="past event-title">{{event-title}}</h1>
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
				</div>`;

let events = [];
async function run() {

	// fetch events.json directly from github repo of tamilnadu.tech
	const response = await fetch("https://raw.githubusercontent.com/FOSSUChennai/Communities/refs/heads/main/src/data/events.json");
	events = await response.json();

	// console.log(events);
	// const registered_events_response = await fetch(API_BASE+"/events");
	// let registered_events = await registered_events_response.json();
	
	// events.push(...registered_events);
	
	// this fetches past events from a different json
	const past_events_response = await fetch("https://raw.githubusercontent.com/FOSSUChennai/Communities/refs/heads/main/src/data/pastevents.json");
	let past_events = await past_events_response.json();

	let this_month = [];
	let upcoming = [];

	// group each event object by date
	events.forEach((event) => {
		let eventDate = new Date(event.eventDate);
		let today = new Date();
		if ( eventDate.getMonth() === today.getMonth() && eventDate.getDate() >= today.getDate() && eventDate.getFullYear() === today.getFullYear() ) {
			this_month.push(event);
		} else if ( (eventDate.getMonth() > today.getMonth() && eventDate.getFullYear() === today.getFullYear()) || eventDate.getFullYear() > today.getFullYear() ) {
			upcoming.push(event);
		} else {
			past_events.push(event);
		}
	});

	/* sorts and renders events for this month section */
	this_month = this_month.sort((a, b) => {
		const A = new Date(`${a.eventDate}`);
		const B = new Date(`${b.eventDate}`);
		return A - B;
	});

	let rendered = "";
	if (this_month.length === 0) {
		rendered = `
			<div class="no-events">
			<div class="no-events-inner">
			<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="#696969" viewBox="0 0 256 256">
				<path d="M208,32H184V24a8,8,0,0,0-16,0v8H88V24a8,8,0,0,0-16,0v8H48A16,16,0,0,0,32,48V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V48A16,16,0,0,0,208,32ZM72,48v8a8,8,0,0,0,16,0V48h80v8a8,8,0,0,0,16,0V48h24V80H48V48ZM208,208H48V96H208V208Zm-50.34-74.34L139.31,152l18.35,18.34a8,8,0,0,1-11.32,11.32L128,163.31l-18.34,18.35a8,8,0,0,1-11.32-11.32L116.69,152,98.34,133.66a8,8,0,0,1,11.32-11.32L128,140.69l18.34-18.35a8,8,0,0,1,11.32,11.32Z"></path>
			</svg>
					<h1>No Events Known</h1>
					</div>
					<button>Register a New Event</button>
			</div>
		`; // fallback message
	} else {
		this_month.map(({ communityName, eventName, location, eventVenue, eventDate, eventTime, eventLink }) => {
			rendered += template
								.replaceAll("{{community-name}}", communityName) // replace fields of template string with data
								.replace("{{event-title}}", eventName)
								.replace("{{event-location}}",location)
								.replace("{{event-date}}", eventDate.split("-").reverse().join("-"))
								.replace("{{event-time}}", eventTime)
								.replaceAll("{{event-venue}}", eventVenue)   // replaceAll for replacing the string within the title attr.
								.replace("{{event-url}}", eventLink);
		});
	}
	// renders this month events
	this_month_events_section.innerHTML = rendered;

	/* doing the same for upcoming sections */
	upcoming = upcoming.sort((a, b) => {
		const A = new Date(`${a.eventDate}`);
		const B = new Date(`${b.eventDate}`);
		return A - B;
	});

	rendered = "";
	if (this_month.length === 0 && upcoming.length === 0) {
		rendered = `
			<div class="no-events">
			<div class="no-events-inner">
			<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="var(--background-600)" viewBox="0 0 256 256">
				<path d="M208,32H184V24a8,8,0,0,0-16,0v8H88V24a8,8,0,0,0-16,0v8H48A16,16,0,0,0,32,48V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V48A16,16,0,0,0,208,32ZM72,48v8a8,8,0,0,0,16,0V48h80v8a8,8,0,0,0,16,0V48h24V80H48V48ZM208,208H48V96H208V208Zm-50.34-74.34L139.31,152l18.35,18.34a8,8,0,0,1-11.32,11.32L128,163.31l-18.34,18.35a8,8,0,0,1-11.32-11.32L116.69,152,98.34,133.66a8,8,0,0,1,11.32-11.32L128,140.69l18.34-18.35a8,8,0,0,1,11.32,11.32Z"></path>
			</svg>
					<h1>No Upcoming Events</h1>
					</div>
			</div>
		`; // fallback message
	}
	if (upcoming.length === 0) {
		rendered = `
			<div class="no-events">
			<div class="no-events-inner">
			<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="var(--background-600)" viewBox="0 0 256 256">
				<path d="M208,32H184V24a8,8,0,0,0-16,0v8H88V24a8,8,0,0,0-16,0v8H48A16,16,0,0,0,32,48V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V48A16,16,0,0,0,208,32ZM72,48v8a8,8,0,0,0,16,0V48h80v8a8,8,0,0,0,16,0V48h24V80H48V48ZM208,208H48V96H208V208Zm-50.34-74.34L139.31,152l18.35,18.34a8,8,0,0,1-11.32,11.32L128,163.31l-18.34,18.35a8,8,0,0,1-11.32-11.32L116.69,152,98.34,133.66a8,8,0,0,1,11.32-11.32L128,140.69l18.34-18.35a8,8,0,0,1,11.32,11.32Z"></path>
			</svg>
					<h1>No Upcoming Events</h1>
					</div>
					<button>Register a New Event</button>
			</div>
		`; // fallback message
	} else {
		upcoming.map(({ communityName, eventName, location, eventVenue, eventDate, eventTime, eventLink}) => {
			rendered += template
								.replaceAll("{{community-name}}", communityName)
								.replace("{{event-title}}", eventName)
								.replace("{{event-location}}",location)
								.replace("{{event-date}}", eventDate.split("-").reverse().join("-"))
								.replace("{{event-time}}", eventTime)
								.replaceAll("{{event-venue}}", eventVenue)
								.replace("{{event-url}}", eventLink);
		});
	}
	// renders upcoming events
	upcoming_events_section.innerHTML = rendered;

	past_events = past_events.slice(-6).sort((a, b) => {
		const A = new Date(`${a.eventDate}`);
		const B = new Date(`${b.eventDate}`);
		return B - A;
	});

	rendered = "";
	if (past_events.length === 0) {
		rendered = `
			<div class="no-events">
			<div class="no-events-inner">
			<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="var(--background-600)" viewBox="0 0 256 256">
				<path d="M208,32H184V24a8,8,0,0,0-16,0v8H88V24a8,8,0,0,0-16,0v8H48A16,16,0,0,0,32,48V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V48A16,16,0,0,0,208,32ZM72,48v8a8,8,0,0,0,16,0V48h80v8a8,8,0,0,0,16,0V48h24V80H48V48ZM208,208H48V96H208V208Zm-50.34-74.34L139.31,152l18.35,18.34a8,8,0,0,1-11.32,11.32L128,163.31l-18.34,18.35a8,8,0,0,1-11.32-11.32L116.69,152,98.34,133.66a8,8,0,0,1,11.32-11.32L128,140.69l18.34-18.35a8,8,0,0,1,11.32,11.32Z"></path>
			</svg>
					<h1>No Past Events</h1>
					</div>
			</div>
		`;
	} else {
		past_events.map(({ communityName, eventName, location, eventVenue, eventDate, eventTime}) => {
			rendered += past_events_template
											.replaceAll("{{community-name}}", communityName)
											.replace("{{event-title}}", eventName)
											.replace("{{event-location}}",location)
											.replace("{{event-date}}", eventDate.split("-").reverse().join("-"))
											.replace("{{event-time}}", eventTime)
											.replaceAll("{{event-venue}}", eventVenue);
											// no event-url here
		});
	}
	// renders past events
	past_events_section.innerHTML = rendered;
}

run().then(); // initiate fetching and rendering
