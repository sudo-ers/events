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
					<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#444444" id="external-icon">
						<path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h560v-280h80v280q0 33-23.5 56.5T760-120H200Zm188-212-56-56 372-372H560v-80h280v280h-80v-144L388-332Z"/>
					</svg>
				</a>`;

// template for past event cards, this one has custom classname and don't have the register button
const past_events_template = `<div class="past event-card">
					<p class="past event-community" title='{{community-name}}'>{{community-name}}</p>
					<h1 class="past event-title">{{event-title}}</h1>
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
				</div>`;

let events = [];
async function run() {

	// fetch events.json directly from github repo of tamilnadu.tech
	const response = await fetch("https://raw.githubusercontent.com/FOSSUChennai/Communities/refs/heads/main/src/data/events.json");
	events = await response.json();

	console.log(events);
	const registered_events_response = await fetch(API_BASE+"/events");
	let registered_events = await registered_events_response.json();
	
	events.push(...registered_events);
	
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
		rendered = "<h1>No events known this month</h1>"; // fallback message
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
	if (upcoming.length === 0) {
		rendered = "<h1>No events known to be coming up</h1>";
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
		rendered = "<h1>Memory Corrupt! No history available</h1>";
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
