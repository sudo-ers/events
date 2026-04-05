let communities_section = document.getElementById("communities-container");

// template for each community card
const template = `
				<div class="community-card">
					<div class="event-location">
						<div class="triangle"></div>
						<p>{{location}}</p>
					</div>
					<div class="community-logo">
						{{logo}}
					</div>
					<a href="{{website}}"><h1 class="community-name">{{community-name}}</h1></a>
					<div class="links-container">
						{{links-container}}
					</div>
				</div>`;

// template for each links in the card
const link_template = `
						<a class="link-box" href="{{link-url}}" title="{{website}}">
							{{icon}}
						</a>`


let social_media_icons = {
	blusky : `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="var(--background-600)" viewBox="0 0 256 256">
				<path d="M232.7,50.48C229,45.7,221.84,40,209,40c-16.85,0-38.46,11.28-57.81,30.16A140.07,140.07,0,0,0,136,87.53V56a8,8,0,0,0-16,0V87.53a140.07,140.07,0,0,0-15.15-17.37C85.49,51.28,63.88,40,47,40,34.16,40,27,45.7,23.3,50.48c-6.82,8.77-12.18,24.08-.21,71.2,6.05,23.83,19.51,33,30.63,36.42A44,44,0,0,0,128,205.27a44,44,0,0,0,74.28-47.17c11.12-3.4,24.57-12.59,30.63-36.42C239.63,95.24,244.85,66.1,232.7,50.48ZM92,208A28.12,28.12,0,0,1,88.86,152a8,8,0,1,0-1.76-15.9A43.64,43.64,0,0,0,66.36,144c-8.43.09-22-3.57-27.76-26.26C35.72,106.39,27,71.86,35.94,60.3,37.37,58.46,40.09,56,47,56c27.27,0,73,44.88,73,71.67V180A28,28,0,0,1,92,208ZM217.4,117.74c-5.77,22.69-19.33,26.34-27.77,26.26a43.6,43.6,0,0,0-20.74-7.95,8,8,0,1,0-1.76,15.9A28.11,28.11,0,1,1,136,180V127.67C136,100.88,181.69,56,209,56c6.95,0,9.66,2.46,11.1,4.3C229.05,71.86,220.28,106.39,217.4,117.74Z"></path>
			</svg>`,

	discord : `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="var(--background-600)" viewBox="0 0 256 256">
				<path d="M104,140a12,12,0,1,1-12-12A12,12,0,0,1,104,140Zm60-12a12,12,0,1,0,12,12A12,12,0,0,0,164,128Zm74.45,64.9-67,29.71a16.17,16.17,0,0,1-21.71-9.1l-8.11-22q-6.72.45-13.63.46t-13.63-.46l-8.11,22a16.18,16.18,0,0,1-21.71,9.1l-67-29.71a15.93,15.93,0,0,1-9.06-18.51L38,58A16.07,16.07,0,0,1,51,46.14l36.06-5.93a16.22,16.22,0,0,1,18.26,11.88l3.26,12.84Q118.11,64,128,64t19.4.93l3.26-12.84a16.21,16.21,0,0,1,18.26-11.88L205,46.14A16.07,16.07,0,0,1,218,58l29.53,116.38A15.93,15.93,0,0,1,238.45,192.9ZM232,178.28,202.47,62s0,0-.08,0L166.33,56a.17.17,0,0,0-.17,0l-2.83,11.14c5,.94,10,2.06,14.83,3.42A8,8,0,0,1,176,86.31a8.09,8.09,0,0,1-2.16-.3A172.25,172.25,0,0,0,128,80a172.25,172.25,0,0,0-45.84,6,8,8,0,1,1-4.32-15.4c4.82-1.36,9.78-2.48,14.82-3.42L89.83,56s0,0-.12,0h0L53.61,61.93a.17.17,0,0,0-.09,0L24,178.33,91,208a.23.23,0,0,0,.22,0L98,189.72a173.2,173.2,0,0,1-20.14-4.32A8,8,0,0,1,82.16,170,171.85,171.85,0,0,0,128,176a171.85,171.85,0,0,0,45.84-6,8,8,0,0,1,4.32,15.41A173.2,173.2,0,0,1,158,189.72L164.75,208a.22.22,0,0,0,.21,0Z"></path>
			</svg>`,

	github : `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="var(--background-600)" viewBox="0 0 256 256">
				<path d="M208.31,75.68A59.78,59.78,0,0,0,202.93,28,8,8,0,0,0,196,24a59.75,59.75,0,0,0-48,24H124A59.75,59.75,0,0,0,76,24a8,8,0,0,0-6.93,4,59.78,59.78,0,0,0-5.38,47.68A58.14,58.14,0,0,0,56,104v8a56.06,56.06,0,0,0,48.44,55.47A39.8,39.8,0,0,0,96,192v8H72a24,24,0,0,1-24-24A40,40,0,0,0,8,136a8,8,0,0,0,0,16,24,24,0,0,1,24,24,40,40,0,0,0,40,40H96v16a8,8,0,0,0,16,0V192a24,24,0,0,1,48,0v40a8,8,0,0,0,16,0V192a39.8,39.8,0,0,0-8.44-24.53A56.06,56.06,0,0,0,216,112v-8A58.14,58.14,0,0,0,208.31,75.68ZM200,112a40,40,0,0,1-40,40H112a40,40,0,0,1-40-40v-8a41.74,41.74,0,0,1,6.9-22.48A8,8,0,0,0,80,73.83a43.81,43.81,0,0,1,.79-33.58,43.88,43.88,0,0,1,32.32,20.06A8,8,0,0,0,119.82,64h32.35a8,8,0,0,0,6.74-3.69,43.87,43.87,0,0,1,32.32-20.06A43.81,43.81,0,0,1,192,73.83a8.09,8.09,0,0,0,1,7.65A41.72,41.72,0,0,1,200,104Z"></path>
			</svg>`,

	instagram : `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="var(--background-600)" viewBox="0 0 256 256">
				<path d="M128,80a48,48,0,1,0,48,48A48.05,48.05,0,0,0,128,80Zm0,80a32,32,0,1,1,32-32A32,32,0,0,1,128,160ZM176,24H80A56.06,56.06,0,0,0,24,80v96a56.06,56.06,0,0,0,56,56h96a56.06,56.06,0,0,0,56-56V80A56.06,56.06,0,0,0,176,24Zm40,152a40,40,0,0,1-40,40H80a40,40,0,0,1-40-40V80A40,40,0,0,1,80,40h96a40,40,0,0,1,40,40ZM192,76a12,12,0,1,1-12-12A12,12,0,0,1,192,76Z"></path>
			</svg>`,

	linkedin : `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="var(--background-600)" viewBox="0 0 256 256">
				<path d="M216,24H40A16,16,0,0,0,24,40V216a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V40A16,16,0,0,0,216,24Zm0,192H40V40H216V216ZM96,112v64a8,8,0,0,1-16,0V112a8,8,0,0,1,16,0Zm88,28v36a8,8,0,0,1-16,0V140a20,20,0,0,0-40,0v36a8,8,0,0,1-16,0V112a8,8,0,0,1,15.79-1.78A36,36,0,0,1,184,140ZM100,84A12,12,0,1,1,88,72,12,12,0,0,1,100,84Z"></path>
			</svg>`,

	mastadon : `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="var(--background-600)" viewBox="0 0 256 256">
				<path d="M184,32H72A40,40,0,0,0,32,72V192a40,40,0,0,0,40,40h88a8,8,0,0,0,0-16H72a24,24,0,0,1-24-24v-8H184a40,40,0,0,0,40-40V72A40,40,0,0,0,184,32Zm24,112a24,24,0,0,1-24,24H48V72A24,24,0,0,1,72,48H184a24,24,0,0,1,24,24Zm-24-40v32a8,8,0,0,1-16,0V104a16,16,0,0,0-32,0v32a8,8,0,0,1-16,0V104a16,16,0,0,0-32,0v32a8,8,0,0,1-16,0V104a32,32,0,0,1,56-21.13A32,32,0,0,1,184,104Z"></path>
			</svg>`,

	reddit : `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="var(--background-600)" viewBox="0 0 256 256">
				<path d="M248,104a32,32,0,0,0-52.94-24.19c-16.75-8.9-36.76-14.28-57.66-15.53l5.19-31.17,17.72,2.72a24,24,0,1,0,2.87-15.74l-26-4a8,8,0,0,0-9.11,6.59L121.2,64.16c-21.84.94-42.82,6.38-60.26,15.65a32,32,0,0,0-42.59,47.74A59,59,0,0,0,16,144c0,21.93,12,42.35,33.91,57.49C70.88,216,98.61,224,128,224s57.12-8,78.09-22.51C228,186.35,240,165.93,240,144a59,59,0,0,0-2.35-16.45A32.16,32.16,0,0,0,248,104ZM184,24a8,8,0,1,1-8,8A8,8,0,0,1,184,24Zm40.13,93.78a8,8,0,0,0-3.29,10A43.58,43.58,0,0,1,224,144c0,16.53-9.59,32.27-27,44.33C178.67,201,154.17,208,128,208s-50.67-7-69-19.67C41.59,176.27,32,160.53,32,144a43.75,43.75,0,0,1,3.14-16.17,8,8,0,0,0-3.27-10A16,16,0,1,1,52.94,94.59a8,8,0,0,0,10.45,2.23l.36-.22C81.45,85.9,104.25,80,128,80h0c23.73,0,46.53,5.9,64.23,16.6l.42.25a8,8,0,0,0,10.39-2.26,16,16,0,1,1,21.07,23.19ZM88,144a16,16,0,1,1,16-16A16,16,0,0,1,88,144Zm96-16a16,16,0,1,1-16-16A16,16,0,0,1,184,128Zm-16.93,44.25a8,8,0,0,1-3.32,10.82,76.18,76.18,0,0,1-71.5,0,8,8,0,1,1,7.5-14.14,60.18,60.18,0,0,0,56.5,0A8,8,0,0,1,167.07,172.25Z"></path>
			</svg>`,

	telegram : `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="var(--background-600)" viewBox="0 0 256 256">
				<path d="M228.88,26.19a9,9,0,0,0-9.16-1.57L17.06,103.93a14.22,14.22,0,0,0,2.43,27.21L72,141.45V200a15.92,15.92,0,0,0,10,14.83,15.91,15.91,0,0,0,17.51-3.73l25.32-26.26L165,220a15.88,15.88,0,0,0,10.51,4,16.3,16.3,0,0,0,5-.79,15.85,15.85,0,0,0,10.67-11.63L231.77,35A9,9,0,0,0,228.88,26.19Zm-61.14,36L78.15,126.35l-49.6-9.73ZM88,200V152.52l24.79,21.74Zm87.53,8L92.85,135.5l119-85.29Z"></path>
			</svg>`,

	twitter : `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="var(--background-600)" viewBox="0 0 256 256">
				<path d="M214.75,211.71l-62.6-98.38,61.77-67.95a8,8,0,0,0-11.84-10.76L143.24,99.34,102.75,35.71A8,8,0,0,0,96,32H48a8,8,0,0,0-6.75,12.3l62.6,98.37-61.77,68a8,8,0,1,0,11.84,10.76l58.84-64.72,40.49,63.63A8,8,0,0,0,160,224h48a8,8,0,0,0,6.75-12.29ZM164.39,208,62.57,48h29L193.43,208Z"></path>
			</svg>`,

	youtube : `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="var(--background-600)" viewBox="0 0 256 256">
				<path d="M164.44,121.34l-48-32A8,8,0,0,0,104,96v64a8,8,0,0,0,12.44,6.66l48-32a8,8,0,0,0,0-13.32ZM120,145.05V111l25.58,17ZM234.33,69.52a24,24,0,0,0-14.49-16.4C185.56,39.88,131,40,128,40s-57.56-.12-91.84,13.12a24,24,0,0,0-14.49,16.4C19.08,79.5,16,97.74,16,128s3.08,48.5,5.67,58.48a24,24,0,0,0,14.49,16.41C69,215.56,120.4,216,127.34,216h1.32c6.94,0,58.37-.44,91.18-13.11a24,24,0,0,0,14.49-16.41c2.59-10,5.67-28.22,5.67-58.48S236.92,79.5,234.33,69.52Zm-15.49,113a8,8,0,0,1-4.77,5.49c-31.65,12.22-85.48,12-86,12H128c-.54,0-54.33.2-86-12a8,8,0,0,1-4.77-5.49C34.8,173.39,32,156.57,32,128s2.8-45.39,5.16-54.47A8,8,0,0,1,41.93,68c30.52-11.79,81.66-12,85.85-12h.27c.54,0,54.38-.18,86,12a8,8,0,0,1,4.77,5.49C221.2,82.61,224,99.43,224,128S221.2,173.39,218.84,182.47Z"></path>
			</svg>`,

	website : `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="var(--background-600)" viewBox="0 0 256 256">
				<path d="M128,24h0A104,104,0,1,0,232,128,104.12,104.12,0,0,0,128,24Zm88,104a87.61,87.61,0,0,1-3.33,24H174.16a157.44,157.44,0,0,0,0-48h38.51A87.61,87.61,0,0,1,216,128ZM102,168H154a115.11,115.11,0,0,1-26,45A115.27,115.27,0,0,1,102,168Zm-3.9-16a140.84,140.84,0,0,1,0-48h59.88a140.84,140.84,0,0,1,0,48ZM40,128a87.61,87.61,0,0,1,3.33-24H81.84a157.44,157.44,0,0,0,0,48H43.33A87.61,87.61,0,0,1,40,128ZM154,88H102a115.11,115.11,0,0,1,26-45A115.27,115.27,0,0,1,154,88Zm52.33,0H170.71a135.28,135.28,0,0,0-22.3-45.6A88.29,88.29,0,0,1,206.37,88ZM107.59,42.4A135.28,135.28,0,0,0,85.29,88H49.63A88.29,88.29,0,0,1,107.59,42.4ZM49.63,168H85.29a135.28,135.28,0,0,0,22.3,45.6A88.29,88.29,0,0,1,49.63,168Zm98.78,45.6a135.28,135.28,0,0,0,22.3-45.6h35.66A88.29,88.29,0,0,1,148.41,213.6Z"></path>
			</svg>`
}


let communities = [];
async function run() {

	// fetch communities.json directly from github repo of tamilnadu.tech
	const response = await fetch("https://raw.githubusercontent.com/FOSSUChennai/Communities/refs/heads/main/src/data/communities.json");
	communities = await response.json();
	
	// console.log(communities);

	let rendered = "";
	if (communities.length === 0) {
		rendered = "<h1>Unable to Fetch Communities</h1>"; // fallback message
	} else {
		communities.map(({name, logo, location, website, twitter, discord, instagram, linkedin, mastadon, reddit, bluesky, github, telegram, youtube}) => {
			
			// this will hold the html string for each links as icons
			let links = "";

			linkedin ? links += link_template
											.replace("{{icon}}", social_media_icons.linkedin)
											.replace("{{link-url}}",linkedin)
											.replaceAll("{{website}}","Linkedin")
					: "" ;
			github ? links += link_template
											.replace("{{icon}}", social_media_icons.github)
											.replace("{{link-url}}",github)
											.replaceAll("{{website}}","Github")
					: "" ;
			mastadon ? links += link_template
											.replace("{{icon}}", social_media_icons.mastadon)
											.replace("{{link-url}}",mastadon)
											.replaceAll("{{website}}","Mastadon")
					: "" ;
			reddit ? links += link_template
											.replace("{{icon}}", social_media_icons.reddit)
											.replace("{{link-url}}",reddit)
											.replaceAll("{{website}}","Reddit")
					: "" ;
			discord ? links += link_template
											.replace("{{icon}}", social_media_icons.discord)
											.replace("{{link-url}}",discord)
											.replaceAll("{{website}}","Discord")
					: "" ;
			twitter ? links += link_template
											.replace("{{icon}}", social_media_icons.twitter)
											.replace("{{link-url}}",twitter)
											.replaceAll("{{website}}","Twitter")
					: "" ;
			instagram ? links += link_template
											.replace("{{icon}}", social_media_icons.instagram)
											.replace("{{link-url}}",instagram)
											.replaceAll("{{website}}","Instagram")
					: "" ;
			bluesky ? links += link_template
											.replace("{{icon}}", social_media_icons.blusky)
											.replace("{{link-url}}",bluesky)
											.replaceAll("{{website}}","Bluesky")
					: "" ;
			telegram ? links += link_template
											.replace("{{icon}}", social_media_icons.telegram)
											.replace("{{link-url}}",telegram)
											.replaceAll("{{website}}","Telegram")
					: "" ;
			youtube ? links += link_template
											.replace("{{icon}}", social_media_icons.youtube)
											.replace("{{link-url}}",youtube)
											.replaceAll("{{website}}","Youtube")
					: "" ;
			website ? links += link_template
											.replace("{{icon}}", social_media_icons.website)
											.replace("{{link-url}}",website)
											.replaceAll("{{website}}","Website")
					: "" ;
			
			// at last generate the community card with the template
			rendered += template
								.replaceAll("{{community-name}}", name)
								.replace("{{logo}}", 
									logo ? `<img class="logo-img" src="${logo}" alt="LOGO"/>` 
										: `
											<svg xmlns="http://www.w3.org/2000/svg" class="logo-img default" width="32" height="32" fill="var(--text)" viewBox="0 0 256 256">
												<path d="M244.8,150.4a8,8,0,0,1-11.2-1.6A51.6,51.6,0,0,0,192,128a8,8,0,0,1-7.37-4.89,8,8,0,0,1,0-6.22A8,8,0,0,1,192,112a24,24,0,1,0-23.24-30,8,8,0,1,1-15.5-4A40,40,0,1,1,219,117.51a67.94,67.94,0,0,1,27.43,21.68A8,8,0,0,1,244.8,150.4ZM190.92,212a8,8,0,1,1-13.84,8,57,57,0,0,0-98.16,0,8,8,0,1,1-13.84-8,72.06,72.06,0,0,1,33.74-29.92,48,48,0,1,1,58.36,0A72.06,72.06,0,0,1,190.92,212ZM128,176a32,32,0,1,0-32-32A32,32,0,0,0,128,176ZM72,120a8,8,0,0,0-8-8A24,24,0,1,1,87.24,82a8,8,0,1,0,15.5-4A40,40,0,1,0,37,117.51,67.94,67.94,0,0,0,9.6,139.19a8,8,0,1,0,12.8,9.61A51.6,51.6,0,0,1,64,128,8,8,0,0,0,72,120Z"></path>
											</svg>
									`)
								.replaceAll("{{location}}", location)
								.replace("{{website}}", website)
								.replace("{{links-container}}",links?links:"");
		});
	}
	// renders the communities section
	communities_section.innerHTML = rendered;
}

run().then()