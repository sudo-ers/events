import { API_BASE } from "../config.js";

// container elements where rendered data will be inserted
let past_events_section = document.getElementById("past-events");

// template string
// used for rendering cards in a react component style
// ( it will be used replace the placeholders {{...}} with actual data)
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

async function run() {

	const past_events_response = await fetch("https://raw.githubusercontent.com/FOSSUChennai/Communities/refs/heads/main/src/data/pastevents.json");
	// this fetches past events from a different json
	const events_response = await fetch("https://raw.githubusercontent.com/FOSSUChennai/Communities/refs/heads/main/src/data/events.json");
	let events = await past_events_response.json();
	let allevents = await events_response.json()
	
	events.push(...allevents);
	
	// const registered_events_response = await fetch(API_BASE+"/events");
	// let registered_events = await registered_events_response.json();
	
	// events.push(...registered_events);
	

	let past_events = [];
	events.forEach((event) => {
		let eventDate = new Date(event.eventDate);
		let today = new Date();
		if ( eventDate.getMonth() === today.getMonth() && eventDate.getDate() >= today.getDate() && eventDate.getFullYear() === today.getFullYear() ) {
			console.log(event);
		} else if ( (eventDate.getMonth() > today.getMonth() && eventDate.getFullYear() === today.getFullYear()) || eventDate.getFullYear() > today.getFullYear() ) {
			console.log(event);
		} else {
			past_events.push(event);
		}
	});

	console.log(past_events)

	past_events = past_events.sort((a, b) => {
		const A = new Date(`${a.eventDate}`);
		const B = new Date(`${b.eventDate}`);
		return B - A;
	});

	let rendered = "";
	if (past_events.length === 0) {
		rendered = "<h1>Memory Corrupt! No history available</h1>";
	} else {
		past_events.map(({ communityName, eventName, location, eventVenue, eventDate, eventTime }) => {
			rendered += past_events_template
											.replaceAll("{{community-name}}", communityName)
											.replace("{{event-title}}", eventName)
											.replace("{{event-date}}", eventDate.split("-").reverse().join("-"))
											.replace("{{event-time}}", eventTime)
											.replaceAll("{{event-location}}", location)
											.replaceAll("{{event-venue}}", eventVenue);
											// no event-url here
		});
	}
	// renders past events
	past_events_section.innerHTML = rendered;
}

run().then(); // initiate fetching and rendering
